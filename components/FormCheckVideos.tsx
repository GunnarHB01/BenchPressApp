import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Modal, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import { useTheme } from '../context/ThemeContext';
import { BlurView } from 'expo-blur';

// Import the video database
import formVideos from '../data/formVideosDatabase';

interface FormCheckVideoProps {
  exerciseName: string;
}

const { width } = Dimensions.get('window');

const FormCheckVideos: React.FC<FormCheckVideoProps> = ({ exerciseName }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, isDark } = useTheme();
  
  // Find the exercise in our database or use default
  const exerciseData = formVideos[exerciseName as keyof typeof formVideos] || formVideos['DEFAULT'];
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.videoButton, { backgroundColor: colors.timerBackground }]} 
        onPress={() => setModalVisible(true)}
      >
        <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
          <Ionicons name="videocam" size={14} color="#fff" />
        </View>
        <Text style={[styles.videoButtonText, { color: colors.text }]}>Watch form guide</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView 
          intensity={70} 
          tint={isDark ? 'dark' : 'light'}
          style={styles.modalContainer}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>{exerciseData.title} Form</Text>
              <TouchableOpacity 
                style={[styles.closeButton, { backgroundColor: colors.timerBackground }]}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.videoContainer}>
              <WebView
                source={{ uri: `https://www.youtube.com/embed/${exerciseData.youtubeId}` }}
                style={styles.video}
              />
            </View>
            
            <View style={styles.tipsContainer}>
              <Text style={[styles.tipsTitle, { color: colors.text }]}>Key Form Points</Text>
              
              {exerciseData.tips.map((tip, index) => (
                <View key={index} style={styles.tipRow}>
                  <View style={[styles.checkCircle, { backgroundColor: colors.secondary }]}>
                    <Ionicons name="checkmark" size={12} color="#fff" />
                  </View>
                  <Text style={[styles.tipText, { color: colors.secondaryText }]}>{tip}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              style={[styles.youtubeButton, { backgroundColor: '#FF0000' }]}
              onPress={() => {
                setModalVisible(false);
                Linking.openURL(`https://www.youtube.com/watch?v=${exerciseData.youtubeId}`);
              }}
            >
              <Ionicons name="logo-youtube" size={18} color="#fff" />
              <Text style={styles.youtubeButtonText}>Open in YouTube</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  videoButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  videoContainer: {
    height: 200,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  video: {
    flex: 1,
  },
  tipsContainer: {
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  tipText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
  youtubeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
  },
  youtubeButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default FormCheckVideos;