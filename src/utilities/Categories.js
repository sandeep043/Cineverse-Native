import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, memo } from 'react'
import { ThemeContext } from '../context/ThemeContext';



const Categories = memo(( {categories, onSelectGenre, selectedGenre})=>{ 
  console.log("rendering Categories----------------------")

  const { colors } = useContext(ThemeContext);

  return (
    <View>
      <Text style={{color: colors.text, padding: 10, fontSize: 18}}>
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
                backgroundColor: isSelected ? colors.primary : colors.card
              }}
            >
              <Text style={{ color: colors.text }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  )

  
 

})  



export default Categories;
