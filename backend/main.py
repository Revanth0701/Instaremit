from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, String, Float, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from datetime import datetime
import uuid
from pydantic import BaseModel

# ==========================================
# 1. DATABASE SETUP
# ==========================================
SQLALCHEMY_DATABASE_URL = "sqlite:///./instaremit_ledger.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class TransactionRecord(Base):
    __tablename__ = "transactions"
    
    transaction_id = Column(String, primary_key=True, index=True)
    recipient_name = Column(String, nullable=False)
    gross_amount_inr = Column(Float, nullable=False)
    fee_deducted_inr = Column(Float, nullable=False)
    net_amount_usd = Column(Float, nullable=False)
    exchange_rate = Column(Float, nullable=False)
    status = Column(String, default="Processing")
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)

# Database Connection Helper
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================================
# 2. DATA VALIDATION (The "Order Ticket")
# ==========================================
class TransactionCreate(BaseModel):
    recipient_name: str
    gross_amount_inr: float

# ==========================================
# 3. API ROUTES (The "Waiter")
# ==========================================
app = FastAPI(title="InstaRemit Data Pipeline API")
# ADD THIS ENTIRE BLOCK:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows your React app to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def health_check():
    return {
        "system_status": "Active",
        "message": "InstaRemit API Engine is running.",
        "database": "SQLite Connected"
    }

# NEW: The Ingestion Pipeline
@app.post("/transactions/")
def create_transaction(txn: TransactionCreate, db: Session = Depends(get_db)):
    
    # 1. Process the core financial math
    exchange_rate = 83.50
    fee_percentage = 0.03
    
    fee_amount = txn.gross_amount_inr * fee_percentage
    converted_inr = txn.gross_amount_inr - fee_amount
    net_usd = round(converted_inr / exchange_rate, 2)
    
    # 2. Generate a unique Transaction UUID
    unique_tx_id = f"TXN-{uuid.uuid4().hex[:10].upper()}"

    # 3. Format the data for the SQL table
    new_record = TransactionRecord(
        transaction_id=unique_tx_id,
        recipient_name=txn.recipient_name,
        gross_amount_inr=txn.gross_amount_inr,
        fee_deducted_inr=fee_amount,
        net_amount_usd=net_usd,
        exchange_rate=exchange_rate,
        status="Processing"
    )

    # 4. Commit to the Database!
    db.add(new_record)
    db.commit()
    db.refresh(new_record)

    # Return the saved record back as confirmation
    return new_record
    # NEW: The Extraction Pipeline (To view your data)
@app.get("/transactions/all")
def get_all_transactions(db: Session = Depends(get_db)):
    records = db.query(TransactionRecord).all()
    return records