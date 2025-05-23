import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';

// Ensure web browser redirect is handled
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, isLoading: authLoading, hasProgram, signInWithEmail, signInWithGoogle, signInWithApple } = useAuth();
  const [navigateTo, setNavigateTo] = useState<string | null>(null);

  // Configure Google OAuth
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  // Check if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      if (hasProgram) {
        setNavigateTo('/(tabs)');
      } else {
        setNavigateTo('/upload');
      }
    }
  }, [user, authLoading, hasProgram]);

  // Handle Google sign-in response
  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Handle the Google authentication
      if (authentication?.accessToken) {
        handleGoogleLogin(authentication.accessToken);
      }
    }
  }, [response]);

  const handleGoogleLogin = async (accessToken) => {
    try {
      setLoading(true);
      await signInWithGoogle(accessToken);
      // Navigation will happen via the effect hook above
    } catch (error) {
      console.error('Google login error:', error);
      Alert.alert('Login Failed', 'Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setLoading(true);
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      
      // Handle the Apple authentication
      if (credential.identityToken) {
        await signInWithApple(credential);
        // Navigation will happen via the effect hook above
      }
    } catch (error) {
      console.error('Apple login error:', error);
      if (error.code !== 'ERR_CANCELED') {
        Alert.alert('Login Failed', 'Apple login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmail(email, password);
      // Navigation will happen via the effect hook based on hasProgram
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Use Redirect component for navigation
  if (navigateTo) {
    return <Redirect href={navigateTo} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Bench Press Program</Text>
          <Text style={styles.subtitle}>Log in to your account</Text>

          <View style={styles.socialButtonsContainer}>
            {/* Google Sign-In Button */}
            <TouchableOpacity 
              style={styles.socialButton}
              onPress={() => promptAsync()}
              disabled={loading}
            >
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }} 
                style={styles.socialIcon} 
              />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Apple Sign-In Button (iOS only) */}
            {Platform.OS === 'ios' && (
              <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={8}
                style={styles.appleButton}
                onPress={handleAppleLogin}
              />
            )}
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPasswordLink}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signupLinkContainer}>
            <Text style={styles.signupLinkText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => setNavigateTo('/signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.devLoginContainer}>
            <Text style={styles.devNote}>Developer Testing Only:</Text>
            <TouchableOpacity 
              style={styles.devLoginButton}
              onPress={() => {
                setEmail('test@example.com');
                setPassword('password123');
              }}
            >
              <Text style={styles.devLoginText}>Fill Test Credentials</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  keyboardAvoid: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3182CE',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 32,
    textAlign: 'center',
  },
  socialButtonsContainer: {
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  appleButton: {
    height: 48,
    width: '100%',
    marginBottom: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#ccc',
    paddingHorizontal: 12,
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#1E1E1E',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#3182CE',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordLink: {
    alignSelf: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#3182CE',
    fontSize: 14,
  },
  signupLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupLinkText: {
    color: '#ccc',
    fontSize: 14,
  },
  signupLink: {
    color: '#3182CE',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  devLoginContainer: {
    marginTop: 40,
    padding: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 8,
    alignItems: 'center',
  },
  devNote: {
    color: '#888',
    fontSize: 12,
    marginBottom: 8,
  },
  devLoginButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2A2A2A',
    borderRadius: 4,
  },
  devLoginText: {
    color: '#ccc',
    fontSize: 14,
  },
});