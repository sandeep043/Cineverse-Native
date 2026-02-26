import {StyleSheet, View, Text } from 'react-native'
import React from 'react'
import HomeCoursel from '../utilities/HomeCoursel'
import  SearchBar  from '../utilities/SearchBar'
import { useSelector } from 'react-redux';
import { fetchGenresThunk } from '../Redux/Thunks/genreThunks';
import { useDispatch } from 'react-redux';  
import { useEffect } from 'react';      

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { genres, loading, error } = useSelector((state) => state.genre);
  console.log('Genres in HomeScreen:', genres); 

  useEffect(() => {
    dispatch(fetchGenresThunk());
  }, [dispatch]);

 
  return (
    <View style={styles.mainContainer}>
       <SearchBar />
       <HomeCoursel />
    </View>
  )
}  

const styles = StyleSheet.create({

  mainContainer: {
  flex: 1,
  backgroundColor: '#000',
  padding: 10
},


})
