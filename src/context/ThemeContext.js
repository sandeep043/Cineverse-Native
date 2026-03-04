import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// a very small theme implementation using context. consumers can read
// `isDark`, the current `colors` and call `toggleTheme` to flip modes.

const lightColors = {
  background: '#ffffff',
  card: '#f8f8f8',
  text: '#000000',
  mutedText: '#6b7280',
  primary: '#00E5FF',
  border: '#e0e0e0',
};

const darkColors = {
  background: '#000000',
  card: '#121212',
  text: '#ffffff',
  mutedText: '#aaa',
  primary: '#00E5FF',
  border: '#222',
};

export const ThemeContext = createContext({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const systemColor = useColorScheme();
  const [isDark, setIsDark] = useState(systemColor === 'dark');

  // keep in sync with device setting if it changes
  useEffect(() => {
    setIsDark(systemColor === 'dark');
  }, [systemColor]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const value = {
    isDark,
    colors: isDark ? darkColors : lightColors,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
