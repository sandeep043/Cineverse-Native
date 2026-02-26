import { View, Text, FlatList } from 'react-native'
import React from 'react'

export default function Categories({ categories }) {
  return (
    <View>
      <Text style={{color:'white', padding: 10, fontSize: 18}} >Categories</Text> 

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        renderItem={({ item }) => (
          <Text style={{color:'white', marginHorizontal: 10}}>{item.name}</Text>
        )}
      />
    </View>
  )
}