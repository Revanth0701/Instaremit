import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Half: Logo and Text */}
      <View style={styles.contentWrapper}>
        
        {/* 3D Coin Logo */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/coin-logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Updated Text Copy */}
        <View style={styles.textContainer}>
          <Text style={styles.headline}>Effortless Transfers,</Text>
          <Text style={styles.headline}>Boundless Connections.</Text>
          <Text style={styles.subheading}>
            Quick, reliable money transfers between the U.S. and India, designed for students and families
          </Text>
        </View>
      </View>

      {/* Bottom Half: Buttons and Footer */}
      <View style={styles.bottomInterface}>
        
        {/* Primary Login Button */}
        <TouchableOpacity 
          style={styles.primaryButton} 
          activeOpacity={0.85}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Secondary Sign-up Button */}
        <TouchableOpacity 
          style={styles.secondaryButton} 
          activeOpacity={0.85}
          onPress={() => navigation.navigate('SignupWizard')}
        >
          <Text style={styles.secondaryButtonText}>Sign-up</Text>
        </TouchableOpacity>

        {/* Footer with Underlined Links */}
        <Text style={styles.footerText}>
          By continuing you accept our{'\n'}
          <Text style={styles.linkText}>Terms of service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
      
    </SafeAreaView>
  );
}

// Styling to exactly match your uploaded image
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    justifyContent: 'space-between', 
    paddingHorizontal: 24 
  },
  contentWrapper: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 40 // Pushes the content down slightly to match your mockup
  },
  logoContainer: { 
    marginBottom: 40, 
    alignItems: 'center' 
  },
  logoImage: { 
    width: 160, 
    height: 160 
  },
  textContainer: { 
    alignItems: 'center' 
  },
  headline: { 
    fontSize: 26, 
    fontWeight: '700', 
    color: '#000000', 
    textAlign: 'center', 
    lineHeight: 34 
  },
  subheading: { 
    fontSize: 14, 
    color: '#627D98', 
    textAlign: 'center', 
    marginTop: 16, 
    lineHeight: 22, 
    paddingHorizontal: 10 
  },
  bottomInterface: { 
    width: '100%', 
    marginBottom: 40, 
    gap: 16 // Adds perfect spacing between the two buttons
  },
  primaryButton: { 
    backgroundColor: '#0047AB', // Deep solid blue from your image
    paddingVertical: 16, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  primaryButtonText: { 
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  secondaryButton: { 
    backgroundColor: '#FFFFFF', 
    paddingVertical: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#0047AB' // Blue outline matching the button
  },
  secondaryButtonText: { 
    color: '#0047AB', 
    fontSize: 16, 
    fontWeight: '600' 
  },
  footerText: { 
    fontSize: 12, 
    color: '#718096', 
    textAlign: 'center', 
    marginTop: 16, 
    lineHeight: 18 
  },
  linkText: { 
    textDecorationLine: 'underline',
    color: '#718096' 
  }
});