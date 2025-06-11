import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={{
          uri: 'https://api.a0.dev/assets/image?text=Allergy+Free+Living&aspect=9:16&seed=123',
        }}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logo.png')} 
              style={styles.logo}
            />
            <Text style={styles.logoText}>AllergyGuard</Text>
          </View>

          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Live Allergy-Free</Text>
            <Text style={styles.subHeading}>
              Scan products, check ingredients, and connect with experts to keep yourself safe from allergic reactions
            </Text>
          </View>

          <View style={styles.featureContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <FontAwesome name="search" size={20} color="#6200EE" />
              </View>
              <Text style={styles.featureText}>Scan products to check ingredients</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <FontAwesome name="exclamation-triangle" size={20} color="#6200EE" />
              </View>
              <Text style={styles.featureText}>Get alerts for unsafe ingredients</Text>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <FontAwesome name="user-md" size={20} color="#6200EE" />
              </View>
              <Text style={styles.featureText}>Connect with health professionals</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={navigateToLogin}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={navigateToSignup}
            >
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingBottom: 50,
    paddingTop: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
    marginTop: 10,
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  featureContainer: {
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#6200EE',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#6200EE',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6200EE',
  },
  signupButtonText: {
    color: '#6200EE',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
