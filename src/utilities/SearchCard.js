import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { getImageUrl } from '../services/tmdbConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

// A horizontal search result card styled similar to the provided screenshot.
// Props:
//   data    - TMDB movie/show object
//   genres  - optional genre list from redux so we can map ids to names
//   onPress - tap callback
export default function SearchCard({ data, genres = [], onPress }) {
  const poster = data.poster_path ? getImageUrl(data.poster_path) : null;
  const title = data.title || data.name;
  const year = data.release_date ? data.release_date.split('-')[0] : '';
  const rating = data.vote_average ? data.vote_average.toFixed(1) : null;

  const firstGenre =
    genres.find((g) => data.genre_ids && g.id === data.genre_ids[0])?.name || '';

  // determine badge text based on genre (just as a visual demo)
  const isPremium = data.genre_ids && data.genre_ids.includes(28);
  const badgeText = isPremium ? 'Premium' : 'Free';
  const badgeColor = isPremium ? '#FFA500' : '#00E5FF';

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
      {poster && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: poster }} style={styles.poster} />
          {rating !== null && (
            <View style={styles.ratingOverlay}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          )}
          <View style={[styles.badge, { backgroundColor: badgeColor }]}> 
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        </View>
      )}

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.details} numberOfLines={1}>
          {year} {firstGenre ? `· ${firstGenre}` : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 100,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingOverlay: {
    position: 'absolute',
    top: 6,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  details: {
    fontSize: 14,
    color: '#aaa',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#fff',
  },
});
