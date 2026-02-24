
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';  
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Cineverse/src/screens/HomeScreen';
import SearchScreen from '../Cineverse/src/screens/SearchScreen';
import ProfileScreen from '../Cineverse/src/screens/ProfileScreen';
import FavoritesScreen from '../Cineverse/src/screens/FavouriteScreen'; 
import RootNavigation from './src/navigation/RootNavigator';



const Stack = createNativeStackNavigator()  
const Tab = createBottomTabNavigator();

// function RootNavigation(){ 
//   return (

//   <NavigationContainer>
//    <Stack.Navigator> 
//     <Stack.Screen name='Home' component={HomeScreen} />
//     <Stack.Screen name='Search' component={SearchScreen} /> 
//     <Stack.Screen name='Profile' component={ProfileScreen} />  
//     <Stack.Screen name='Favorites' component={FavoritesScreen} />
//     </Stack.Navigator>
//     </NavigationContainer>
//   )

// }

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
     <RootNavigation />
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
