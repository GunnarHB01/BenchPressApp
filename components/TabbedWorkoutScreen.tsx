import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getImportedProgram } from '../utils/nippardPdfParser';
import FormCheckVideos from '../components/FormCheckVideos';
import CompactRestTimer from './SimpleCompactTimer';
import { useTheme } from '../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Exercise {
  name: string;
  sets: number;
  reps: string | number;
  percentage?: string;
  rpe?: string;
  rest: string;
  notes?: string;
  weightInputs?: string[];
  completedSets?: boolean[];
}

export default function TabbedWorkoutScreen() {
  const params = useLocalSearchParams();
  const week = Number(params.week || 1);
  const day = Number(params.day || 1);
  const dayType = params.type as string || '';
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  
  const [workoutData, setWorkoutData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [notes, setNotes] = useState('');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [restTime, setRestTime] = useState(90);
  const [showRestTimer, setShowRestTimer] = useState(false);

  useEffect(() => {
    loadWorkoutData();
  }, []);

  const loadWorkoutData = async () => {
    try {
      setLoading(true);
      
      // Check for saved workout data
      const savedData = await AsyncStorage.getItem(`workout_w${week}_d${day}`);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setWorkoutData(parsedData.exercises);
        setNotes(parsedData.notes || '');
        setIsCompleted(parsedData.isCompleted || false);
        setLoading(false);
        return;
      }
      
      // Get from program data
      const programData = await getImportedProgram();
      if (!programData) {
        Alert.alert("Error", "Failed to load program data.");
        return;
      }
      
      const weekData = programData[`week${week}`];
      if (!weekData || !weekData.days[day - 1]) {
        Alert.alert("Error", "Workout data not found for this day.");
        return;
      }
      
      const dayData = weekData.days[day - 1];
      
      // Initialize exercises with empty weight inputs and completed sets
      const initializedExercises = dayData.exercises.map(ex => ({
        ...ex,
        weightInputs: Array(ex.sets).fill(''),
        completedSets: Array(ex.sets).fill(false)
      }));
      
      setWorkoutData(initializedExercises);
    } catch (error) {
      console.error('Error loading workout data:', error);
      Alert.alert("Error", "Failed to load workout data.");
    } finally {
      setLoading(false);
    }
  };

  const saveWorkoutData = async (completed = false) => {
    try {
      const dataToSave = {
        exercises: workoutData,
        notes: notes,
        lastUpdated: new Date().toISOString(),
        isCompleted: completed || isCompleted
      };
      await AsyncStorage.setItem(`workout_w${week}_d${day}`, JSON.stringify(dataToSave));
      
      // Update program progress if workout is completed
      if (completed) {
        await updateProgramProgress();
      }
    } catch (error) {
      console.error('Error saving workout data:', error);
    }
  };
  
  const updateProgramProgress = async () => {
    try {
      const progressKey = 'program_progress';
      const savedProgress = await AsyncStorage.getItem(progressKey);
      
      let progress = savedProgress ? JSON.parse(savedProgress) : {};
      
      if (!progress[`week${week}`]) {
        progress[`week${week}`] = {};
      }
      
      progress[`week${week}`][`day${day}`] = true;
      
      await AsyncStorage.setItem(progressKey, JSON.stringify(progress));
    } catch (error) {
      console.error('Error updating program progress:', error);
    }
  };

  const updateWeight = (weight: string) => {
    if (currentExercise >= workoutData.length) return;
    
    const updatedData = [...workoutData];
    if (updatedData[currentExercise].weightInputs) {
      updatedData[currentExercise].weightInputs![currentSet] = weight;
      setWorkoutData(updatedData);
      saveWorkoutData();
    }
  };

  const completeSet = () => {
    if (currentExercise >= workoutData.length) return;
    
    const updatedData = [...workoutData];
    
    // Mark current set as completed
    if (updatedData[currentExercise].completedSets) {
      updatedData[currentExercise].completedSets![currentSet] = true;
      setWorkoutData(updatedData);
      saveWorkoutData();
      
      // Calculate rest time based on exercise type and rep range
      const exercise = updatedData[currentExercise];
      const isCompound = /BENCH PRESS|SQUAT|DEADLIFT|MILITARY PRESS|ROW|PULL-UP/i.test(exercise.name);
      const isMainLift = /BARBELL BENCH PRESS/i.test(exercise.name) && !exercise.name.includes("PAUSE");
      const reps = typeof exercise.reps === 'number' ? exercise.reps : parseInt(exercise.reps);
      
      let recommendedRest = 90; // Default
      
      if (isMainLift) {
        recommendedRest = 180; // 3 minutes for main lifts
      } else if (isCompound) {
        recommendedRest = reps <= 6 ? 180 : 120; // 2-3 minutes for compound lifts
      } else {
        recommendedRest = reps <= 8 ? 90 : 60; // 1-1.5 minutes for isolation
      }
      
      setRestTime(recommendedRest);
      setShowRestTimer(true);
      
      // Move to next set or exercise
      const totalSets = updatedData[currentExercise].sets;
      
      if (currentSet < totalSets - 1) {
        // Move to next set
        setCurrentSet(currentSet + 1);
      } else {
        // Check if there's another exercise
        if (currentExercise < workoutData.length - 1) {
          setCurrentExercise(currentExercise + 1);
          setCurrentSet(0);
        } else {
          // Workout complete
          Alert.alert(
            "Workout Complete",
            "You've completed all exercises! Mark this workout as completed?",
            [
              { text: "Not yet", style: "cancel" },
              { 
                text: "Complete", 
                onPress: () => {
                  setIsCompleted(true);
                  saveWorkoutData(true);
                }
              }
            ]
          );
        }
      }
    }
  };

  const goToPreviousSet = () => {
    if (currentSet > 0) {
      setCurrentSet(currentSet - 1);
    } else if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
      setCurrentSet(workoutData[currentExercise - 1].sets - 1);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading workout data...</Text>
      </View>
    );
  }

  if (workoutData.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.text }]}>No workout data found.</Text>
      </View>
    );
  }

  const currentExerciseData = workoutData[currentExercise];
  const totalSets = currentExerciseData.sets;
  const isSetCompleted = currentExerciseData.completedSets?.[currentSet] || false;

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.titleContainer}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {dayType}
          </Text>
          <Text style={[styles.headerSubtitle, { color: colors.secondaryText }]}>
            Week {week} · Day {day}
          </Text>
        </View>
        
        {isCompleted && (
          <View style={[styles.completedBadge, { backgroundColor: colors.secondary }]}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
        )}
      </View>
      
      <ScrollView style={styles.content}>
        <View style={[styles.exerciseCard, { backgroundColor: colors.card }]}>
          <View style={styles.exerciseHeader}>
            <Text style={[styles.exerciseName, { color: colors.text }]}>
              {currentExerciseData.name}
            </Text>
            
            <Text style={[styles.exerciseInfo, { color: colors.secondaryText }]}>
              {currentExerciseData.sets} sets × {currentExerciseData.reps} reps
              {currentExerciseData.percentage ? ` • ${currentExerciseData.percentage}` : ''}
              {currentExerciseData.rpe ? ` • RPE ${currentExerciseData.rpe}` : ''}
            </Text>
          </View>
          
          {currentExerciseData.notes && (
            <Text style={[styles.exerciseNotes, { backgroundColor: colors.timerBackground, color: colors.text }]}>
              {currentExerciseData.notes}
            </Text>
          )}
          
          <FormCheckVideos exerciseName={currentExerciseData.name} />
          
          {showRestTimer && (
            <CompactRestTimer 
              defaultTime={restTime}
              autoStart={true}
              onComplete={() => setShowRestTimer(false)}
            />
          )}
          
          <View style={styles.setsProgress}>
            {Array.from({ length: totalSets }).map((_, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.setIndicator, 
                  { 
                    backgroundColor: currentExerciseData.completedSets?.[idx] 
                      ? colors.secondary 
                      : idx === currentSet 
                        ? colors.primary 
                        : colors.timerBackground 
                  }
                ]} 
              />
            ))}
          </View>
          
          <View style={styles.setContainer}>
            <View style={styles.setHeader}>
              <Text style={[styles.setTitle, { color: colors.text }]}>
                Set {currentSet + 1} of {totalSets}
              </Text>
              
              <View style={styles.setNavButtons}>
                <TouchableOpacity 
                  style={[styles.navButton, { opacity: currentSet > 0 || currentExercise > 0 ? 1 : 0.5 }]}
                  onPress={goToPreviousSet}
                  disabled={!(currentSet > 0 || currentExercise > 0)}
                >
                  <Ionicons name="arrow-back" size={18} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.setInputRow}>
              <View style={styles.weightInputContainer}>
                <Text style={[styles.inputLabel, { color: colors.secondaryText }]}>Weight</Text>
                <TextInput
                  style={[styles.weightInput, { 
                    backgroundColor: colors.timerBackground,
                    color: colors.text,
                    borderColor: colors.border
                  }]}
                  placeholder="Enter weight"
                  placeholderTextColor={colors.secondaryText}
                  keyboardType="numeric"
                  value={currentExerciseData.weightInputs?.[currentSet] || ''}
                  onChangeText={updateWeight}
                />
                <Text style={[styles.unitText, { color: colors.secondaryText }]}>kg</Text>
              </View>
              
              <TouchableOpacity
                style={[
                  styles.completeButton, 
                  { 
                    backgroundColor: isSetCompleted 
                      ? colors.secondary 
                      : colors.primary
                  }
                ]}
                onPress={completeSet}
                disabled={isSetCompleted}
              >
                <Text style={styles.completeButtonText}>
                  {isSetCompleted ? "Completed" : "Complete Set"}
                </Text>
                {isSetCompleted && (
                  <Ionicons name="checkmark" size={18} color="#fff" style={styles.completeIcon} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: 14,
  },
  completedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  exerciseCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  exerciseHeader: {
    marginBottom: 12,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  exerciseInfo: {
    fontSize: 16,
  },
  exerciseNotes: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 12,
  },
  setsProgress: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  setIndicator: {
    flex: 1,
    height: 4,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  setContainer: {
    marginTop: 8,
  },
  setHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  setTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  setNavButtons: {
    flexDirection: 'row',
  },
  navButton: {
    padding: 8,
  },
  setInputRow: {
    flexDirection: 'column',
    marginBottom: 12,
  },
  weightInputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  weightInput: {
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  unitText: {
    position: 'absolute',
    right: 12,
    top: 40,
    fontSize: 16,
  },
  completeButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  completeIcon: {
    marginLeft: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
});