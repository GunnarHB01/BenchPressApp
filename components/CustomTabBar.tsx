import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * Simplified CustomTabBar component that eliminates the overlapping labels issue
 */
const CustomTabBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Determine if a route is active
  const isActive = (route: string) => {
    if (route === 'index' && (pathname === '/' || pathname === '/index')) {
      return true;
    }
    return pathname === `/${route}`;
  };
  
  // Simple tab configuration
  const tabs = [
    { 
      name: 'Home', 
      route: 'index',
      activeName: 'home',
      inactiveName: 'home-outline'
    },
    { 
      name: 'Workout', 
      route: 'workout',
      activeName: 'barbell',
      inactiveName: 'barbell-outline'
    },
    { 
      name: 'Progress', 
      route: 'progress',
      activeName: 'trending-up',
      inactiveName: 'trending-up-outline'
    },
    { 
      name: 'Settings', 
      route: 'settings',
      activeName: 'settings',
      inactiveName: 'settings-outline'
    }
  ];
  
  const navigateTo = (route: string) => {
    const formattedRoute = route === 'index' ? '/' : `/${route}`;
    router.push(formattedRoute);
  };
  
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const active = isActive(tab.route);
        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tabButton}
            onPress={() => navigateTo(tab.route)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={active ? tab.activeName : tab.inactiveName}
              size={24}
              color={active ? '#3182CE' : '#888'}
            />
            <Text
              style={[
                styles.tabLabel,
                { color: active ? '#3182CE' : '#888' }
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingBottom: Platform.OS === 'ios' ? 25 : 5,
    paddingTop: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  }
});

export default CustomTabBar;