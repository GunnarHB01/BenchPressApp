import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

// Define the shape of our user object
interface User {
  id: string;
  email: string;
  name?: string;
  authProvider?: string; // 'email', 'google', 'apple'
}

// Define the shape of our auth context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  hasProgram: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<void>;
  signInWithGoogle: (accessToken: string) => Promise<void>;
  signInWithApple: (credential: any) => Promise<void>;
  signOut: () => Promise<void>;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
  checkProgramStatus: () => Promise<boolean>;
}

// Create the auth context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  hasProgram: false,
  signInWithEmail: async () => {},
  signUpWithEmail: async () => {},
  signInWithGoogle: async () => {},
  signInWithApple: async () => {},
  signOut: async () => {},
  updateUserProfile: async () => {},
  checkProgramStatus: async () => false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProgram, setHasProgram] = useState(false);

  // Check for existing login on startup
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Get stored user data from AsyncStorage
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
          
          // Check if program is imported
          const programStatus = await checkProgramStatus();
          setHasProgram(programStatus);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        // Always set loading to false when done
        setIsLoading(false);
      }
    };
    
    checkLoginStatus();
  }, []);

  // Check if program is imported with extra verification
  const checkProgramStatus = async (): Promise<boolean> => {
    try {
      // Check if program is marked as imported
      const pdfImported = await AsyncStorage.getItem('pdf_imported');
      const programType = await AsyncStorage.getItem('program_type');
      const importedProgram = await AsyncStorage.getItem('imported_program');
      
      // More thorough check - program is truly imported if we have actual workout data
      const keys = await AsyncStorage.getAllKeys();
      const workoutKeys = keys.filter(k => k.startsWith('workout_'));
      console.log("Found", workoutKeys.length, "workout keys");
      
      // Consider program imported only if ALL conditions are met
      const hasProgram = 
        (pdfImported === 'true' || importedProgram) && 
        programType && 
        workoutKeys.length > 0;
      
      console.log("Program import status:", hasProgram);
      return hasProgram;
    } catch (error) {
      console.error('Error checking program status:', error);
      return false;
    }
  };

  // Sign in with email and password
  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // For development, accept test credentials
      if (email === 'test@example.com' && password === 'password123') {
        // Create a mock user
        const newUser: User = {
          id: '1',
          email: email,
          name: 'Test User',
          authProvider: 'email'
        };
        
        // Save user to AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        
        // Update state
        setUser(newUser);
        
        // Set program status - for testing, always force to upload screen
        setHasProgram(false);
        
        // Navigate to upload screen
        router.replace('/upload');
        
        return;
      }
      
      // In a real app, you would make an API call here to authenticate
      // For now, simply reject other credentials
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up with email and password
  const signUpWithEmail = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    
    try {
      // For development, create a mock account
      // In a real app, you would make an API call to create an account
      
      // Example mock user creation
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 15),
        email: email,
        name: name || email.split('@')[0],
        authProvider: 'email'
      };
      
      // Save user to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      
      // Clear any existing program data for new users
      await AsyncStorage.removeItem('pdf_imported');
      await AsyncStorage.removeItem('program_type');
      await AsyncStorage.removeItem('imported_program');
      
      // Update state
      setUser(newUser);
      setHasProgram(false);
      
      // Navigate to upload screen
      router.replace('/upload');
      
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with Google
  const signInWithGoogle = async (accessToken: string) => {
    setIsLoading(true);
    
    try {
      // For development purposes, create a mock Google user
      // In a real app, you would:
      // 1. Validate the accessToken with Google's API
      // 2. Get user profile info from Google
      // 3. Create or sign in the user in your backend
      
      // Mock Google user
      const newUser: User = {
        id: `google_${Math.random().toString(36).substring(2, 15)}`,
        email: 'google_user@example.com',
        name: 'Google User',
        authProvider: 'google'
      };
      
      // Save user to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      
      // Update state
      setUser(newUser);
      
      // Force first-time users to upload program
      setHasProgram(false);
      
      // Navigate to upload screen
      router.replace('/upload');
      
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in with Apple
  const signInWithApple = async (credential: any) => {
    setIsLoading(true);
    
    try {
      // For development purposes, create a mock Apple user
      // In a real app, you would:
      // 1. Validate the Apple credential
      // 2. Get user info from the credential
      // 3. Create or sign in the user in your backend
      
      // Mock Apple user
      const newUser: User = {
        id: `apple_${Math.random().toString(36).substring(2, 15)}`,
        email: credential.email || 'apple_user@example.com',
        name: credential.fullName?.givenName ? 
          `${credential.fullName.givenName} ${credential.fullName.familyName || ''}` : 
          'Apple User',
        authProvider: 'apple'
      };
      
      // Save user to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      
      // Update state
      setUser(newUser);
      
      // Force first-time users to upload program
      setHasProgram(false);
      
      // Navigate to upload screen
      router.replace('/upload');
      
    } catch (error) {
      console.error('Error signing in with Apple:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      console.log('Signing out...');
      
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem('user');
      
      // Update state
      setUser(null);
      setHasProgram(false);
      
      // Navigate to login screen
      console.log('Navigating to login screen...');
      router.replace('/login');
      
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      if (!user) return;
      
      // Update the user object with new data
      const updatedUser = { ...user, ...userData };
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  // Values to provide to the context
  const value: AuthContextType = {
    user,
    isLoading,
    hasProgram,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple,
    signOut,
    updateUserProfile,
    checkProgramStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;