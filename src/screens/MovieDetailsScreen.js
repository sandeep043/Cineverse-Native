import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useContext } from 'react' 
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fetchMovieDetailsThunk } from '../Redux/Thunks/movieDetailsThunks';
import { getImageUrl, BACKDROP_SIZE } from '../services/tmdbConfig';
import LinearGradient from 'react-native-linear-gradient'; 
import { setMovieDetails } from '../Redux/slices/movieDetailsSlice';
import { ThemeContext } from '../context/ThemeContext';

import { Clock4 ,Film } from 'lucide-react-native';



export default function MovieDetailsScreen() { 
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { movieDetails, loading: movieDetailsLoading, error: movieDetailsError } = useSelector((state) => state.movieDetails);
  const { colors } = useContext(ThemeContext);

  // grab movieId from params
  const { movieId } = navigation.getState().routes.find(route => route.name === 'MovieDetails').params;

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetailsThunk(movieId));
    }
  }, [dispatch, movieId]);

  if (movieDetailsLoading) {
    return (
      <View style={[styles.loaderContainer, {backgroundColor: colors.background}]}> 
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (movieDetailsError) {
    return (
      <View style={[styles.loaderContainer, {backgroundColor: colors.background}]}> 
        <Text style={[styles.errorText, {color: colors.text}]}>Unable to load movie details.</Text>
      </View>
    );
  } 

  console.log('Movie Details in MovieDetailsScreen:', movieDetails);

  const poster = movieDetails.poster_path ? getImageUrl(movieDetails.poster_path) : null;
  const backdrop = movieDetails.backdrop_path ? getImageUrl(movieDetails.backdrop_path, BACKDROP_SIZE) : null;
  const title = movieDetails.title || movieDetails.name;
  const rating = movieDetails.vote_average ? movieDetails.vote_average.toFixed(1) : null;
  const genres = movieDetails.genres ? movieDetails.genres.map(g => g.name).join(', ') : '';
  const releaseYear = movieDetails.release_date ? movieDetails.release_date.slice(0, 4) : '';
  const runtime = movieDetails.runtime ? `${movieDetails.runtime}m` : ' ';

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}> 
      {backdrop && (
        <ImageBackground
          source={{ uri: backdrop }}
          style={styles.background}
          blurRadius={25}
        >
          {/* gradient overlay from middle toward bottom */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </ImageBackground>
      )}

      {/* custom header */}
      <View style={[styles.header, {backgroundColor: colors.background}]}>  
        <TouchableOpacity onPress={() => (
         dispatch(setMovieDetails([])),
         navigation.goBack())}>
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.text}]} numberOfLines={1}>{title}</Text>
        <TouchableOpacity onPress={() => { /* TODO: favorite toggle */ }}>
          <Ionicons name="heart-outline" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {poster && (
          <View style={styles.posterContainer}>
            <Image source={{ uri: poster }} style={styles.poster} />
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
          {movieDetails.tagline ? <Text style={[styles.tagline, {color: colors.mutedText}]}>{movieDetails.tagline}</Text> : null}
          <View style={styles.detailsRow}>
            {releaseYear && (
              <View style={styles.detailItem}>
                <Ionicons name="calendar" color={colors.mutedText} size={14} />
                <Text style={[styles.detailsText, {color: colors.mutedText}]}>{releaseYear}</Text>
              </View>
            )}
            {runtime && (
              <View style={styles.detailItem}>
                <Clock4 color={colors.mutedText} size={14} />
                <Text style={[styles.detailsText, {color: colors.mutedText}]}>{runtime}</Text>
              </View>
            )}
            {genres && (
              <View style={styles.detailItem}>
                <Film color={colors.mutedText} size={14} />
                <Text style={[styles.detailsText, {color: colors.mutedText}]}>{genres}</Text>
              </View>
            )}
          </View>
          {rating && (
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          )}
          <Text style={[styles.overview, {color: colors.text}]}>{movieDetails.overview}</Text>
        </View>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
  },
  header: {
    height: 60,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  background: {
    ...StyleSheet.absoluteFill,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
  posterContainer: {
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  poster: {
    width: 240,
    height: 360,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  infoContainer: {
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  tagline: {
    color: '#aaa',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent:"center",
   gap: 18,
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailsText: {
    color: '#ccc',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 4,
  },
  overview: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22,
  },
});