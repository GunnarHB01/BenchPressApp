import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { calculate1RM, calculateWeightForRPE } from '../utils/rpeCalculator';
import { useTheme } from '../context/ThemeContext';

interface RpeCalculatorProps {
  isVisible: boolean;
  onClose: () => void;
  currentWeight?: string;
  currentReps?: number | string;
  currentRpe?: number | string;
  onWeightSelect?: (weight: string) => void;
}

const RpeCalculator: React.FC<RpeCalculatorProps> = ({ 
  isVisible, 
  onClose, 
  currentWeight = '', 
  currentReps = '', 
  currentRpe = '',
  onWeightSelect
}) => {
  const { colors } = useTheme();
  const [weight, setWeight] = useState(currentWeight);
  const [reps, setReps] = useState(currentReps.toString());
  const [rpe, setRpe] = useState(currentRpe.toString());
  const [oneRepMax, setOneRepMax] = useState<number | null>(null);
  const [suggestedWeights, setSuggestedWeights] = useState<{reps: number; rpe: number; weight: number}[]>([]);

  useEffect(() => {
    // Initialize with current values if provided
    setWeight(currentWeight);
    setReps(currentReps.toString());
    setRpe(currentRpe.toString());
  }, [currentWeight, currentReps, currentRpe, isVisible]);

  const validateInputs = (): boolean => {
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);
    const rpeNum = parseFloat(rpe);
    
    return (
      !isNaN(weightNum) && weightNum > 0 &&
      !isNaN(repsNum) && repsNum > 0 &&
      !isNaN(rpeNum) && rpeNum >= 1 && rpeNum <= 10
    );
  };

  const calculateValues = () => {
    if (!validateInputs()) return;
    
    const weightNum = parseFloat(weight);
    const repsNum = parseInt(reps);
    const rpeNum = parseFloat(rpe);
    
    // Calculate 1RM
    const calculated1RM = calculate1RM(weightNum, repsNum, rpeNum);
    setOneRepMax(calculated1RM);
    
    // Generate suggested weights for different rep/RPE combinations
    const suggestions = [];
    
    // Common rep ranges
    const repRanges = [1, 3, 5, 8, 10, 12, 15];
    // Common RPE targets
    const rpeTargets = [6, 7, 8, 9, 10];
    
    for (const rep of repRanges) {
      for (const rpeTarget of rpeTargets) {
        // Only include a subset of combinations to avoid overwhelming the user
        if ((rep === 1 && rpeTarget < 8) || 
            (rep > 12 && rpeTarget > 8)) {
          continue;
        }
        
        const calculatedWeight = calculateWeightForRPE(calculated1RM, rep, rpeTarget);
        suggestions.push({
          reps: rep,
          rpe: rpeTarget,
          weight: calculatedWeight
        });
      }
    }
    
    // Sort by reps then RPE
    suggestions.sort((a, b) => a.reps - b.reps || a.rpe - b.rpe);
    setSuggestedWeights(suggestions);
  };

  const handleSelectWeight = (suggestion: {reps: number; rpe: number; weight: number}) => {
    if (onWeightSelect) {
      onWeightSelect(suggestion.weight.toString());
    }
    onClose();
  };

  const handleInputChange = (value: string, setter: React.Dispatch<React.SetStateAction<string>>, isDecimal: boolean = false) => {
    // Only allow numbers and at most one decimal point for decimal inputs
    if (isDecimal) {
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setter(value);
      }
    } else {
      // Only allow integers
      if (value === '' || /^\d*$/.test(value)) {
        setter(value);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
        <View style={[styles.modalContent, { backgroundColor: colors.card || '#1A1A1A' }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text || '#fff' }]}>RPE Calculator</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text || '#fff'} />
            </TouchableOpacity>
          </View>
          
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={[styles.sectionTitle, { color: colors.text || '#fff' }]}>Calculate Your 1RM</Text>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: colors.secondaryText || '#888' }]}>Weight (kg)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.inputBackground || '#252525', color: colors.text || '#fff' }]}
                placeholder="Enter weight"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={weight}
                onChangeText={(value) => handleInputChange(value, setWeight, true)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: colors.secondaryText || '#888' }]}>Reps</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.inputBackground || '#252525', color: colors.text || '#fff' }]}
                placeholder="Enter reps"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={reps}
                onChangeText={(value) => handleInputChange(value, setReps, false)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: colors.secondaryText || '#888' }]}>RPE (1-10)</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.inputBackground || '#252525', color: colors.text || '#fff' }]}
                placeholder="Enter RPE"
                placeholderTextColor="#666"
                keyboardType="numeric"
                value={rpe}
                onChangeText={(value) => handleInputChange(value, setRpe, true)}
              />
            </View>
            
            <TouchableOpacity
              style={[styles.calculateButton, { backgroundColor: colors.primary || '#3182CE' }]}
              onPress={calculateValues}
            >
              <Text style={styles.calculateButtonText}>Calculate</Text>
            </TouchableOpacity>
            
            {oneRepMax !== null && (
              <View style={styles.resultsContainer}>
                <Text style={[styles.resultsTitle, { color: colors.text || '#fff' }]}>
                  Estimated 1RM: <Text style={[styles.oneRepMax, { color: colors.primary || '#3182CE' }]}>{oneRepMax} kg</Text>
                </Text>
                
                <Text style={[styles.sectionTitle, { color: colors.text || '#fff', marginTop: 20 }]}>
                  Suggested Weights
                </Text>
                
                <View style={styles.suggestionsHeader}>
                  <Text style={[styles.headerText, { color: colors.secondaryText || '#888', flex: 1 }]}>Reps</Text>
                  <Text style={[styles.headerText, { color: colors.secondaryText || '#888', flex: 1 }]}>RPE</Text>
                  <Text style={[styles.headerText, { color: colors.secondaryText || '#888', flex: 1 }]}>Weight</Text>
                  <Text style={[styles.headerText, { color: colors.secondaryText || '#888', width: 50 }]}></Text>
                </View>
                
                {suggestedWeights.map((suggestion, index) => (
                  <View 
                    key={index} 
                    style={[
                      styles.suggestionRow, 
                      { backgroundColor: index % 2 === 0 ? colors.inputBackground || '#252525' : 'transparent' }
                    ]}
                  >
                    <Text style={[styles.suggestionText, { color: colors.text || '#fff', flex: 1 }]}>
                      {suggestion.reps}
                    </Text>
                    <Text style={[styles.suggestionText, { color: colors.text || '#fff', flex: 1 }]}>
                      {suggestion.rpe}
                    </Text>
                    <Text style={[styles.suggestionText, { color: colors.text || '#fff', flex: 1 }]}>
                      {suggestion.weight} kg
                    </Text>
                    <TouchableOpacity 
                      style={[styles.useButton, { backgroundColor: colors.primary || '#3182CE' }]}
                      onPress={() => handleSelectWeight(suggestion)}
                    >
                      <Text style={styles.useButtonText}>Use</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  scrollContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 15,
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
  calculateButton: {
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  oneRepMax: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  suggestionsHeader: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
  },
  suggestionRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  suggestionText: {
    fontSize: 16,
  },
  useButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 50,
    alignItems: 'center',
  },
  useButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default RpeCalculator;