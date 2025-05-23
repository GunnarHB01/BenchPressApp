import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration, Modal, TextInput } from 'react-native';
import { Audio } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '../context/ThemeContext';
import Svg, { Circle } from 'react-native-svg';

interface SimpleCompactTimerProps {
  defaultTime?: number;
  onComplete?: () => void;
  autoStart?: boolean;
  percentage?: number | string;
  startOnSetComplete?: boolean; // New prop to indicate if timer should start when set is completed
  setCompleted?: boolean; // New prop to track if a set was just completed
}

const timerSize = 90; // Fixed size for timer

const SimpleCompactTimer: React.FC<SimpleCompactTimerProps> = ({ 
  defaultTime = 90, 
  onComplete,
  autoStart = false, // Changed default to false
  percentage,
  startOnSetComplete = true, // Default to true
  setCompleted = false
}) => {
  const { colors } = useTheme();
  const [timeRemaining, setTimeRemaining] = useState(defaultTime);
  const [isActive, setIsActive] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [maxWeight, setMaxWeight] = useState('');
  const [calculatedWeight, setCalculatedWeight] = useState<number | null>(null);
  
  // Store the progress value directly instead of using animations
  const [progressValue, setProgressValue] = useState(1);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  const pausedTimeRef = useRef<number | null>(null);
  const prevSetCompletedRef = useRef<boolean>(false);

  // Start timer automatically when component mounts if autoStart is true
  useEffect(() => {
    if (autoStart) {
      startTimer();
    }
    
    return () => cleanupTimer();
  }, []);

  // Watch for set completion to start timer
  useEffect(() => {
    // Only start timer if set was just completed and it wasn't already completed before
    if (startOnSetComplete && setCompleted && !prevSetCompletedRef.current) {
      startTimer();
    }
    
    // Update previous state
    prevSetCompletedRef.current = setCompleted;
  }, [setCompleted]);

  const cleanupTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (soundRef.current) {
      soundRef.current.unloadAsync();
    }
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sounds/timer-complete.mp3')
      );
      soundRef.current = sound;
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const startTimer = () => {
    // If timer is already active, do nothing
    if (isActive) return;
    
    setIsActive(true);
    setIsPaused(false);
    
    // Resume from saved time if timer was paused
    const startingTime = pausedTimeRef.current !== null ? pausedTimeRef.current : defaultTime;
    pausedTimeRef.current = null;
    
    // Reset timer to default time when starting after set completion
    setTimeRemaining(startingTime);
    
    // Calculate progress
    setProgressValue(startingTime / defaultTime);
    
    intervalRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = prev - 1;
        
        if (newTime <= 0) {
          clearInterval(intervalRef.current!);
          setIsActive(false);
          setIsPaused(false);
          setProgressValue(0);
          
          Vibration.vibrate([0, 500, 200, 500]);
          playSound();
          
          if (onComplete) {
            onComplete();
          }
          
          return 0;
        }
        
        // Update progress value
        setProgressValue(newTime / defaultTime);
        return newTime;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Save current time when paused
    pausedTimeRef.current = timeRemaining;
    setIsActive(false);
    setIsPaused(true);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    pausedTimeRef.current = null;
    setTimeRemaining(defaultTime);
    setProgressValue(1);
    setIsActive(false);
    setIsPaused(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculatePercentageWeight = () => {
    if (!maxWeight || !percentage) return;
    
    const max = parseFloat(maxWeight);
    const percentValue = typeof percentage === 'string' 
      ? parseFloat(percentage.replace('%', '')) 
      : percentage;
    
    if (isNaN(max) || isNaN(percentValue)) return;
    
    const result = (max * percentValue) / 100;
    setCalculatedWeight(Math.round(result * 100) / 100); // Round to 2 decimal places
  };

  // Calculate circle properties
  const circleCircumference = 2 * Math.PI * (timerSize / 2 - 5);
  const strokeDashoffset = circleCircumference * (1 - progressValue);

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.timerRow}>
        <View style={styles.timerContainer}>
          <Svg width={timerSize} height={timerSize} style={styles.progressCircle}>
            <Circle 
              cx={timerSize/2}
              cy={timerSize/2}
              r={timerSize/2 - 5}
              stroke={colors.border}
              strokeWidth={3}
              fill="transparent"
            />
            <Circle 
              cx={timerSize/2}
              cy={timerSize/2}
              r={timerSize/2 - 5}
              stroke={(isActive || isPaused) ? colors.primary : colors.secondary}
              strokeWidth={3}
              fill="transparent"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90, ${timerSize/2}, ${timerSize/2})`}
            />
          </Svg>
          
          <View style={styles.timerCenter}>
            <Text style={[styles.timeText, { color: (isActive || isPaused) ? colors.primary : colors.text }]}>
              {formatTime(timeRemaining)}
            </Text>
            <Text style={[styles.restLabel, { color: colors.secondaryText }]}>REST</Text>
          </View>
        </View>
        
        <View style={styles.controls}>
          {isActive ? (
            <TouchableOpacity
              style={[styles.mainButton, { backgroundColor: colors.accent }]}
              onPress={pauseTimer}
            >
              <Ionicons name="pause" size={20} color="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.mainButton, { backgroundColor: colors.primary }]}
              onPress={startTimer}
            >
              <Ionicons name="play" size={20} color="#fff" />
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: colors.timerBackground }]}
            onPress={resetTimer}
          >
            <Ionicons name="refresh" size={16} color={colors.secondaryText} />
          </TouchableOpacity>
        </View>
      </View>

      {percentage && (
        <TouchableOpacity 
          style={[styles.percentageContainer, { backgroundColor: colors.primary + '20' }]}
          onPress={() => setShowCalculator(true)}
        >
          <Text style={[styles.percentageText, { color: colors.primary }]}>
            {typeof percentage === 'number' ? `${percentage}%` : percentage}
          </Text>
          <View style={styles.prBadge}>
            <Text style={styles.prText}>PR</Text>
          </View>
          {calculatedWeight !== null && (
            <Text style={[styles.calculatedText, { color: colors.text }]}>
              {calculatedWeight} kg
            </Text>
          )}
        </TouchableOpacity>
      )}

      {/* Weight Calculator Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCalculator}
        onRequestClose={() => setShowCalculator(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Calculate {percentage}% of your max
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: colors.secondaryText }]}>Your PR/Max Weight (kg)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
                keyboardType="numeric"
                placeholder="Enter weight"
                placeholderTextColor={colors.secondaryText}
                value={maxWeight}
                onChangeText={setMaxWeight}
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.calcButton, { backgroundColor: colors.primary }]}
                onPress={() => {
                  calculatePercentageWeight();
                  setShowCalculator(false);
                }}
              >
                <Text style={styles.calcButtonText}>Calculate</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.cancelButton, { backgroundColor: colors.timerBackground }]}
                onPress={() => setShowCalculator(false)}
              >
                <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerContainer: {
    position: 'relative',
    width: timerSize,
    height: timerSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    position: 'absolute',
  },
  timerCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 20,
    fontWeight: '700',
  },
  restLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  controls: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 10,
    height: timerSize,
    justifyContent: 'center',
  },
  mainButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  resetButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '600',
  },
  prBadge: {
    backgroundColor: '#3182CE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  prText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  calculatedText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calcButton: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  calcButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SimpleCompactTimer;