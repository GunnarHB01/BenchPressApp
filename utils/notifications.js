// utils/notifications.js
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Schedule a workout reminder
export const scheduleWorkoutReminder = async (dayOfWeek, hour, minute) => {
  // Request permissions
  const { status } = await Notifications.requestPermissionsAsync();
  
  if (status !== 'granted') {
    return false;
  }
  
  // Cancel any existing reminders
  await cancelWorkoutReminders();
  
  // Schedule new reminder
  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Workout Reminder',
      body: "Don't forget your bench press workout today!",
      sound: true,
    },
    trigger: {
      weekday: dayOfWeek, // 1-7 (Monday-Sunday)
      hour: hour,
      minute: minute,
      repeats: true,
    },
  });
  
  // Save notification ID
  await AsyncStorage.setItem('workout_reminder_id', identifier);
  
  return true;
};

// Cancel workout reminders
export const cancelWorkoutReminders = async () => {
  const identifier = await AsyncStorage.getItem('workout_reminder_id');
  
  if (identifier) {
    await Notifications.cancelScheduledNotificationAsync(identifier);
    await AsyncStorage.removeItem('workout_reminder_id');
  }
};

// Check if reminder is set
export const isReminderSet = async () => {
  const identifier = await AsyncStorage.getItem('workout_reminder_id');
  return !!identifier;
};