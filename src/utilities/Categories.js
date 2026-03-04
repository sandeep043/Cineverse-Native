import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Categories({ categories, onSelectGenre, selectedGenre }) {
  return (
    <View>
      <Text style={{color:'white', padding: 10, fontSize: 18}}>
        Categories
      </Text> 

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const isSelected = selectedGenre === item.id;

          return (
            <TouchableOpacity
              onPress={() => onSelectGenre(item)}
              style={{
                marginHorizontal: 10,
                paddingHorizontal: 15,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: isSelected ? '#00BFFF' : '#222'
              }}
            >
              <Text style={{ color: 'white' }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  )
}