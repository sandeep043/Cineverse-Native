import { StyleSheet, View, Text ,TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'


export default function SearchBar() {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        console.log('Searching for:', searchText);
    };

  return (
    <View style={styles.searchContainer}>
      <TextInput   style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#6b7280"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)} />
    
      <Pressable style={styles.searchIcon} onPress={handleSearch}>
                    <Text>🔍</Text>
      </Pressable>
    </View>
   
  )
} 

const styles = StyleSheet.create({
searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 16,
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        paddingHorizontal: 16,
    },
searchInput: {
        flex: 1,
        paddingVertical: 12,
        color: '#ffffff',
        fontSize: 14,
    },
    searchIcon: {
        padding: 10,
    },

});