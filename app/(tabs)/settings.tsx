import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useTheme } from "../../context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { clearImportedProgram } from "../../utils/strictProgramValidator";
import { useAuth } from "../../context/AuthContext";

export default function SettingsScreen() {
  const [isMetric, setIsMetric] = useState(true);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();

  const exportData = async () => {
    try {
      // Get all workout data
      const keys = await AsyncStorage.getAllKeys();
      const workoutKeys = keys.filter((k) => k.startsWith("workout_"));
      const results = await AsyncStorage.multiGet(workoutKeys);

      const exportData = {
        programName: "Jeff Nippard's Bench Press Program",
        exportDate: new Date().toISOString(),
        workouts: {},
      };

      results.forEach(([key, value]) => {
        if (value) {
          exportData.workouts[key] = JSON.parse(value);
        }
      });

      // Convert to JSON
      const jsonString = JSON.stringify(exportData, null, 2);

      // Save to file
      const fileUri = FileSystem.documentDirectory + "bench_press_data.json";
      await FileSystem.writeAsStringAsync(fileUri, jsonString);

      // Share file
      try {
        await Share.share({
          title: "Bench Press Workout Data",
          message: "Here is my Bench Press workout data",
          url: fileUri,
        });
      } catch (error) {
        console.error("Error sharing file:", error);
        Alert.alert(
          "Export Successful",
          "Data was exported to your documents folder."
        );
      }
    } catch (error) {
      console.error("Error exporting data:", error);
      Alert.alert("Export Failed", "Failed to export workout data.");
    }
  };

  const importData = async () => {
    try {
      // Allow user to pick a file
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const fileUri = result.assets[0].uri;

      // Read file content
      const fileContent = await FileSystem.readAsStringAsync(fileUri);
      const importedData = JSON.parse(fileContent);

      // Validate imported data structure
      if (!importedData.workouts) {
        Alert.alert("Import Failed", "Invalid data format.");
        return;
      }

      // Store each workout in AsyncStorage
      const savePromises = Object.entries(importedData.workouts).map(
        ([key, data]) => {
          return AsyncStorage.setItem(key, JSON.stringify(data));
        }
      );

      await Promise.all(savePromises);

      Alert.alert("Import Successful", "Your workout data has been imported.");
    } catch (error) {
      console.error("Error importing data:", error);
      Alert.alert("Import Failed", "Unable to import workout data.");
    }
  };

  const clearAllData = async () => {
    try {
      Alert.alert(
        "Clear All Data",
        "Are you sure you want to delete all workout data and progress? This will reset all completed workouts.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Clear",
            style: "destructive",
            onPress: async () => {
              try {
                // Get all keys from AsyncStorage
                const keys = await AsyncStorage.getAllKeys();

                // Filter for workout and progress data
                const dataKeys = keys.filter(
                  (k) => k.startsWith("workout_") || k === "program_progress"
                );

                // Remove the data
                if (dataKeys.length > 0) {
                  await AsyncStorage.multiRemove(dataKeys);
                  console.log("Cleared workout and progress data:", dataKeys);
                }

                // Show success message
                Alert.alert(
                  "Data Cleared",
                  "All workout data and progress has been reset. The app will now refresh.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        // Refresh by navigating back to home with refresh parameter
                        router.replace("/(tabs)", {
                          refresh: Date.now().toString(),
                        });
                      },
                    },
                  ]
                );
              } catch (error) {
                console.error("Error clearing data:", error);
                Alert.alert(
                  "Operation Failed",
                  "Failed to clear workout data."
                );
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error showing clear data dialog:", error);
    }
  };

  const resetProgram = async () => {
    try {
      Alert.alert(
        "Reset Program",
        "Are you sure you want to reset the program? This will delete the imported program and all workout data.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Reset",
            style: "destructive",
            onPress: async () => {
              // Clear all data related to the program
              const keys = await AsyncStorage.getAllKeys();
              const programKeys = keys.filter(
                (k) =>
                  k.startsWith("workout_") ||
                  k === "nippard_program_data" ||
                  k === "pdf_imported" ||
                  k === "pdf_filename" ||
                  k === "program_type" ||
                  k === "program_progress" ||
                  k === "imported_program"
              );

              await AsyncStorage.multiRemove(programKeys);

              // Navigate to the upload screen using the correct path
              router.replace("/upload");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error resetting program:", error);
      Alert.alert("Error", "Failed to reset program.");
    }
  };

  const importProgramPdf = async () => {
    try {
      // Open document picker for PDF files
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      // Navigate to the upload screen using the correct path
      router.replace("/upload");
    } catch (error) {
      console.error("Error with PDF import:", error);
      Alert.alert("Error", "Failed to open document picker.");
    }
  };

  const handleLogout = async () => {
    try {
      Alert.alert("Logout", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              console.log("Logging out...");
              await signOut();

              // Navigate immediately to login screen
              router.replace("/login");
            } catch (error) {
              console.error("Error during logout:", error);
              Alert.alert("Error", "Failed to log out. Please try again.");
            }
          },
        },
      ]);
    } catch (error) {
      console.error("Error showing logout dialog:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: colors.background, paddingTop: insets.top },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.primary }]}>
          Settings
        </Text>
      </View>

      <ScrollView style={styles.settingsContainer}>
        {/* User Profile Card */}
        <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
          <View style={styles.profileHeader}>
            <View style={styles.profileIconContainer}>
              <Text style={styles.profileInitials}>
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {user?.name || "User"}
              </Text>
              <Text
                style={[styles.profileEmail, { color: colors.secondaryText }]}
              >
                {user?.email || ""}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.logoutButton,
              { backgroundColor: colors.dangerBackground },
            ]}
            onPress={handleLogout}
            testID="logout-button"
          >
            <Ionicons name="log-out-outline" size={20} color={colors.danger} />
            <Text style={[styles.logoutButtonText, { color: colors.danger }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* Program Management Section */}
        <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.settingsTitle, { color: colors.text }]}>
            Program Management
          </Text>

          {/* Reset Program Button */}
          <TouchableOpacity
            style={[
              styles.settingsButton,
              { backgroundColor: colors.dangerBackground || "#331111" },
            ]}
            onPress={resetProgram}
          >
            <Ionicons
              name="refresh-circle"
              size={24}
              color={colors.danger || "#FF5252"}
            />
            <Text
              style={[
                styles.settingsButtonText,
                { color: colors.danger || "#FF5252" },
              ]}
            >
              Reset Program
            </Text>
          </TouchableOpacity>

          <Text style={[styles.infoText, { color: colors.secondaryText }]}>
            Reset will remove all imported program data and workouts. You'll
            need to import the program again.
          </Text>

          <TouchableOpacity
            style={[
              styles.settingsButton,
              { backgroundColor: colors.inputBackground, marginTop: 15 },
            ]}
            onPress={importProgramPdf}
          >
            <Ionicons name="document-outline" size={24} color={colors.text} />
            <Text style={[styles.settingsButtonText, { color: colors.text }]}>
              Import New Program PDF
            </Text>
          </TouchableOpacity>
        </View>

        {/* Data Management Section */}
        <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.settingsTitle, { color: colors.text }]}>
            Data Management
          </Text>

          <TouchableOpacity
            style={[
              styles.settingsButton,
              { backgroundColor: colors.inputBackground },
            ]}
            onPress={exportData}
          >
            <Ionicons name="download-outline" size={24} color={colors.text} />
            <Text style={[styles.settingsButtonText, { color: colors.text }]}>
              Export Workout Data
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.settingsButton,
              { backgroundColor: colors.inputBackground },
            ]}
            onPress={importData}
          >
            <Ionicons
              name="cloud-upload-outline"
              size={24}
              color={colors.text}
            />
            <Text style={[styles.settingsButtonText, { color: colors.text }]}>
              Import Workout Data
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingsButton, styles.dangerButton]}
            onPress={clearAllData}
          >
            <Ionicons name="trash-outline" size={24} color="#ff4d4d" />
            <Text style={[styles.settingsButtonText, styles.dangerButtonText]}>
              Clear All Data
            </Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={[styles.settingsCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.settingsTitle, { color: colors.text }]}>
            About
          </Text>
          <Text style={[styles.aboutText, { color: colors.secondaryText }]}>
            This app is designed to track your progress through Jeff Nippard's
            8-week Bench Press Program.
          </Text>
          <Text style={[styles.versionText, { color: colors.secondaryText }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 80, // Add padding to account for tab bar
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
  },
  settingsContainer: {
    paddingHorizontal: 16,
  },
  settingsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  settingsTitle: {
    fontSize: 20,
    marginBottom: 15,
    fontWeight: "700",
  },
  settingsToggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  unitsToggle: {
    flexDirection: "row",
    borderRadius: 12,
    overflow: "hidden",
  },
  unitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  unitButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingsButton: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  settingsButtonText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: "500",
  },
  dangerButton: {
    backgroundColor: "#331111",
  },
  dangerButtonText: {
    color: "#ff4d4d",
  },
  aboutText: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
  versionText: {
    fontSize: 14,
  },
  infoText: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: "italic",
  },
  // Profile styles
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#3182CE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  profileInitials: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
