import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  ScrollView,
  Linking,
  Dimensions,
  Platform,
  SafeAreaView
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { getExerciseSubstitutions, getFilteredSubstitutions, SubstitutionReason } from '../utils/exerciseSubstitutions';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

interface ExerciseSubstitutionsProps {
  isVisible: boolean;
  onClose: () => void;
  exerciseName: string;
  onSelectSubstitute?: (substitute: string) => void;
  currentExerciseIsOriginal?: boolean; // To show reset option
  originalName?: string; // Original name to reset to
}

const ExerciseSubstitutions: React.FC<ExerciseSubstitutionsProps> = ({
  isVisible,
  onClose,
  exerciseName,
  onSelectSubstitute,
  currentExerciseIsOriginal = true,
  originalName
}) => {
  const { colors } = useTheme();
  const [selectedReasons, setSelectedReasons] = useState<SubstitutionReason[]>([]);
  const [substitutions, setSubstitutions] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  
  // Reset selections when modal is opened or exercise changes
  useEffect(() => {
    if (isVisible) {
      setSelectedReasons([]);
      
      // Get substitutions for this exercise
      const subs = getExerciseSubstitutions(exerciseName);
      setSubstitutions(subs || []);
      setFilteredResults(subs || []);
    }
  }, [isVisible, exerciseName]);
  
  // Update filtered results when filters change
  useEffect(() => {
    if (selectedReasons.length > 0) {
      const filtered = getFilteredSubstitutions(exerciseName, selectedReasons);
      setFilteredResults(filtered || []);
    } else {
      setFilteredResults(substitutions);
    }
  }, [selectedReasons, substitutions, exerciseName]);
  
  const allReasons: { value: SubstitutionReason; label: string; icon: string }[] = [
    { value: 'no_equipment', label: 'No Equipment', icon: 'home-outline' },
    { value: 'home_gym', label: 'Home Gym', icon: 'barbell-outline' },
    { value: 'injury', label: 'Injury', icon: 'bandage-outline' },
    { value: 'mobility', label: 'Mobility', icon: 'body-outline' },
    { value: 'alternative', label: 'Alternative', icon: 'swap-horizontal-outline' }
  ];
  
  const toggleReason = (reason: SubstitutionReason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };
  
  const handleSelectSubstitute = (substitute: string) => {
    if (onSelectSubstitute) {
      onSelectSubstitute(substitute);
    }
    onClose();
  };
  
  const handleResetToOriginal = () => {
    if (onSelectSubstitute && originalName) {
      onSelectSubstitute(originalName);
    }
    onClose();
  };
  
  const openYoutubeVideo = (videoId: string) => {
    Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.modalContainer, { backgroundColor: 'rgba(0,0,0,0.9)' }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.card || '#1A1A1A' }]}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text || '#fff' }]}>Exercise Alternatives</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text || '#fff'} />
              </TouchableOpacity>
            </View>
            
            {/* Exercise Name */}
            <View style={styles.exerciseNameContainer}>
              <Text style={[styles.exerciseName, { color: colors.primary || '#3182CE' }]}>
                {exerciseName}
              </Text>
            </View>
            
            {/* Reset to Original Option */}
            {!currentExerciseIsOriginal && originalName && (
              <TouchableOpacity
                style={[styles.resetButton, { backgroundColor: colors.secondary || '#48BB78' }]}
                onPress={handleResetToOriginal}
              >
                <Ionicons name="refresh-outline" size={18} color="#fff" style={styles.resetIcon} />
                <Text style={styles.resetButtonText}>Reset to Original Exercise</Text>
              </TouchableOpacity>
            )}
            
            {/* Filter Section */}
            <View style={styles.filterSection}>
              <Text style={[styles.sectionTitle, { color: colors.text || '#fff' }]}>
                Filter by:
              </Text>
              
              <View style={styles.filtersContainer}>
                {allReasons.map(reason => (
                  <TouchableOpacity
                    key={reason.value}
                    style={[
                      styles.filterButton,
                      selectedReasons.includes(reason.value) 
                        ? { backgroundColor: colors.primary || '#3182CE' } 
                        : { backgroundColor: colors.inputBackground || '#252525' }
                    ]}
                    onPress={() => toggleReason(reason.value)}
                  >
                    <Ionicons 
                      name={reason.icon} 
                      size={18} 
                      color={selectedReasons.includes(reason.value) ? '#fff' : colors.text} 
                      style={styles.filterIcon}
                    />
                    <Text 
                      style={[
                        styles.filterText, 
                        { color: selectedReasons.includes(reason.value) ? '#fff' : colors.text || '#fff' }
                      ]}
                    >
                      {reason.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* No Results States */}
            {substitutions.length === 0 && (
              <View style={styles.noSubsContainer}>
                <Ionicons name="alert-circle-outline" size={50} color={colors.secondaryText || '#888'} />
                <Text style={[styles.noSubsText, { color: colors.text || '#fff' }]}>
                  No substitutions available for this exercise.
                </Text>
              </View>
            )}
            
            {substitutions.length > 0 && filteredResults.length === 0 && (
              <View style={styles.noSubsContainer}>
                <Ionicons name="filter-outline" size={50} color={colors.secondaryText || '#888'} />
                <Text style={[styles.noSubsText, { color: colors.text || '#fff' }]}>
                  No matches with current filters.
                </Text>
              </View>
            )}
            
            {/* Results List */}
            <ScrollView 
              style={styles.resultsContainer}
              contentContainerStyle={styles.resultsContent}
              showsVerticalScrollIndicator={false}
            >
              {filteredResults.map((sub, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.substitutionCard, 
                    { backgroundColor: colors.inputBackground || '#252525' }
                  ]}
                >
                  <View style={styles.substitutionHeader}>
                    <Text style={[styles.substituteName, { color: colors.text || '#fff' }]}>
                      {sub.name}
                    </Text>
                    
                    <TouchableOpacity
                      style={[styles.useButton, { backgroundColor: colors.primary || '#3182CE' }]}
                      onPress={() => handleSelectSubstitute(sub.name)}
                    >
                      <Text style={styles.useButtonText}>Use</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <Text style={[styles.equipmentText, { color: colors.secondaryText || '#888' }]}>
                    <Text style={{ fontWeight: 'bold' }}>Equipment:</Text> {sub.equipmentNeeded}
                  </Text>
                  
                  <Text style={[styles.instructionsText, { color: colors.text || '#fff' }]}>
                    {sub.instructionsForUse}
                  </Text>
                  
                  <View style={styles.reasonsContainer}>
                    {sub.reasonForSubstitution.map((reason: SubstitutionReason, reasonIndex: number) => {
                      const reasonObj = allReasons.find(r => r.value === reason);
                      return (
                        <View 
                          key={reasonIndex} 
                          style={[
                            styles.reasonTag,
                            { backgroundColor: colors.inputBackground || '#333' }
                          ]}
                        >
                          <Ionicons 
                            name={reasonObj?.icon || 'information-circle-outline'}
                            size={14}
                            color={colors.primary || '#3182CE'}
                            style={styles.reasonIcon}
                          />
                          <Text style={[styles.reasonText, { color: colors.primary || '#3182CE' }]}>
                            {reasonObj?.label || reason}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  
                  {sub.videoId && (
                    <TouchableOpacity
                      style={[styles.videoButton, { backgroundColor: '#FF0000' }]}
                      onPress={() => openYoutubeVideo(sub.videoId!)}
                    >
                      <Ionicons name="logo-youtube" size={20} color="#fff" style={styles.videoIcon} />
                      <Text style={styles.videoButtonText}>Watch Form Guide</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              
              {/* Extra padding at the bottom for better scrolling */}
              <View style={styles.bottomPadding} />
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNameContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  resetIcon: {
    marginRight: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  filterSection: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  noSubsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    flex: 1,
  },
  noSubsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsContent: {
    padding: 16,
  },
  substitutionCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  substitutionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  substituteName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  useButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  useButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  equipmentText: {
    fontSize: 14,
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  reasonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  reasonTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  reasonIcon: {
    marginRight: 4,
  },
  reasonText: {
    fontSize: 12,
    fontWeight: '500',
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  videoIcon: {
    marginRight: 8,
  },
  videoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 40, // Extra padding at the bottom for better scrolling
  }
});

export default ExerciseSubstitutions;