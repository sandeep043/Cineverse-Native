import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen'; 
import FavoritesScreen from '../screens/FavouriteScreen';


const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator 
    screenOptions={{
        headerShown: false,
       
      }}>
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Search' component={SearchScreen} />
        <Tab.Screen name='Profile' component={ProfileScreen} />
        <Tab.Screen name='Favorites' component={FavoritesScreen} />
    </Tab.Navigator>
  )
}