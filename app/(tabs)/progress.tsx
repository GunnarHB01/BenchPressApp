import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProgressScreen() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    count: 0,
    maxBench: 0,
    volume: 0
  });

  // Simple load function - minimal operations
  useEffect(() => {
    async function loadWorkouts() {
      try {
        console.log('Starting to load progress data...');
        const keys = await AsyncStorage.getAllKeys();
        const workoutKeys = keys.filter(k => k.startsWith('workout_'));
        console.log(`Found ${workoutKeys.length} workout keys`);
        
        // If no workouts, just set loading to false and return
        if (workoutKeys.length === 0) {
          setLoading(false);
          return;
        }
        
        // Get all workout data
        const workoutData = [];
        let maxBenchWeight = 0;
        let totalVolume = 0;
        
        for (const key of workoutKeys) {
          const data = await AsyncStorage.getItem(key);
          if (data) {
            try {
              const workout = JSON.parse(data);
              
              // Process the workout data
              workoutData.push({
                key,
                ...workout
              });
              
              // Calculate max bench press weight
              workout.exercises.forEach(exercise => {
                if (exercise.name.toLowerCase().includes('bench press')) {
                  exercise.weightInputs.forEach((weight, i) => {
                    if (weight && exercise.completedSets && exercise.completedSets[i]) {
                      const w = parseFloat(weight);
                      if (w > maxBenchWeight) maxBenchWeight = w;
                    }
                  });
                }
                
                // Calculate total volume
                exercise.weightInputs.forEach((weight, i) => {
                  if (weight && exercise.completedSets && exercise.completedSets[i]) {
                    const w = parseFloat(weight);
                    const repMatch = exercise.name.match(/(\d+)\s*reps/i);
                    const reps = repMatch ? parseInt(repMatch[1]) : 1;
                    totalVolume += w * reps;
                  }
                });
              });
            } catch (error) {
              console.error(`Error parsing workout: ${error}`);
            }
          }
        }
        
        // Set state
        setWorkouts(workoutData);
        setStats({
          count: workoutData.length,
          maxBench: maxBenchWeight,
          volume: Math.round(totalVolume)
        });
        
        console.log('Finished loading progress data');
      } catch (error) {
        console.error(`Error loading workouts: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    
    loadWorkouts();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.loadingText}>Loading progress data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Progress</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{stats.count}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{stats.maxBench}</Text>
              <Text style={styles.statLabel}>Max Bench</Text>
            </View>
            
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{stats.volume}</Text>
              <Text style={styles.statLabel}>Volume</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>Workout History</Text>
          
          {workouts.length === 0 ? (
            <Text style={styles.emptyText}>No workouts completed yet.</Text>
          ) : (
            workouts
              .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
              .map(workout => {
                // Extract week and day from key
                const matches = workout.key.match(/workout_w(\d+)_d(\d+)/);
                const week = matches ? matches[1] : '?';
                const day = matches ? matches[2] : '?';
                
                return (
                  <View key={workout.key} style={styles.workoutItem}>
                    <Text style={styles.workoutTitle}>Week {week} · Day {day}</Text>
                    <Text style={styles.workoutDate}>
                      {new Date(workout.lastUpdated).toLocaleDateString()}
                    </Text>
                    
                    {workout.exercises.map((exercise, index) => (
                      <Text key={index} style={styles.exerciseText}>
                        • {exercise.name}
                      </Text>
                    ))}
                  </View>
                );
              })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 100,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    color: '#3182CE',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#3182CE',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  workoutItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  workoutTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  workoutDate: {
    color: '#888',
    fontSize: 14,
    marginBottom: 12,
  },
  exerciseText: {
    color: '#ccc',
    fontSize: 15,
    marginBottom: 4,
  }
});