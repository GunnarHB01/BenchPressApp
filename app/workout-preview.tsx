import { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  ImageBackground
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getImportedProgram } from '../utils/strictProgramValidator';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

interface Exercise {
  name: string;
  sets: number;
  reps: string | number;
  percentage?: string | number;
  rpe?: string | number;
  rest: string;
  notes?: string;
}

// Using StrengthLevel images for backgrounds
const getBackgroundForType = (type: string) => {
  type = type.toLowerCase();
  if (type.includes('upper') || type.includes('push') || type.includes('pull')) {
    return 'https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg';
  } else if (type.includes('lower') || type.includes('leg')) {
    return 'https://static.strengthlevel.com/images/illustrations/squat-1000x1000.jpg';
  } else {
    return 'https://static.strengthlevel.com/images/illustrations/deadlift-1000x1000.jpg';
  }
};

export default function WorkoutPreviewScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const week = Number(params.week || 1);
  const day = Number(params.day || 1);
  const dayType = params.type as string || '';
  
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState('');
  
  // Load workout data on initial render
  useEffect(() => {
    loadWorkoutData();
  }, [week, day]); // Make sure it loads when params change
  
  const loadWorkoutData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Check for saved workout data to see if it's completed
      const savedData = await AsyncStorage.getItem(`workout_w${week}_d${day}`);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setIsCompleted(parsedData.isCompleted || false);
      }
      
      // Get from program data
      const programData = await getImportedProgram();
      if (!programData) {
        setError("Failed to load program data.");
        return;
      }
      
      const weekData = programData[`week${week}`];
      if (!weekData || !weekData.days[day - 1]) {
        setError(`Workout data not found for Week ${week} Day ${day}.`);
        return;
      }
      
      const dayData = weekData.days[day - 1];
      
      // Explicitly log what we're loading
      console.log(`Loading exercises for Week ${week} Day ${day}:`, dayData.exercises);
      console.log(`Exercise array length:`, dayData.exercises?.length || 0);
      
      // Make sure exercises is an array
      if (!Array.isArray(dayData.exercises)) {
        console.error('Exercises is not an array:', dayData.exercises);
        setError('Invalid exercise data format.');
        return;
      }
      
      setExercises(dayData.exercises);
    } catch (error) {
      console.error('Error loading workout data:', error);
      setError('Failed to load workout data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startWorkout = () => {
    // Navigate to the workout screen with the same parameters
    router.push({
      pathname: '/workout',
      params: { week, day, type: dayType }
    });
  };
  
  const getMuscleGroupIcon = (exerciseName: string) => {
    const name = exerciseName.toLowerCase();
    if (name.includes('bench') || name.includes('chest') || name.includes('dip')) return 'body-outline';
    if (name.includes('squat') || name.includes('leg')) return 'footsteps-outline';
    if (name.includes('deadlift') || name.includes('row')) return 'barbell-outline';
    if (name.includes('curl') || name.includes('extension')) return 'fitness-outline';
    if (name.includes('lateral') || name.includes('press') || name.includes('shoulder')) return 'body-outline';
    return 'barbell-outline';
  };
  
  const getEstimatedTime = () => {
    // More accurate calculation based on exercise types and rest times
    if (!exercises || exercises.length === 0) return 0;
    
    let totalTime = 10; // Warm-up time
    
    exercises.forEach(ex => {
      // Estimate time per set based on exercise type
      let timePerSet = 2; // Minutes per set (including rest)
      
      // Adjust based on exercise type
      const name = ex.name.toLowerCase();
      if (name.includes('squat') || name.includes('deadlift')) {
        timePerSet = 3; // Compound lifts take longer
      }
      
      totalTime += ex.sets * timePerSet;
    });
    
    return totalTime;
  };
  
  const renderExerciseItem = ({ item, index }: { item: Exercise; index: number }) => {
    console.log(`Rendering exercise ${index}:`, item.name);
    
    return (
      <View style={styles.exerciseCard}>
        <View style={styles.exerciseHeader}>
          <Ionicons name={getMuscleGroupIcon(item.name)} size={24} color="#3182CE" style={styles.exerciseIcon} />
          <Text style={styles.exerciseName}>{item.name}</Text>
        </View>
        
        <View style={styles.exerciseDetails}>
          <View style={styles.detailRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Sets</Text>
              <Text style={styles.detailValue}>{item.sets}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Reps</Text>
              <Text style={styles.detailValue}>{item.reps}</Text>
            </View>
            
            {item.percentage && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>%</Text>
                <Text style={styles.detailValue}>{item.percentage}%</Text>
              </View>
            )}
            
            {item.rpe && (
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>RPE</Text>
                <Text style={styles.detailValue}>{item.rpe}</Text>
              </View>
            )}
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Rest</Text>
              <Text style={styles.detailValue}>{item.rest}</Text>
            </View>
          </View>
          
          {item.notes && (
            <View style={styles.notesContainer}>
              <Text style={styles.notesLabel}>Notes</Text>
              <Text style={styles.notesText}>{item.notes}</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3182CE" />
        <Text style={styles.loadingText}>Loading workout data...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Ionicons name="alert-circle-outline" size={50} color="#FF5252" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.tryAgainButton} onPress={loadWorkoutData}>
          <Text style={styles.tryAgainButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <ImageBackground
        source={{ uri: getBackgroundForType(dayType) }}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
          style={styles.overlay}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            
            <View style={styles.titleContainer}>
              <Text style={styles.headerTitle}>{dayType || `Day ${day}`}</Text>
              <Text style={styles.headerSubtitle}>Week {week} · Preview</Text>
            </View>
            
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark" size={16} color="#fff" />
              </View>
            )}
          </View>
          
          <FlatList
            data={exercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item, index) => `exercise-${index}`}
            contentContainerStyle={styles.listContainer}
            ListHeaderComponent={
              <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Workout Summary</Text>
                <Text style={styles.summaryText}>
                  {exercises.length} exercises · Estimated time: {getEstimatedTime()} minutes
                </Text>
                
                <View style={styles.muscleGroupsContainer}>
                  {dayType.includes('UPPER') && (
                    <View style={styles.muscleGroupTag}>
                      <Text style={styles.muscleGroupText}>Upper Body</Text>
                    </View>
                  )}
                  {dayType.includes('LOWER') && (
                    <View style={styles.muscleGroupTag}>
                      <Text style={styles.muscleGroupText}>Lower Body</Text>
                    </View>
                  )}
                </View>
                
                {/* Debug info for development */}
                {__DEV__ && (
                  <Text style={{ color: '#888', marginTop: 10 }}>
                    Debug: {exercises.length} exercises loaded
                  </Text>
                )}
              </View>
            }
            ListFooterComponent={
              <View style={styles.startButtonContainer}>
                <TouchableOpacity style={styles.startButton} onPress={startWorkout}>
                  <Ionicons name="play" size={24} color="#fff" style={styles.startIcon} />
                  <Text style={styles.startButtonText}>Start Workout</Text>
                </TouchableOpacity>
              </View>
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="barbell-outline" size={60} color="#666" />
                <Text style={styles.emptyText}>No exercises found for this day.</Text>
                {__DEV__ && (
                  <Text style={{ color: '#888', marginTop: 10 }}>
                    Debug: Exercises array is empty - Week {week}, Day {day}
                  </Text>
                )}
              </View>
            }
          />
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    color: '#ff5252',
    marginTop: 16,
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  tryAgainButton: {
    backgroundColor: '#3182CE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  tryAgainButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#48BB78',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Extra padding at bottom
    flexGrow: 1, // Important to ensure FlatList fills space
  },
  summaryContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'rgba(26, 26, 26, 0.8)',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  muscleGroupsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  muscleGroupTag: {
    backgroundColor: 'rgba(49, 130, 206, 0.7)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  muscleGroupText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  exerciseCard: {
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  exerciseIcon: {
    marginRight: 10,
  },
  exerciseName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  exerciseDetails: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  detailItem: {
    minWidth: '20%',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  notesContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: 'rgba(37, 37, 37, 0.6)',
    borderRadius: 8,
  },
  notesLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
  startButtonContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: '#3182CE',
    borderRadius: 30,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  startIcon: {
    marginRight: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});