import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider } from '../context/ThemeContext';
import { Slot } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';

// Navigation component with authentication
function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    // Show loading screen
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
        <ActivityIndicator size="large" color="#3182CE" />
        <Text style={{ marginTop: 20, color: '#fff' }}>Loading app...</Text>
      </View>
    );
  }
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Define all your screens */}
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="workout" />
      <Stack.Screen name="workout-preview" />
      <Stack.Screen name="upload" />
    </Stack>
  );
}

// Root layout component
export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </AuthProvider>
  );
}