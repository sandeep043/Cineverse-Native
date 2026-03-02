import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native' // ← ADD

export default function SearchBar() {
  const navigation = useNavigation(); // ← ADD

  const handleTap = () => {
    navigation.navigate('Search'); // ← navigates to SearchScreen
  };

  return (
    <Pressable onPress={handleTap}> {/* ← WRAP everything in Pressable */}
      <View style={styles.searchContainer} pointerEvents="none"> {/* ← pointerEvents none blocks inner touches */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search a title..."
          placeholderTextColor="#6b7280"
          editable={false} // ← KEY: no keyboard here
        />
        <View style={styles.searchIcon}>
          <Text>🔍</Text>
        </View>
      </View>
    </Pressable>
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


// ## What Changed & Why
// ```
// 1. useNavigation()     → gets navigation without passing as prop
// 2. editable={false}    → no keyboard opens on HomeScreen  
// 3. Pressable wrapper   → whole bar is tappable
// 4. pointerEvents="none"→ inner View doesn't steal the tap
// 5. Removed useState    → no state needed here anymore