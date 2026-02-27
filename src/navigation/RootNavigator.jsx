import React from 'react'
import { NavigationContainer } from '@react-navigation/native'; 
import HomeTabs from './HomeTabs'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const Screen = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Screen.Navigator
        initialRouteName="HomeTabs"
        screenOptions={{headerShown: false}}
      >
        <Screen.Screen name="HomeTabs" component={HomeTabs} />
        <Screen.Screen name="MovieDetails" component={MovieDetailsScreen} />
      </Screen.Navigator>
    </NavigationContainer>
  )
}