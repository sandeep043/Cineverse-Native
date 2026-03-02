import {StyleSheet, View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import HomeCoursel from '../utilities/HomeCoursel'
import  SearchBar  from '../utilities/SearchBar'
import MostpopularCard from '../utilities/MostpopularCard';
import TrendingMoviesCard from '../utilities/TrendingMoviesCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGenresThunk } from '../Redux/Thunks/genreThunks';
import Categories from '../utilities/Categories'; 
import { fetchPopularMoviesThunk } from '../Redux/Thunks/popularThunks';
import { fetchTopRatedMoviesThunk } from '../Redux/Thunks/topRatedThunks';
import { fetchTrendingMoviesThunk } from '../Redux/Thunks/trendingThunks'; 
import { useNavigation } from '@react-navigation/native'; 



export default function HomeScreen() { 
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { genres, loading, error } = useSelector((state) => state.genre);
  const { popularMovies, loading: popularLoading, error: popularError } = useSelector((state) => state.popular); 
  const { topRatedMovies, loading: topRatedLoading, error: topRatedError } = useSelector((state) => state.topRated); 
  const { trendingMovies, loading: trendingLoading, error: trendingError } = useSelector((state) => state.trending);  
  const { movieDetails, loading: movieDetailsLoading, error: movieDetailsError } = useSelector((state) => state.movieDetails);  

  // console.log('Genres in HomeScreen:', genres); 
  // console.log('Popular Movies in HomeScreen:', popularMovies); 
  // console.log('Top Rated Movies in HomeScreen:', topRatedMovies); 
  // console.log('Trending Movies in HomeScreen:', trendingMovies);
  // console.log('Movie Details in HomeScreen:', movieDetails);

  useEffect(() => {

    dispatch(fetchGenresThunk());
    dispatch(fetchPopularMoviesThunk());
    dispatch(fetchTopRatedMoviesThunk());
    dispatch(fetchTrendingMoviesThunk());
  }, [dispatch]); 

 const onPressMovie = (movie) => { 
    navigation.navigate('MovieDetails', { movieId: movie.id });
    // dispatch(fetchMovieDetailsThunk(movie.id));
  }

 
  return (
    <View style={styles.mainContainer}>
      <ScrollView > 

       <SearchBar />
       {/* feed the carousel with popular movies once they're loaded */}
       <HomeCoursel data={topRatedMovies} />
       <Categories categories={genres} />

       {/* most popular horizontal strip */}
       <View style={styles.sectionHeader}>
         <Text style={styles.sectionTitle}>Most popular</Text>
         <Text style={styles.sectionAction}>See All</Text>
       </View>
       {popularMovies && popularMovies.length > 0 && (
         <FlatList
           data={popularMovies}
           horizontal
           showsHorizontalScrollIndicator={false}
           keyExtractor={(item) => item.id.toString()}
           contentContainerStyle={{paddingVertical: 8}}
           renderItem={({item}) => (
             <MostpopularCard movie={item} onPress={onPressMovie} genres={genres} />
           )}
         />
       )}

       {/* trending horizontal strip */}
       <View style={styles.sectionHeader}>
         <Text style={styles.sectionTitle}>Trending</Text>
         <Text style={styles.sectionAction}>See All</Text>
       </View>
       {trendingMovies && trendingMovies.length > 0 && (
         <FlatList
           data={trendingMovies}
           horizontal
           showsHorizontalScrollIndicator={false}
           keyExtractor={(item) => item.id.toString()}
           contentContainerStyle={{paddingVertical: 8}}
           renderItem={({item}) => (
             <TrendingMoviesCard movie={item} genres={genres} onPress={onPressMovie} />
           )}
         />
       )} 
        </ScrollView>

    </View>
  )
}  

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionAction: {
    color: '#00E5FF',
    fontSize: 14,
  },
});
