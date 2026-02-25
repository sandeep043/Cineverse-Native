import {StyleSheet, View, Text } from 'react-native'
import React from 'react'
import HomeCoursel from '../utilities/HomeCoursel'
import  SearchBar  from '../utilities/SearchBar'

export default function HomeScreen() {


  return (
    <View style={styles.mainContainer}>
       <SearchBar />
      <HomeCoursel />
    
      <Text style={{color:'white'}} >HomeScreen
        kl;ajsdfk asdf asd dfsa 
        
      </Text>
      <Text style={{color:'white'}} >HomeScreen
        kl;ajsdfk asdf asd dfsa 
        
      </Text>
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
