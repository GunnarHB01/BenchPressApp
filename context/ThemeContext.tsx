// context/ThemeContext.tsx
import React, { createContext, useContext } from 'react';

// Fixed dark theme colors - no alternative themes
const darkTheme = {
  background: '#121212',
  card: '#1A1A1A',
  text: '#ffffff',
  secondaryText: '#adb5bd',
  primary: '#3182CE',
  danger: '#FF5252',
  dangerBackground: '#331111',
  inputBackground: '#2A2A2A',
};

// Simplified theme context interface - no theme switching
interface ThemeContextType {
  colors: typeof darkTheme;
}

// Create the context
const ThemeContext = createContext<ThemeContextType>({
  colors: darkTheme,
});

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Provider component - always provides dark theme only
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Always dark mode, no switching functionality
  const colors = darkTheme;

  return (
    <ThemeContext.Provider value={{ colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;