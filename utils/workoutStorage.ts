// utils/workoutStorage.ts:
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Interface for storing the last accessed workout
 */
export interface LastWorkout {
  week: number;
  day: number;
  type?: string;
  timestamp: number;
}

/**
 * Saves the last accessed workout information to AsyncStorage
 */
export const saveLastAccessedWorkout = async (
  week: number,
  day: number,
  type?: string
): Promise<void> => {
  try {
    if (!week || !day || week <= 0 || day <= 0) {
      console.log('Invalid workout data, not saving');
      return;
    }
    
    const workoutData: LastWorkout = {
      week,
      day,
      type,
      timestamp: new Date().getTime()
    };
    
    await AsyncStorage.setItem('lastAccessedWorkout', JSON.stringify(workoutData));
    console.log(`Last workout saved: Week ${week}, Day ${day}`);
  } catch (error) {
    console.error('Error saving last accessed workout:', error);
  }
};

/**
 * Retrieves the last accessed workout from AsyncStorage
 * Returns null if no workout is found or if there's an error
 */
export const getLastAccessedWorkout = async (): Promise<LastWorkout | null> => {
  try {
    const lastWorkoutData = await AsyncStorage.getItem('lastAccessedWorkout');
    if (!lastWorkoutData) {
      console.log('No last workout found');
      return null;
    }
    
    const workout = JSON.parse(lastWorkoutData) as LastWorkout;
    console.log(`Retrieved last workout: Week ${workout.week}, Day ${workout.day}`);
    return workout;
  } catch (error) {
    console.error('Error retrieving last accessed workout:', error);
    return null;
  }
};

/**
 * Get workout type based on day number
 * Customize this based on your program structure
 */
export const getWorkoutType = (week: number, day: number): string => {
  const types = ['Upper Body', 'Lower Body', 'Push', 'Pull', 'Legs', 'Arms', 'Full Body'];
  return types[(day - 1) % types.length];
};