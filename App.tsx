
import React, { useContext } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';  
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from '../Cineverse/src/screens/HomeScreen';
// import SearchScreen from '../Cineverse/src/screens/SearchScreen';
// import ProfileScreen from '../Cineverse/src/screens/ProfileScreen';
// import FavoritesScreen from '../Cineverse/src/screens/FavouriteScreen'; 
import RootNavigation from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/Redux/store';    

// theme provider and context
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';

function SafeAreaWrapper() {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useContext(ThemeContext);

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}> 
        <RootNavigation />
      </View>
    </>
  );
}

function App() {
  return (
   <Provider store={store}>
    <ThemeProvider>
      <SafeAreaProvider>
        <SafeAreaWrapper />
      </SafeAreaProvider>
    </ThemeProvider>
   </Provider>  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
