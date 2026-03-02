  import { View, Text, StyleSheet,  ActivityIndicator } from 'react-native'
import React, { Suspense, lazy } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/HomeScreen';
// import SearchScreen from '../screens/SearchScreen';
// import ProfileScreen from '../screens/ProfileScreen'; 
// import FavoritesScreen from '../screens/FavouriteScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'; 

const HomeScreen = lazy(() => import('../screens/HomeScreen'));
const SearchScreen = lazy(() => import('../screens/SearchScreen'));
const ProfileScreen = lazy(() => import('../screens/ProfileScreen'));
const FavoritesScreen = lazy(() => import('../screens/FavouriteScreen'));


const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Suspense fallback={<View style={{flex:1,justifyContent:'center',alignItems:'center'}}><ActivityIndicator size="large" color="#0000ff" /></View>}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarItemStyle:{
          flex:1,

        },
        tabBarIcon: ({ focused}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }
          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          if (focused) {
          
            return (
              <View style={styles.activeTab}>
                <Ionicons name={iconName} size={24} color="#00E5FF" />
                <Text style={styles.activeText}>{route.name}</Text>
              </View>
            );
          }
          return <Ionicons name={iconName} size={24} color="gray" />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
    </Suspense>
  );
} 

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#1E1E2D',
    height: 70,
    borderTopWidth: 0,
    paddingHorizontal: 28,
    paddingBottom: 20,
    paddingTop: 14,
  },
  

  activeTab: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#2A2A3D',
  paddingHorizontal: 12,
  paddingVertical: 3,
  borderRadius: 25,
  minWidth: 90,   // 
  height: 35,     //  




  },

  activeText: {
    color: '#00E5FF',
    marginLeft: 6,
    fontWeight: '400',
  },
})