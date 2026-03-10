import { StyleSheet, View, Text ,TextInput, Pressable } from 'react-native'
import React, { useState, useContext , memo} from 'react'
import { ThemeContext } from '../context/ThemeContext';


const SearchBar = memo(()=>{
   console.log('🔍 [SearchBar] rendered');
    const [searchText, setSearchText] = useState('');
    const { colors } = useContext(ThemeContext);

    const handleSearch = () => {
        console.log('Searching for:', searchText);
    };

  return (
    <View style={[styles.searchContainer, { backgroundColor: colors.card }]}> 
      <TextInput   style={[styles.searchInput, { color: colors.text }]}
                    placeholder="Search"
                    placeholderTextColor={colors.mutedText}
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)} />
    
      <Pressable style={styles.searchIcon} onPress={handleSearch}>
                    <Text style={{ color: colors.text }}>🔍</Text>
      </Pressable>
    </View>
   
  )
})

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

export default SearchBar;