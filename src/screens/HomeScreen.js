import {StyleSheet, View, Text, FlatList, ScrollView, Switch } from 'react-native'
import React, { useCallback, useEffect, useState, useContext } from 'react'
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
import {fetchMoviesByGenreThunk} from '../Redux/Thunks/genreThunks';

// consume theme context to drive colors and toggle
import { ThemeContext } from '../context/ThemeContext';


export default function HomeScreen() { 
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { genres, loading, error } = useSelector((state) => state.genre);
  const { popularMovies, loading: popularLoading, error: popularError } = useSelector((state) => state.popular); 
  const { topRatedMovies, loading: topRatedLoading, error: topRatedError } = useSelector((state) => state.topRated); 
  const { trendingMovies, loading: trendingLoading, error: trendingError } = useSelector((state) => state.trending);  
  const { movieDetails, loading: movieDetailsLoading, error: movieDetailsError } = useSelector((state) => state.movieDetails);  
  const { genreMovies, loading: genreMoviesLoading, error: genreMoviesError } = useSelector((state) => state.genreMovies);  

  const [selectedGenre, setSelectedGenre] = useState(null);  

  const { colors, isDark, toggleTheme } = useContext(ThemeContext);
  // console.log('Movies by Genre in HomeScreen:', genreMovies);

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

  const handleGenreSelect = useCallback((genre) => {
    if (selectedGenre === genre.id) {
     
      return;
    }
    setSelectedGenre(genre.id);
    dispatch(fetchMoviesByGenreThunk(genre.id));
  }, [dispatch]);

  const moviesToShow = selectedGenre ? genreMovies : popularMovies  ;
 const sectionTitle = selectedGenre
  ? `${genres.find(g => g.id === selectedGenre)?.name} Movies`
  : "Most Popular";


  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>      
      {/* simple toggle placed at top right of HomeScreen */}
      <View style={styles.toggleRow}>
        <Text style={[styles.toggleLabel, { color: colors.text }]}>Dark mode</Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={colors.primary}
        />
      </View>

      <ScrollView > 

       <SearchBar />
       {/* feed the carousel with popular movies once they're loaded */}
       <HomeCoursel data={topRatedMovies} />
       <Categories categories={genres} 
       onSelectGenre={handleGenreSelect}
       selectedGenre={selectedGenre}
       />

       {/* most popular horizontal strip */}
       <View style={styles.sectionHeader}>
         <Text style={[styles.sectionTitle, { color: colors.text }]}>{sectionTitle}</Text>
         <Text style={[styles.sectionAction, { color: colors.primary }]}>See All</Text>
       </View>
       {moviesToShow && moviesToShow.length > 0 && (
         <FlatList
           data={moviesToShow}
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
         <Text style={[styles.sectionTitle, { color: colors.text }]}>Trending</Text>
         <Text style={[styles.sectionAction, { color: colors.primary }]} onPress={() => navigation.navigate('MovieList')}>See All</Text>
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
    padding: 10,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
  },
  toggleLabel: {
    marginRight: 8,
    fontSize: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  sectionAction: {
    fontSize: 14,
  },
});
