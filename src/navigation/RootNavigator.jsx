import React, { Suspense, lazy } from 'react' 
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import HomeTabs from './HomeTabs'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 

const MovieListScreen = React.lazy(() => import('../screens/movieListScreen'));


const MovieDetailsScreen= lazy(() => import('../screens/MovieDetailsScreen'));

const Screen = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Screen.Navigator
        initialRouteName="HomeTabs"
        screenOptions={{headerShown: false}}
      >
        <Screen.Screen name="HomeTabs" component={HomeTabs} /> 

        <Screen.Screen name="MovieDetails" component={() => (
          <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
            <MovieDetailsScreen />
          </Suspense>
        )} />

        <Screen.Screen name="MovieList" component={() => (
          <Suspense fallback={<ActivityIndicator size="large" color="#0000ff" />}>
            <MovieListScreen />
          </Suspense>
        )} />
      </Screen.Navigator>
    </NavigationContainer>
  )
}