import React, { useEffect, useCallback, useRef, use } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchTrendingMoviesThunk } from '../Redux/Thunks/trendingThunks';

export default function MovieListScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch(); 
  const isFetchingRef = useRef(false);

  const {
    trendingMovies,
    page,
    totalPages,
    loading, 
    loadingMore
  } = useSelector((state) => state.trending);

  // Initial Load
  useEffect(() => {
    dispatch(fetchTrendingMoviesThunk(1));
  }, [dispatch]);


  // Reset fetching flag after load

  useEffect(() => { 
    if (!loadingMore) {
      isFetchingRef.current = false;
    }
  }, [loadingMore]);


  // Pagination Handler
  const handleLoadMore = useCallback(() => {
    if (isFetchingRef.current) return;
    if (loadingMore) return;
    if (page >= totalPages) return;

    isFetchingRef.current = true;

    dispatch(fetchTrendingMoviesThunk(page + 1));
  }, [dispatch, loadingMore, page, totalPages]);

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: item.poster_path }}
        style={styles.poster}
      />

      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.subText}>
          📅 {item.release_date?.split('-')[0]}
        </Text>

        <Text style={styles.subText}>
          ⭐ {item.vote_average}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trending Movies</Text>
      </View>

      {/* First Page Loader */}
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#00E5FF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={trendingMovies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMovieItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator size="small" color="#00E5FF" />
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0C1D',
    paddingHorizontal: 16
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16
  },
  back: {
    color: '#fff',
    fontSize: 22,
    marginRight: 16
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700'
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#1A1A2E',
    borderRadius: 12,
    overflow: 'hidden'
  },
  poster: {
    width: 100,
    height: 150
  },
  details: {
    flex: 1,
    padding: 12,
    justifyContent: 'center'
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6
  },
  subText: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 4
  }
});