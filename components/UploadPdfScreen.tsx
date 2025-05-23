import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  Image, 
  Alert,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isProgramImported, validateBenchPressPdf, trackValidationAttempt } from '../utils/strictProgramValidator';
import { useTheme } from '../context/ThemeContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
    withDelay
  } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

const UploadPdfScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { colors, isDark } = useTheme();
  
  // Animation values
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    checkExistingProgram();
    
    // Start animations
    scale.value = withRepeat(
      withTiming(1.1, { duration: 2000 }),
      -1,
      true
    );
    
    // Add subtle hover animation
    translateY.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const checkExistingProgram = async () => {
    try {
      const hasProgram = await isProgramImported();
      if (hasProgram) {
        // If program already exists, show option to replace or cancel
        Alert.alert(
          "Program Already Imported",
          "A program has already been imported. Do you want to replace it?",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => router.replace('/(tabs)')
            },
            {
              text: "Replace",
              onPress: () => setLoading(false)
            }
          ]
        );
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error checking for existing program:', error);
      setLoading(false);
    }
  };

  const handleUploadPdf = async () => {
    try {
      // Check for validation attempts first
      const canAttempt = await trackValidationAttempt();
      if (!canAttempt) return;
      
      setUploading(true);
      
      // Start upload progress simulation
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 5;
        if (progress > 95) {
          clearInterval(progressInterval);
        } else {
          setUploadProgress(progress);
        }
      }, 150);
      
      // Request haptic feedback if supported
      try {
        if (Haptics && Haptics.notificationAsync) {
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      } catch (hapticError) {
        // Silently ignore haptic errors
        console.log('Haptic feedback not available:', hapticError);
      }
      
      // Use the strict validator
      const result = await validateBenchPressPdf();
      
      // Clear the progress interval
      clearInterval(progressInterval);
      
      if (result.valid) {
        // Set to 100% when complete
        setUploadProgress(100);
        
        // Add a small delay
        setTimeout(() => {
          // Fade out animation before navigation
          opacity.value = withTiming(0, { duration: 500 }, () => {
            // Navigate to the program screen after successful upload
            router.replace('/(tabs)');
          });
        }, 600);
      } else {
        Alert.alert("Upload Failed", result.message);
        setUploading(false);
        setUploadProgress(0);
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      Alert.alert("Error", "Failed to upload PDF. Please try again.");
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // Animated styles
  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value }
      ],
    };
  });

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.contentContainer, containerAnimatedStyle]}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: colors.primary }]}>
              Upload Program PDF
            </Text>
            <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
              Import Jeff Nippard's Bench Press Program
            </Text>
          </View>

          <View style={styles.illustrationContainer}>
            <Animated.View style={iconAnimatedStyle}>
              <LinearGradient
                colors={['rgba(49, 130, 206, 0.1)', 'rgba(49, 130, 206, 0.3)']}
                style={styles.iconBackground}
              >
                <Ionicons 
                  name="document-text" 
                  size={100} 
                  color={colors.primary} 
                />
              </LinearGradient>
            </Animated.View>
            
            <Text style={[styles.uploadPrompt, { color: colors.secondaryText }]}>
              {uploading ? "Processing PDF..." : "Select your Jeff Nippard PDF file"}
            </Text>
            
            {uploading && (
              <View style={styles.progressContainer}>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
                </View>
                <Text style={styles.progressText}>{Math.round(uploadProgress)}%</Text>
              </View>
            )}
          </View>

          <View style={styles.instructionsContainer}>
            <View style={[styles.instructionCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.instructionTitle, { color: colors.text }]}>
                How it works
              </Text>
              <View style={styles.instructionItem}>
                <View style={[styles.instructionNumber, { backgroundColor: colors.primary }]}>
                  <Text style={styles.instructionNumberText}>1</Text>
                </View>
                <Text style={[styles.instructionText, { color: colors.text }]}>
                  Purchase Jeff Nippard's Bench Press Program PDF
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <View style={[styles.instructionNumber, { backgroundColor: colors.primary }]}>
                  <Text style={styles.instructionNumberText}>2</Text>
                </View>
                <Text style={[styles.instructionText, { color: colors.text }]}>
                  Download the PDF to your device
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <View style={[styles.instructionNumber, { backgroundColor: colors.primary }]}>
                  <Text style={styles.instructionNumberText}>3</Text>
                </View>
                <Text style={[styles.instructionText, { color: colors.text }]}>
                  Use the button below to select and upload the PDF
                </Text>
              </View>
              <View style={styles.instructionItem}>
                <View style={[styles.instructionNumber, { backgroundColor: colors.primary }]}>
                  <Text style={styles.instructionNumberText}>4</Text>
                </View>
                <Text style={[styles.instructionText, { color: colors.text }]}>
                  Start tracking your workouts and progress!
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.uploadButton, 
                { backgroundColor: colors.primary },
                uploading && styles.uploadingButton
              ]}
              onPress={handleUploadPdf}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Ionicons name="cloud-upload" size={24} color="#FFFFFF" style={styles.buttonIcon} />
                  <Text style={styles.uploadButtonText}>
                    Select & Upload PDF
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <Text style={[styles.disclaimer, { color: colors.secondaryText }]}>
            This app is designed to work with Jeff Nippard's Bench Press Program. 
            Results may vary with other PDFs.
          </Text>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  iconBackground: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadPrompt: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    marginTop: 20,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    marginBottom: 8,
    width: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#3182CE',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  instructionsContainer: {
    marginBottom: 30,
  },
  instructionCard: {
    borderRadius: 15,
    padding: 20,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  instructionNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  instructionNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    height: 56,
  },
  uploadingButton: {
    opacity: 0.8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },
});

export default UploadPdfScreen;