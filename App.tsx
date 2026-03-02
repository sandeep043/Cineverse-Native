import 'react-native-gesture-handler';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
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

function SafeAreaWrapper() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top,}]}>
      <RootNavigation />
    </View>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
   <Provider store={store}>
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaWrapper />
    </SafeAreaProvider>
   </Provider>  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
