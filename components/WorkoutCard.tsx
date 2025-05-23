// components/WorkoutCard.tsx
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface WorkoutCardProps {
  weekNumber: number;
  dayNumber: number;
  workoutType: string;
  isCompleted: boolean;
  onPress: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  weekNumber,
  dayNumber,
  workoutType,
  isCompleted,
  onPress
}) => {
  // Choose icon based on workout type
  const getWorkoutIcon = () => {
    const type = workoutType.toLowerCase();
    if (type.includes('upper')) return 'body-outline';
    if (type.includes('lower')) return 'barbell-outline';
    return 'fitness-outline';
  };

  return (
    <TouchableOpacity 
      style={[
        styles.card,
        isCompleted && styles.completedCard
      ]} 
      onPress={onPress}
    >
      <View style={[styles.iconContainer, isCompleted && styles.completedIconContainer]}>
        <Ionicons name={getWorkoutIcon()} size={24} color={isCompleted ? "#48BB78" : "#3182CE"} />
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.dayLabel}>WEEK {weekNumber} • DAY {dayNumber}</Text>
        <Text style={styles.typeLabel}>{workoutType}</Text>
      </View>
      
      <View style={styles.arrowContainer}>
        {isCompleted ? (
          <Ionicons name="checkmark-circle" size={24} color="#48BB78" />
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#666" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    borderRadius: 12,
    marginBottom: 10,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#3182CE',
  },
  completedCard: {
    borderLeftColor: '#48BB78',
    backgroundColor: 'rgba(72, 187, 120, 0.1)', // Subtle green tint
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(49, 130, 206, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  completedIconContainer: {
    backgroundColor: 'rgba(72, 187, 120, 0.1)',
  },
  contentContainer: {
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  typeLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  arrowContainer: {
    paddingLeft: 8,
  },
});

export default WorkoutCard;