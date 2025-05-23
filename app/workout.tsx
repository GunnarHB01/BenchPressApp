import { useState, useEffect, useMemo, useCallback } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import WorkoutScreen from '../components/WorkoutScreen';

export default function WorkoutRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useLocalSearchParams();
  
  // Use useMemo to prevent unnecessary re-renders
  const workoutParams = useMemo(() => {
    const week = params.week ? Number(params.week) : 1;
    const day = params.day ? Number(params.day) : 1;
    const type = params.type?.toString() || 'Upper Body';
    
    return { week, day, type };
  }, [params.week, params.day, params.type]);
  
  // Simpler useEffect that only runs once
  useEffect(() => {
    setIsLoading(false);
  }, []);
  
  // Show loading state while retrieving the workout data
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3182CE" />
        <Text style={styles.loadingText}>Loading your workout...</Text>
      </View>
    );
  }
  
  // Pass the loaded parameters to the WorkoutScreen component
  return (
    <WorkoutScreen
      initialWeek={workoutParams.week}
      initialDay={workoutParams.day}
      initialType={workoutParams.type}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
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