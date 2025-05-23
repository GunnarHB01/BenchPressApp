import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function RootIndex() {
  const { user, isLoading: authLoading, hasProgram } = useAuth();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);
  
  // Determine redirect based on auth state
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Wait for auth to finish loading
        if (authLoading) return;

        // If not authenticated, set redirect to login
        if (!user) {
          console.log("User not authenticated, setting redirect to login");
          setRedirectPath("/login");
          return;
        }

        // If authenticated, always redirect to upload screen for simplicity
        console.log("User authenticated, redirecting to upload");
        setRedirectPath("/upload");
      } catch (error) {
        console.error("Navigation check error:", error);
        setRedirectPath("/login");
      }
    };

    checkAuth();
  }, [user, authLoading]);

  // Use Redirect component for navigation
  if (redirectPath) {
    return <Redirect href={redirectPath} />;
  }

  // Loading screen while checking statuses
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3182CE" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  loadingText: {
    color: '#fff',
    marginTop: 16,
    fontSize: 16,
  },
});