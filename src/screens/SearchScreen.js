// SearchScreen.js
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Pressable, Text ,FlatList } from 'react-native'
import React from 'react'

import { searchMoviesThunk } from '../Redux/Thunks/searchThunk';
import { clearSearchResults } from '../Redux/slices/searchSlice';

import SearchCard from '../utilities/SearchCard';
import { getImageUrl } from '../services/tmdbConfig';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGenresThunk } from '../Redux/Thunks/genreThunks';




export default function SearchScreen({ navigation }) {

  const { genres, loading:genereLoading, error:genreError } = useSelector((state) => state.genre);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const [query, setQuery] = useState('');
console.log('SearchScreen rendered with query:', query); 
  const dispatch = useDispatch();
  const { results, loading, error } = useSelector((state) => state.search);
  console.log('Search results from state:', results);



  useFocusEffect(
    useCallback(() => {
      setTimeout(() => inputRef.current?.focus(), 100);
    }, [])
  ); 

  useEffect(() => {
    if(debounceRef.current){
      clearTimeout(debounceRef.current);
    }
    
    if(query.trim()==''){
      dispatch(clearSearchResults());
      return;
    }

    debounceRef.current = setTimeout(() => {
      dispatch(searchMoviesThunk(query));
    }, 1000);

    return () => {
      if(debounceRef.current){
        clearTimeout(debounceRef.current);
      }
    };
   
  }, [query]);


  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          ref={inputRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Search..."
          placeholderTextColor="#6b7280"
          autoFocus={true}
          style={styles.searchInput}
          returnKeyType="search"
        />
        <Pressable onPress={() => navigation.goBack()} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
      </View>
      {/* Render search results here */}
      {query && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SearchCard
              data={item}
              genres={genres}
              onPress={() => navigation.push('Details', { id: item.id })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
   
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
  cancelButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  cancelText: {
    color: '#00E5FF',
    fontSize: 16,
    fontWeight: '500',
  },
});