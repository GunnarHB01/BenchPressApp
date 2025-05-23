import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getImportedProgram } from "../utils/strictProgramValidator";
import { getExerciseImages } from "../utils/ExerciseImages";
import { useTheme } from "../context/ThemeContext";
import RpeCalculator from "../components/RpeCalculator";
import ExerciseSubstitutions from "../components/ExerciseSubstitutions";
import FormCheckVideos from "../components/FormCheckVideos";

const { width } = Dimensions.get("window");

interface Exercise {
  name: string;
  sets: number;
  reps: string | number;
  percentage?: string | number;
  rpe?: string | number;
  rest: string;
  notes?: string;
  weightInputs?: string[];
  repsCompleted?: string[];
  completedSets?: boolean[];
  originalName?: string;
}

// Rest Timer Modal Component
const RestTimerModal = ({
  isVisible,
  timeLeft,
  restTime,
  nextSetInfo,
  onSkipRest,
}: {
  isVisible: boolean;
  timeLeft: number;
  restTime: number;
  nextSetInfo: string;
  onSkipRest: () => void;
}) => {
  // Calculate progress percentage
  const progress = ((restTime - timeLeft) / restTime) * 100;

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isVisible) return null;

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.restTimerOverlay}>
        <View style={styles.restTimerContainer}>
          <Text style={styles.restTimerTitle}>REST TIME</Text>

          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>

          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

          <View style={styles.nextSetInfo}>
            <Text style={styles.nextSetInfoText}>{nextSetInfo}</Text>
          </View>

          <TouchableOpacity style={styles.skipButton} onPress={onSkipRest}>
            <Text style={styles.skipButtonText}>Skip Rest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Percentage Calculator Component
const PercentageCalculator = ({
  isVisible,
  onClose,
  onSelectWeight,
}: {
  isVisible: boolean;
  onClose: () => void;
  onSelectWeight: (weight: string) => void;
}) => {
  const [maxWeight, setMaxWeight] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState("");

  const calculateWeight = () => {
    if (maxWeight && percentage) {
      const max = parseFloat(maxWeight);
      const perc = parseFloat(percentage);

      if (!isNaN(max) && !isNaN(perc)) {
        // Round to nearest 2.5kg for easier plate loading
        const exactResult = max * (perc / 100);
        const roundedResult = Math.round(exactResult / 2.5) * 2.5;
        setResult(roundedResult.toString());
      }
    }
  };

  const applyCalculation = () => {
    if (result) {
      onSelectWeight(result);
      onClose();
    }
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Percentage Calculator</Text>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.calculatorInputRow}>
            <Text style={styles.calculatorLabel}>Max Weight (PR):</Text>
            <TextInput
              style={styles.calculatorInput}
              keyboardType="numeric"
              value={maxWeight}
              onChangeText={setMaxWeight}
              placeholder="Enter PR"
              placeholderTextColor="#666"
            />
            <Text style={styles.calculatorUnit}>kg</Text>
          </View>

          <View style={styles.calculatorInputRow}>
            <Text style={styles.calculatorLabel}>Percentage:</Text>
            <TextInput
              style={styles.calculatorInput}
              keyboardType="numeric"
              value={percentage}
              onChangeText={setPercentage}
              placeholder="Enter %"
              placeholderTextColor="#666"
            />
            <Text style={styles.calculatorUnit}>%</Text>
          </View>

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateWeight}
          >
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>

          {result ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultLabel}>Result:</Text>
              <Text style={styles.resultValue}>{result} kg</Text>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyCalculation}
              >
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default function WorkoutScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();

  // Parse parameters with fallbacks
  const initialWeek = Number(params.week) || 1;
  const initialDay = Number(params.day) || 1;
  const initialType = (params.type as string) || "";

  const [workoutData, setWorkoutData] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [notes, setNotes] = useState("");
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);

  // Image state
  const [showIllustration, setShowIllustration] = useState(false);
  const [cachedImageSource, setCachedImageSource] = useState<{
    photo: string;
    illustration: string;
  } | null>(null);

  // Modal states
  const [showRpeCalculator, setShowRpeCalculator] = useState(false);
  const [showPercentCalculator, setShowPercentCalculator] = useState(false);
  const [showSubstitutions, setShowSubstitutions] = useState(false);

  // Rest timer state
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [restTime, setRestTime] = useState(120);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load workout data on initial render
  useEffect(() => {
    loadWorkoutData();
    saveLastAccessedWorkout();
  }, [initialWeek, initialDay]);

  // Update image source when exercise changes
  useEffect(() => {
    if (workoutData.length > 0 && currentExercise < workoutData.length) {
      const exerciseName = workoutData[currentExercise].name;
      try {
        const images = getExerciseImages(exerciseName);
        console.log(`Loading images for: ${exerciseName}`, images);

        // Validate image URLs before setting
        if (images && images.photo && images.illustration) {
          setCachedImageSource(images);
        } else {
          console.warn(`Invalid images for exercise: ${exerciseName}`);
          // Set fallback images
          setCachedImageSource({
            photo:
              "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg",
            illustration:
              "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg",
          });
        }
      } catch (imageError) {
        console.warn(`Error loading images for ${exerciseName}:`, imageError);
        // Set fallback images
        setCachedImageSource({
          photo:
            "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg",
          illustration:
            "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg",
        });
      }
    }
  }, [workoutData, currentExercise]);

  // Rest timer effect
  useEffect(() => {
    if (showRestTimer && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) {
              clearInterval(timerRef.current);
              timerRef.current = null;
            }

            // IMPORTANT: Use timeout to ensure proper state updates
            setTimeout(() => {
              setShowRestTimer(false);
              moveToNextSet();
            }, 500);

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!showRestTimer) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showRestTimer, timeLeft]);

  // Moved moveToNextSet outside of useEffect to avoid dependency issues
  const moveToNextSet = () => {
    if (
      !workoutData ||
      workoutData.length === 0 ||
      currentExercise >= workoutData.length
    ) {
      return;
    }

    const totalSets = workoutData[currentExercise].sets;

    if (currentSet < totalSets - 1) {
      // Move to next set of current exercise
      setCurrentSet((prev) => prev + 1);
    } else {
      // We've completed all sets of the current exercise
      // Check if there's another exercise
      if (currentExercise < workoutData.length - 1) {
        // Move to the first set of the next exercise
        setCurrentExercise((prev) => prev + 1);
        setCurrentSet(0);
      } else {
        // Workout complete - all exercises done
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
                // Navigate back to home screen after completion
                router.replace("/");
              },
            },
          ]
        );
      }
    }
  };

  // Skip to next incomplete set function
  const skipToNextIncompleteSet = () => {
    if (!workoutData || workoutData.length === 0) return;

    // Start from current position
    let nextExerciseIndex = currentExercise;
    let nextSetIndex = currentSet;
    let found = false;

    // Loop through all exercises starting from current one
    for (let i = nextExerciseIndex; i < workoutData.length; i++) {
      const exercise = workoutData[i];

      // Start set index from current set if it's the current exercise
      // otherwise start from 0
      const startSetIndex = i === nextExerciseIndex ? nextSetIndex + 1 : 0;

      // Loop through all sets for this exercise
      for (let j = startSetIndex; j < exercise.sets; j++) {
        // Check if this set is not completed
        if (!exercise.completedSets || !exercise.completedSets[j]) {
          nextExerciseIndex = i;
          nextSetIndex = j;
          found = true;
          break;
        }
      }

      if (found) break;
    }

    // If we found an incomplete set, navigate to it
    if (found) {
      setCurrentExercise(nextExerciseIndex);
      setCurrentSet(nextSetIndex);
    } else {
      // If all sets are complete, offer to mark workout as complete
      Alert.alert(
        "All Sets Complete",
        "You've completed all exercises in this workout!",
        [
          { text: "OK", style: "default" },
          {
            text: "Mark Workout Complete",
            style: "default",
            onPress: () => {
              setIsCompleted(true);
              saveWorkoutData(true);
              // Navigate back to home screen after completion
              router.replace("/");
            },
          },
        ]
      );
    }
  };

  // Save last accessed workout
  const saveLastAccessedWorkout = async () => {
    try {
      await AsyncStorage.setItem(
        "lastAccessedWorkout",
        JSON.stringify({
          week: initialWeek,
          day: initialDay,
          type: initialType,
        })
      );
    } catch (error) {
      console.error("Error saving last accessed workout:", error);
    }
  };

  const loadWorkoutData = async () => {
    try {
      setLoading(true);
      setError("");

      console.log(
        `Loading workout data for Week ${initialWeek}, Day ${initialDay}`
      );

      // Check for saved workout data
      const savedData = await AsyncStorage.getItem(
        `workout_w${initialWeek}_d${initialDay}`
      );
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (
          parsedData &&
          parsedData.exercises &&
          Array.isArray(parsedData.exercises) &&
          parsedData.exercises.length > 0
        ) {
          setWorkoutData(parsedData.exercises);
          setNotes(parsedData.notes || "");
          setIsCompleted(parsedData.isCompleted || false);
          setLoading(false);
          return;
        }
      }

      // Get from program data
      const programData = await getImportedProgram();
      if (!programData) {
        setError("Failed to load program data.");
        setLoading(false);
        return;
      }

      const weekData = programData[`week${initialWeek}`];
      if (!weekData || !weekData.days || !weekData.days[initialDay - 1]) {
        setError(
          `Workout data not found for Week ${initialWeek} Day ${initialDay}.`
        );
        setLoading(false);
        return;
      }

      const dayData = weekData.days[initialDay - 1];

      // Initialize exercises with empty weight inputs, completed sets, and reps completed
      if (
        dayData &&
        dayData.exercises &&
        Array.isArray(dayData.exercises) &&
        dayData.exercises.length > 0
      ) {
        const initializedExercises = dayData.exercises.map((ex: Exercise) => ({
          ...ex,
          weightInputs: Array(ex.sets).fill(""),
          repsCompleted: Array(ex.sets).fill(""),
          completedSets: Array(ex.sets).fill(false),
          originalName: ex.name, // Store original name for reset functionality
        }));

        console.log(`Loaded ${initializedExercises.length} exercises`);
        setWorkoutData(initializedExercises);
      } else {
        // Handle case when no exercises are found
        setError("No exercises found for this workout day.");
      }
    } catch (error) {
      console.error("Error loading workout data:", error);
      setError("Failed to load workout data. Please try again.");
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
        isCompleted: completed || isCompleted,
      };
      await AsyncStorage.setItem(
        `workout_w${initialWeek}_d${initialDay}`,
        JSON.stringify(dataToSave)
      );

      // Update program progress if workout is completed
      if (completed) {
        await updateProgramProgress();
        // Navigate to home without clearing program data
        router.replace("/");
      }
    } catch (error) {
      console.error("Error saving workout data:", error);
    }
  };

  const updateProgramProgress = async () => {
    try {
      const progressKey = "program_progress";
      const savedProgress = await AsyncStorage.getItem(progressKey);

      let progress = savedProgress ? JSON.parse(savedProgress) : {};

      if (!progress[`week${initialWeek}`]) {
        progress[`week${initialWeek}`] = {};
      }

      progress[`week${initialWeek}`][`day${initialDay}`] = true;

      await AsyncStorage.setItem(progressKey, JSON.stringify(progress));
      console.log(
        `Workout Week ${initialWeek} Day ${initialDay} marked as completed`
      );

      // Reset the navigation stack and go to home screen with refresh parameter
      router.replace("/(tabs)", {
        refresh: Date.now().toString(),
      });
    } catch (error) {
      console.error("Error updating program progress:", error);
      // Even if there's an error, still try to navigate home
      router.replace("/");
    }
  };

  const updateWeight = (weight: string) => {
    if (currentExercise >= workoutData.length) return;

    // Only allow numbers and decimal points
    if (weight && !/^[0-9]*\.?[0-9]*$/.test(weight)) return;

    const updatedData = [...workoutData];
    if (updatedData[currentExercise].weightInputs) {
      updatedData[currentExercise].weightInputs![currentSet] = weight;
      setWorkoutData(updatedData);
      saveWorkoutData();
    }
  };

  const updateRepsCompleted = (reps: string) => {
    if (currentExercise >= workoutData.length) return;

    // Only allow numbers (no decimals for reps)
    if (reps && !/^[0-9]*$/.test(reps)) return;

    const updatedData = [...workoutData];
    if (!updatedData[currentExercise].repsCompleted) {
      updatedData[currentExercise].repsCompleted = Array(
        updatedData[currentExercise].sets
      ).fill("");
    }

    updatedData[currentExercise].repsCompleted![currentSet] = reps;
    setWorkoutData(updatedData);
    saveWorkoutData();
  };

  const getRecommendedRestTime = (exercise: Exercise): number => {
    // Based on main vs accessory, compound vs isolation, and rep range
    const isCompound =
      /BENCH PRESS|SQUAT|DEADLIFT|MILITARY PRESS|ROW|PULL-UP/i.test(
        exercise.name
      );
    const isMainLift =
      /BARBELL BENCH PRESS/i.test(exercise.name) &&
      !exercise.name.includes("PAUSE");
    const reps =
      typeof exercise.reps === "number"
        ? exercise.reps
        : parseInt(exercise.reps.toString());

    if (isMainLift) {
      return 180; // 3 minutes rest for main lifts
    } else if (isCompound) {
      return reps <= 6 ? 180 : 120; // 2-3 minutes for compound lifts
    } else {
      // Check the rest parameter directly, as Jeff specifies it in the program
      const restMatch = exercise.rest.match(/(\d+)/);
      if (restMatch) {
        return parseInt(restMatch[1]) * 60; // Convert minutes to seconds
      }

      // Default based on isolation and rep range
      return reps <= 8 ? 90 : 60; // 1-1.5 minutes for isolation
    }
  };

  const completeSet = () => {
    if (!workoutData || currentExercise >= workoutData.length) return;

    const updatedData = [...workoutData];

    // Mark current set as completed
    if (updatedData[currentExercise].completedSets) {
      updatedData[currentExercise].completedSets![currentSet] = true;
      setWorkoutData(updatedData);
      saveWorkoutData();

      // Calculate rest time based on exercise type
      const exercise = updatedData[currentExercise];
      const recommendedRest = getRecommendedRestTime(exercise);
      setRestTime(recommendedRest);
      setTimeLeft(recommendedRest);

      // Show the rest timer modal
      setShowRestTimer(true);
    }
  };

  // Skip rest timer
  const skipRest = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Close modal and move to next set
    setShowRestTimer(false);
    moveToNextSet();
  };

  const navigateToSet = (exerciseIndex: number, setIndex: number) => {
    if (!workoutData || workoutData.length === 0) return;

    if (
      exerciseIndex < workoutData.length &&
      workoutData[exerciseIndex] &&
      setIndex < workoutData[exerciseIndex].sets
    ) {
      setCurrentExercise(exerciseIndex);
      setCurrentSet(setIndex);
    }
  };

  // Handler for weight selection from calculator
  const handleWeightSelect = (weight: string) => {
    updateWeight(weight);
  };

  // Exercise substitution handler
  const handleSubstituteSelect = (substitute: string) => {
    if (currentExercise >= workoutData.length) return;

    const updatedData = [...workoutData];
    updatedData[currentExercise].name = substitute;
    setWorkoutData(updatedData);
    saveWorkoutData();
  };

  // Get icon for exercise
  const getExerciseIcon = (exerciseName: string) => {
    const name = exerciseName.toLowerCase();
    if (name.includes("bench")) return "barbell-outline";
    if (name.includes("squat")) return "body-outline";
    if (name.includes("deadlift")) return "barbell-outline";
    if (name.includes("curl")) return "fitness-outline";
    return "barbell-outline";
  };

  // Get next set info for rest timer
  const getNextSetInfo = () => {
    if (
      !workoutData ||
      workoutData.length === 0 ||
      currentExercise >= workoutData.length
    ) {
      return "Ready";
    }

    if (currentSet < workoutData[currentExercise].sets - 1) {
      return `Next: Set ${currentSet + 2} of ${
        workoutData[currentExercise].sets
      } • ${workoutData[currentExercise].name}`;
    } else if (currentExercise < workoutData.length - 1) {
      return `Next: ${workoutData[currentExercise + 1].name}`;
    } else {
      return "Workout Complete!";
    }
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
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.tryAgainButton}
          onPress={loadWorkoutData}
        >
          <Text style={styles.tryAgainButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (workoutData.length === 0) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.errorText}>No workout data found.</Text>
        <TouchableOpacity
          style={styles.tryAgainButton}
          onPress={() => router.back()}
        >
          <Text style={styles.tryAgainButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentExerciseData = workoutData[currentExercise];

  // Skip this check if data isn't loaded yet
  if (!currentExerciseData) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.errorText}>Loading exercise data...</Text>
      </View>
    );
  }

  const totalSets = currentExerciseData.sets;
  const isSetCompleted =
    currentExerciseData.completedSets?.[currentSet] || false;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>{initialType}</Text>
          <Text style={styles.headerSubtitle}>
            Week {initialWeek} · Day {initialDay}
          </Text>
        </View>

        {isCompleted ? (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.skipToNextButton}
            onPress={skipToNextIncompleteSet}
          >
            <Ionicons name="play-skip-forward" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.exerciseHeader}>
          <Ionicons
            name={getExerciseIcon(currentExerciseData.name)}
            size={24}
            color="#3182CE"
            style={styles.exerciseIcon}
          />
          <Text style={styles.exerciseName}>{currentExerciseData.name}</Text>
          <TouchableOpacity
            style={styles.swapButton}
            onPress={() => setShowSubstitutions(true)}
          >
            <Ionicons name="swap-horizontal" size={20} color="#3182CE" />
          </TouchableOpacity>
        </View>

        {/* Set Tabs */}
        <View style={styles.tabsContainer}>
          {Array.from({ length: totalSets }).map((_, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.setTab,
                idx === currentSet ? styles.currentSetTab : null,
                currentExerciseData.completedSets?.[idx]
                  ? styles.completedSetTab
                  : null,
              ]}
              onPress={() => navigateToSet(currentExercise, idx)}
            >
              <Text
                style={[
                  styles.setTabText,
                  idx === currentSet || currentExerciseData.completedSets?.[idx]
                    ? styles.activeSetTabText
                    : null,
                ]}
              >
                {idx + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Exercise Image */}
        <View style={styles.imageContainer}>
          {cachedImageSource && (
            <Image
              source={{
                uri: showIllustration
                  ? cachedImageSource.illustration ||
                    "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg"
                  : cachedImageSource.photo ||
                    "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg",
              }}
              style={styles.exerciseImage}
              resizeMode="cover"
              onError={(e) => {
                console.error("Image loading error:", e.nativeEvent.error);
                // Set a guaranteed fallback image
                setCachedImageSource({
                  photo:
                    "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg",
                  illustration:
                    "https://static.strengthlevel.com/images/illustrations/bench-press-1000x1000.jpg",
                });
              }}
              onLoad={() => console.log("Image loaded successfully")}
            />
          )}
          {!cachedImageSource && (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="barbell-outline" size={50} color="#666" />
              <Text style={styles.imagePlaceholderText}>Exercise Image</Text>
            </View>
          )}
        </View>

        {/* Percentage Badge */}
        {currentExerciseData.percentage && (
          <View style={styles.badgeContainer}>
            <TouchableOpacity
              style={styles.percentageBadge}
              onPress={() => setShowPercentCalculator(true)}
            >
              <Text style={styles.percentageBadgeText}>
                {currentExerciseData.percentage}%
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Exercise Notes */}
        {currentExerciseData.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesText}>{currentExerciseData.notes}</Text>
          </View>
        )}

        {/* Set Info Section */}
        <View style={styles.setInfoContainer}>
          <View style={styles.setInfoHeader}>
            <Text style={styles.setNumberText}>Set {currentSet + 1}</Text>
            <Text style={styles.restInfoText}>
              Rest: {Math.floor(restTime / 60)}:
              {(restTime % 60).toString().padStart(2, "0")}
            </Text>
          </View>

          {/* Weight and Reps Inputs */}
          <View style={styles.inputsRow}>
            {/* Weight Input */}
            <View style={styles.weightSection}>
              <Text style={styles.inputLabel}>Weight</Text>
              <View style={styles.weightInputContainer}>
                <TextInput
                  style={styles.weightInput}
                  placeholder="Enter weight"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  value={currentExerciseData.weightInputs?.[currentSet] || ""}
                  onChangeText={updateWeight}
                />
                <Text style={styles.weightUnit}>kg</Text>
              </View>

              {/* Calculator buttons */}
              <View style={styles.calculatorButtonsRow}>
                <TouchableOpacity
                  style={styles.calculatorButton}
                  onPress={() => setShowPercentCalculator(true)}
                >
                  <Ionicons
                    name="calculator-outline"
                    size={14}
                    color="#3182CE"
                  />
                  <Text style={styles.calculatorButtonText}>% Calculate</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.calculatorButton}
                  onPress={() => setShowRpeCalculator(true)}
                >
                  <Ionicons
                    name="calculator-outline"
                    size={14}
                    color="#3182CE"
                  />
                  <Text style={styles.calculatorButtonText}>RPE Calculate</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Reps Input - Target only, no "Actual" */}
            <View style={styles.repsSection}>
              <Text style={styles.inputLabel}>Reps</Text>
              <View style={styles.targetRepsBox}>
                <Text style={styles.targetRepsLabel}>Target:</Text>
                <Text style={styles.targetRepsValue}>
                  {currentExerciseData.reps}
                </Text>
              </View>
            </View>
          </View>

          {/* Complete Button */}
          <TouchableOpacity
            style={[
              styles.completeSetButton,
              isSetCompleted && styles.completedButton,
            ]}
            onPress={() => completeSet()}
            disabled={isSetCompleted}
          >
            <Text style={styles.completeSetButtonText}>
              {isSetCompleted ? "Completed" : "Complete Set"}
            </Text>
            {isSetCompleted && (
              <Ionicons
                name="checkmark"
                size={18}
                color="#fff"
                style={styles.completeIcon}
              />
            )}
          </TouchableOpacity>

          {/* Skip Button - only show when current set is completed */}
          {isSetCompleted && (
            <TouchableOpacity
              style={styles.skipButtonAlt}
              onPress={skipToNextIncompleteSet}
            >
              <Ionicons
                name="play-skip-forward"
                size={18}
                color="#fff"
                style={styles.skipIcon}
              />
              <Text style={styles.skipButtonText}>Skip to Next Incomplete</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Form Videos Component - Replaces the old form videos button */}
        <FormCheckVideos exerciseName={currentExerciseData.name} />
      </ScrollView>

      {/* Modals */}
      <RestTimerModal
        isVisible={showRestTimer}
        timeLeft={timeLeft}
        restTime={restTime}
        nextSetInfo={getNextSetInfo()}
        onSkipRest={skipRest}
      />

      <PercentageCalculator
        isVisible={showPercentCalculator}
        onClose={() => setShowPercentCalculator(false)}
        onSelectWeight={handleWeightSelect}
      />

      {showRpeCalculator && (
        <RpeCalculator
          isVisible={showRpeCalculator}
          onClose={() => setShowRpeCalculator(false)}
          currentWeight={currentExerciseData.weightInputs?.[currentSet] || ""}
          currentReps={
            currentExerciseData.repsCompleted?.[currentSet] ||
            currentExerciseData.reps ||
            ""
          }
          currentRpe={currentExerciseData.rpe || ""}
          onWeightSelect={handleWeightSelect}
        />
      )}

      {/* Exercise Substitutions */}
      {showSubstitutions && currentExerciseData && (
        <ExerciseSubstitutions
          isVisible={showSubstitutions}
          onClose={() => setShowSubstitutions(false)}
          exerciseName={currentExerciseData.name}
          onSelectSubstitute={handleSubstituteSelect}
          currentExerciseIsOriginal={
            currentExerciseData.name === currentExerciseData.originalName
          }
          originalName={currentExerciseData.originalName}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingBottom: Platform.OS === "ios" ? 90 : 80, // Add padding for tab bar
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 16,
    fontSize: 16,
  },
  errorText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tryAgainButton: {
    backgroundColor: "#3182CE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  tryAgainButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  backButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#999",
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#48BB78",
    alignItems: "center",
    justifyContent: "center",
  },
  skipToNextButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(49, 130, 206, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === "ios" ? 90 : 80, // Add padding for scrolling content
  },
  exerciseHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 16,
  },
  exerciseIcon: {
    marginRight: 10,
  },
  exerciseName: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  swapButton: {
    padding: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#1A1A1A",
    paddingBottom: 12,
  },
  setTab: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#252525",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  currentSetTab: {
    backgroundColor: "#3182CE",
  },
  completedSetTab: {
    backgroundColor: "#48BB78",
  },
  setTabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#888",
  },
  activeSetTabText: {
    color: "#fff",
  },
  imageContainer: {
    minHeight: 180,
    maxHeight: 250, // Allow some flexibility
    backgroundColor: "#252525",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  exerciseImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Shows full image, may have empty space
    backgroundColor: "#1a1a1a", // Fill empty space with darker color
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#252525",
  },
  imagePlaceholderText: {
    color: "#666",
    marginTop: 8,
    fontSize: 14,
  },
  badgeContainer: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 10,
  },
  percentageBadge: {
    backgroundColor: "#3182CE",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  percentageBadgeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  notesContainer: {
    backgroundColor: "#252525",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  notesText: {
    color: "#ccc",
    fontSize: 14,
  },
  setInfoContainer: {
    backgroundColor: "#1A1A1A",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  setInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  setNumberText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  restInfoText: {
    fontSize: 14,
    color: "#888",
  },
  inputsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  weightSection: {
    flex: 1,
    marginRight: 8,
  },
  repsSection: {
    width: 110,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888",
    marginBottom: 8,
  },
  weightInputContainer: {
    height: 46,
    position: "relative",
    backgroundColor: "#252525",
    borderRadius: 8,
    marginBottom: 8,
  },
  weightInput: {
    height: "100%",
    paddingHorizontal: 12,
    paddingRight: 36,
    color: "#fff",
    fontSize: 16,
  },
  weightUnit: {
    position: "absolute",
    right: 12,
    top: 13,
    color: "#888",
    fontSize: 16,
  },
  calculatorButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calculatorButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  calculatorButtonText: {
    color: "#3182CE",
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "500",
  },
  targetRepsBox: {
    height: 46,
    backgroundColor: "#252525",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  targetRepsLabel: {
    fontSize: 14,
    color: "#888",
  },
  targetRepsValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  completeSetButton: {
    backgroundColor: "#3182CE",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  completedButton: {
    backgroundColor: "#48BB78",
  },
  completeSetButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  completeIcon: {
    marginLeft: 8,
  },
  skipButtonAlt: {
    backgroundColor: "#444",
    borderRadius: 24,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 12,
  },
  skipIcon: {
    marginRight: 6,
  },
  skipButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  // Rest Timer Modal Styles
  restTimerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  restTimerContainer: {
    width: width - 48,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  restTimerTitle: {
    color: "#3182CE",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 20,
    letterSpacing: 1,
  },
  progressBarContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#252525",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#3182CE",
  },
  timerText: {
    fontSize: 60,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 16,
  },
  nextSetInfo: {
    backgroundColor: "#252525",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginBottom: 16,
  },
  nextSetInfoText: {
    color: "#ccc",
    textAlign: "center",
    fontSize: 14,
  },
  skipButton: {
    backgroundColor: "#252525",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width - 40,
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  modalCloseButton: {
    padding: 4,
  },
  // Percentage Calculator Styles
  calculatorInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  calculatorLabel: {
    width: 120,
    fontSize: 14,
    color: "#ccc",
  },
  calculatorInput: {
    flex: 1,
    backgroundColor: "#252525",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    color: "#fff",
  },
  calculatorUnit: {
    width: 30,
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  calculateButton: {
    backgroundColor: "#3182CE",
    height: 44,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    backgroundColor: "#252525",
    padding: 16,
    borderRadius: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: "#48BB78",
    borderRadius: 8,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
