module.exports = {
    expo: {
      name: "BenchPressProgramTracker",
      slug: "benchpressprogramtracker",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      userInterfaceStyle: "dark", // Force dark mode
      splash: {
        image: "./assets/images/splash-icon.png",
        resizeMode: "contain",
        backgroundColor: "#121212"
      },
      assetBundlePatterns: [
        "**/*"
      ],
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.gunnarhb.benchapp",
        buildNumber: "1",
        // For Firebase
        googleServicesFile: "./GoogleService-Info.plist",
        // For Sign in with Apple
        usesAppleSignIn: true,
        // Required for Firebase auth
        infoPlist: {
          NSCameraUsageDescription: "This app uses the camera to take progress photos of your fitness journey.",
          NSPhotoLibraryUsageDescription: "This app uses photos to track your fitness progress.",
        }
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#121212"
        },
        package: "com.gunnarhb.benchapp",
        versionCode: 1,
        // For Firebase
        googleServicesFile: "./google-services.json",
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      plugins: [
        "expo-router"
        // Removed problematic plugins:
        // "@react-native-firebase/app",
        // "@react-native-firebase/auth",
        // "@react-native-google-signin/google-signin",
        // "@invertase/react-native-apple-authentication"
      ],
      scheme: "benchpresspro",
      // Added EAS Update configuration
      updates: {
        url: "https://u.expo.dev/785d1017-ac01-4cdf-b296-b66430c39e54"
      },
      runtimeVersion: {
        policy: "appVersion"
      },
      extra: {
        eas: {
          projectId: "785d1017-ac01-4cdf-b296-b66430c39e54"
        }
      }
    }
  };