# 🏋️‍♂️ Nippard Bench Press Program App

A comprehensive React Native fitness app implementing Jeff Nippard's science-based bench press specialization program. Track your workouts, watch form videos, and maximize your bench press gains with evidence-based training.

## ✨ Features

### 📱 **Core Functionality**
- **Complete Workout Tracking** - Log weights, reps, and track progress across all program weeks
- **Smart Rest Timer** - Automatic rest periods with progress tracking and skip options
- **Exercise Form Videos** - Integrated YouTube videos from Jeff Nippard's channel for perfect technique
- **RPE & Percentage Calculators** - Built-in tools for determining training loads
- **Exercise Substitutions** - Alternative exercises when equipment isn't available
- **Progress Tracking** - Visual indicators for completed sets and workouts

### 🎯 **Program Features**
- **12-Week Bench Press Specialization** - Complete Jeff Nippard program implementation
- **Upper/Lower Body Split** - Balanced training approach
- **Progressive Overload** - Systematic strength progression
- **Exercise Images** - High-quality illustrations for every movement
- **Personalized Notes** - Add custom notes to workouts and exercises

### 💡 **Smart Features**
- **Auto-Save Progress** - Never lose your workout data
- **Offline Functionality** - Works without internet connection
- **Dark Theme** - Easy on the eyes during workouts
- **Responsive Design** - Optimized for all phone sizes

## 📸 Screenshots

*Coming soon - App screenshots showcasing the workout interface, form videos, and progress tracking*

## 🚀 Getting Started

### Prerequisites
- React Native development environment
- Node.js (v14 or higher)
- iOS Simulator / Android Emulator or physical device

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GunnarHB01/BenchPressApp.git
   cd BenchPressApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install iOS dependencies** (iOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start the app**
   ```bash
   # For iOS only
   npx react-native run-ios
   or
   npx expo start
   ```

## 🏋️‍♂️ Program Overview

This app implements Jeff Nippard's evidence-based bench press specialization program, featuring:

- **12 weeks of structured training**
- **Upper body and lower body sessions**
- **Progressive overload methodology**
- **RPE-based training intensity**
- **Accessory work for balanced development**

### Week Structure
- **Week 1-4**: Foundation Phase
- **Week 5-8**: Intensification Phase  
- **Week 9-12**: Peak & Test Phase

## 🎥 Form Video Integration

Each exercise includes professionally curated form videos from Jeff Nippard's YouTube channel:
- **Proper technique demonstration**
- **Key form points highlighted**
- **Safety considerations**
- **Common mistake corrections**

## 📊 Progress Tracking

- **Set-by-set completion tracking**
- **Weight and rep logging**
- **Weekly progress overview**
- **Personal record tracking**
- **Visual progress indicators**

## 🛠️ Technical Details

### Built With
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform and tools
- **AsyncStorage** - Local data persistence
- **React Navigation** - Navigation library
- **WebView** - YouTube video integration

### Key Components
- `WorkoutScreen` - Main workout interface
- `FormCheckVideos` - Video tutorial system
- `RpeCalculator` - RPE calculation tool
- `ExerciseSubstitutions` - Alternative exercise suggestions
- `RestTimer` - Intelligent rest period management

### Data Structure
- Structured JSON program data
- Local storage for progress tracking
- Efficient caching for images and videos
- Offline-first architecture

## 📱 Supported Platforms

- ✅ **iOS** (iPhone only)

## 🎯 Program Benefits

### For Beginners
- **Structured progression** from basic to advanced
- **Form video guidance** for every exercise
- **Built-in safety features** and rest recommendations

### For Intermediate/Advanced
- **Science-based programming** by Jeff Nippard
- **RPE-based intensity** for optimal training stress
- **Detailed progress tracking** for plateau breakthrough

## ⚡ Performance Features

- **Fast loading times** with optimized images
- **Smooth animations** and transitions
- **Efficient memory usage**
- **Battery-friendly** background processing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Jeff Nippard** - For the science-based program methodology
- **StrengthLevel.com** - Exercise illustrations and images
- **YouTube** - Video content integration
- **React Native Community** - Open source components and tools

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the [FAQ section](#-faq) below

## ❓ FAQ

**Q: Do I need internet connection to use the app?**
A: The app works offline for workouts, but internet is required for form videos.

**Q: Is this the official Jeff Nippard app?**
A: No, this is an independent implementation of his published program methodology.

**Q: What if I don't have access to certain equipment?**
A: The app includes alternative exercises for every movement.

---

**Made with ❤️ for the strength training community**

*Disclaimer: This app is for educational purposes. Consult with healthcare professionals before starting any exercise program.*
