import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { toast } from 'sonner-native';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { sendEmailVerification } from "firebase/auth";
import { signInWithGoogle } from '../services/googleAuthService';
import { AuthContext } from '../contexts/AuthContext';
const { width } = Dimensions.get('window');

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const { login } = React.useContext(AuthContext);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

const handleSignup = async () => {
  if (!name || !email || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    setIsLoading(true);

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Correct usage
    await sendEmailVerification(user);

    await setDoc(doc(db, 'users', user.uid), {
      name: name,
      email: email,
      createdAt: new Date()
    });

    alert('Signup successful! Please check your email to verify your account.');
    navigation.navigate('Login');

  } catch (error) {
    console.error('Signup Error:', error);
    alert(error.message);
  } finally {
    setIsLoading(false);
  }
};

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const user = await signInWithGoogle();
      if (user) {
        login(); // Update authentication state
        Alert.alert('Success', 'Successfully signed in with Google!');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Alert.alert('Error', error.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={navigateToLogin}
            >
              <FontAwesome name="arrow-left" size={20} color="#6200EE" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Create Account</Text>
            <View style={{ width: 40 }} />
          </View>

          <View style={styles.logoContainer}>
            <Image
              source={{ uri: 'https://api.a0.dev/assets/image?text=AllergySafe+Logo&aspect=1:1' }}
              style={styles.logo}
            />
            <Text style={styles.logoText}>AllergyGuard</Text>
          </View>

          <Text style={styles.welcomeText}>Get Started</Text>
          <Text style={styles.subtitleText}>Create an account to keep track of your allergies</Text>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <FontAwesome name="user" size={20} color="#6200EE" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="envelope" size={20} color="#6200EE" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={20} color="#6200EE" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <FontAwesome
                  name={showPassword ? "eye" : "eye-slash"}
                  size={20}
                  color="#6200EE"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="lock" size={20} color="#6200EE" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeIcon}
              >
                <FontAwesome
                  name={showConfirmPassword ? "eye" : "eye-slash"}
                  size={20}
                  color="#6200EE"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSignup}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Text>
            </TouchableOpacity>

            <View style={styles.separatorContainer}>
              <View style={styles.separator} />
              <Text style={styles.separatorText}>OR</Text>
              <View style={styles.separator} />
            </View>

            <TouchableOpacity 
              style={[styles.socialButton, isLoading && styles.buttonDisabled]}
              onPress={handleGoogleSignIn}
              disabled={isLoading}
            >
              <FontAwesome name="google" size={20} color="#DB4437" />
              <Text style={styles.socialButtonText}>
                {isLoading ? 'Signing in...' : 'Sign up with Google'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backButton: {
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  logoText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#6200EE',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#333',
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    width: width * 0.85,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 55,
    backgroundColor: '#F9F9F9',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#6200EE',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: '#A884E1',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDD',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 15,
    color: '#666',
  },
  loginText: {
    fontSize: 15,
    color: '#6200EE',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
