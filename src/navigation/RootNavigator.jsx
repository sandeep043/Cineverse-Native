import React from 'react'
import { NavigationContainer } from '@react-navigation/native'; 
import HomeTabs from './HomeTabs';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <HomeTabs />
    </NavigationContainer>
  )
}