import { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { useLocalSearchParams, Redirect } from 'expo-router';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getImportedProgram, ProgramData } from '../../utils/nippardPdfParser';
import { useTheme } from '../../context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import WorkoutCard from '../../components/WorkoutCard';
import { useAuth } from '../../context/AuthContext';

export default function HomeScreen() {
  const params = useLocalSearchParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [completedWorkouts, setCompletedWorkouts] = useState<{[key: string]: boolean}>({});
  const { colors } = useTheme();
  const { user, isLoading: authLoading } = useAuth();
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  
  const totalWeeks = 8;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  // Check authentication first, but use state for redirection
  useEffect(() => {
    // Only check after auth loading is complete
    if (!authLoading && !user) {
      console.log("User not logged in, will redirect to login");
      setRedirectToLogin(true);
    }
  }, [user, authLoading]);

  // Pull-to-refresh functionality
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([loadProgramData(), loadCompletedWorkouts()])
      .finally(() => {
        setRefreshing(false);
      });
  }, []);

  // Check for refresh parameter and load data on mount
  useEffect(() => {
    if (!authLoading && user) {
      console.log("Starting to load progress data...");
      loadProgramData();
      loadCompletedWorkouts();
      
      if (params.refresh) {
        console.log('Refreshing due to navigation parameter');
        setRefreshKey(prev => prev + 1);
      }
    }
  }, [params.refresh, refreshKey, authLoading, user]);
  
  const loadProgramData = async () => {
    setLoading(true);
    try {
      const data = await getImportedProgram();
      if (data) {
        setProgramData(data);
      }
    } catch (error) {
      console.error('Error loading program data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCompletedWorkouts = async () => {
    try {
      console.log("Starting to load progress data...");
      const keys = await AsyncStorage.getAllKeys();
      const workoutKeys = keys.filter(k => k.startsWith('progress_') || k === 'program_progress');
      console.log("Found", workoutKeys.length, "workout keys");
      
      const progressData = await AsyncStorage.getItem('program_progress');
      if (progressData) {
        setCompletedWorkouts(JSON.parse(progressData));
      } else {
        // Reset completedWorkouts if no progress data exists
        setCompletedWorkouts({});
      }
      console.log("Finished loading progress data");
    } catch (error) {
      console.error('Error loading completed workouts:', error);
    }
  };

  const isWorkoutCompleted = (week: number, day: number) => {
    return completedWorkouts?.[`week${week}`]?.[`day${day}`] || false;
  };

  // Function to navigate to workout preview
  const navigateToWorkoutPreview = (week: number, day: number, type: string) => {
    router.push({
      pathname: '/workout-preview',
      params: { 
        week, 
        day, 
        type 
      }
    });
  };

  // Add function to check if all workouts in a week are completed
  const isWeekCompleted = (weekNum: number) => {
    if (!programData || !programData[`week${weekNum}`] || !programData[`week${weekNum}`].days) {
      return false;
    }
    
    const days = programData[`week${weekNum}`].days;
    return days.every((_, index) => isWorkoutCompleted(weekNum, index + 1));
  };

  // Redirect to login if needed (using Redirect component instead of programmatic navigation)
  if (redirectToLogin) {
    return <Redirect href="/login" />;
  }

  // Show loading for both auth and data loading
  if (authLoading || loading || !programData) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3182CE" />
        <Text style={styles.loadingText}>Loading program data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Nippard Bench Press
        </Text>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${calculateCompletionPercentage()}%` }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.weeksContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.weekButtonsContainer}
        >
          {weeks.map(week => (
            <TouchableOpacity
              key={week}
              style={[
                styles.weekButton,
                selectedWeek === week && styles.selectedWeekButton,
                isWeekCompleted(week) && styles.completedWeekButton
              ]}
              onPress={() => setSelectedWeek(week)}
            >
              <Text style={[
                styles.weekButtonText,
                selectedWeek === week && styles.selectedWeekButtonText,
                isWeekCompleted(week) && styles.completedWeekButtonText
              ]}>
                Week {week}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.daysContainer}>
        <FlatList
          data={programData[`week${selectedWeek}`]?.days || []}
          keyExtractor={(_, index) => `day-${index}`}
          renderItem={({ item, index }) => (
            <WorkoutCard
              weekNumber={selectedWeek}
              dayNumber={index + 1}
              workoutType={item.type}
              isCompleted={isWorkoutCompleted(selectedWeek, index + 1)}
              onPress={() => 
                // Navigate to workout preview instead of workout
                navigateToWorkoutPreview(
                  selectedWeek, 
                  index + 1, 
                  item.type
                )
              }
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.workoutListContent}
          // Add pull-to-refresh functionality
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#3182CE']}
              tintColor={'#3182CE'}
              title="Pull to refresh"
              titleColor={'#fff'}
            />
          }
        />
      </View>
    </View>
  );
  
  function calculateCompletionPercentage() {
    if (!completedWorkouts) return 0;
    
    let completed = 0;
    let total = 0;
    
    for (let w = 1; w <= totalWeeks; w++) {
      if (programData?.[`week${w}`]?.days) {
        const dayCount = programData[`week${w}`].days.length;
        total += dayCount;
        
        for (let d = 1; d <= dayCount; d++) {
          if (isWorkoutCompleted(w, d)) {
            completed++;
          }
        }
      }
    }
    
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingBottom: 80,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#3182CE',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#2D3748',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: '#3182CE',
  },
  weeksContainer: {
    paddingVertical: 8,
  },
  weekButtonsContainer: {
    paddingHorizontal: 16,
  },
  weekButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 85,
    backgroundColor: '#1E1E1E',
  },
  selectedWeekButton: {
    backgroundColor: '#3182CE',
  },
  completedWeekButton: {
    backgroundColor: '#48BB78', // Green color for completed weeks
  },
  weekButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  selectedWeekButtonText: {
    color: '#fff',
  },
  completedWeekButtonText: {
    color: '#fff',
  },
  daysContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  workoutListContent: {
    paddingBottom: 20,
  },
});