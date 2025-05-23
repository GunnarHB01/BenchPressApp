// utils/backupUtils.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';

/**
 * Export all workout data to a JSON file
 */
export const exportWorkoutData = async (): Promise<boolean> => {
  try {
    // Get all workout keys
    const keys = await AsyncStorage.getAllKeys();
    const workoutKeys = keys.filter(k => k.startsWith('workout_'));
    
    // Get data for all keys
    const results = await AsyncStorage.multiGet(workoutKeys);
    
    // Format data for export
    const exportData = {
      programName: "Jeff Nippard's Bench Press Program",
      exportDate: new Date().toISOString(),
      workouts: {}
    };
    
    results.forEach(([key, value]) => {
      if (value) {
        exportData.workouts[key] = JSON.parse(value);
      }
    });
    
    // Convert to JSON
    const jsonString = JSON.stringify(exportData, null, 2);
    
    // Generate a filename with date
    const date = new Date();
    const filename = `bench_press_data_${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`;
    
    // Save to file
    const fileUri = `${FileSystem.documentDirectory}${filename}`;
    await FileSystem.writeAsStringAsync(fileUri, jsonString);
    
    // Share file
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
      return true;
    } else {
      console.error('Sharing not available');
      return false;
    }
  } catch (error) {
    console.error('Error exporting data:', error);
    return false;
  }
};

/**
 * Import workout data from a JSON file
 */
export const importWorkoutData = async (): Promise<boolean> => {
  try {
    // Pick a document
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
      copyToCacheDirectory: true,
    });
    
    if (result.canceled) {
      return false;
    }
    
    // Read file
    const fileUri = result.assets[0].uri;
    const jsonString = await FileSystem.readAsStringAsync(fileUri);
    
    // Parse JSON
    const importedData = JSON.parse(jsonString);
    
    // Validate format
    if (!importedData.workouts) {
      console.error('Invalid data format');
      return false;
    }
    
    // Store each workout in AsyncStorage
    const savePromises = Object.entries(importedData.workouts).map(([key, data]) => {
      return AsyncStorage.setItem(key, JSON.stringify(data));
    });
    
    await Promise.all(savePromises);
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};