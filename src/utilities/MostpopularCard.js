import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getImageUrl } from '../services/tmdbConfig';
import { useTheme } from '../hooks/useTheme';

/**
 * Card used in horizontal "Most popular" lists.
 * movie: object returned by TMDB (expects poster_path, title/name, vote_average etc.)
 * genres: optional array of genre objects (id/name) so the card can display the first genre.
 */
export default function MostpopularCard({ movie, genres = [], onPress }) {
  const { colors } = useTheme();
  const poster = movie.poster_path ? getImageUrl(movie.poster_path) : null;
  const title = movie.title || movie.name;
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;
  const firstGenre =
    genres.find((g) => movie.genre_ids && g.id === movie.genre_ids[0])?.name || '';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress && onPress(movie)}>
      {poster && <Image source={{ uri: poster }} style={styles.poster} />}
      {rating !== null && (
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={[styles.ratingText, { color: colors.text }]}>{rating}</Text>
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
        {firstGenre ? (
          <Text style={[styles.genre, { color: colors.mutedText }]} numberOfLines={1}>
            {firstGenre}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const CARD_WIDTH = 120;
const CARD_HEIGHT = 200;

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginRight: 12,
  },
  poster: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  ratingContainer: {
    position: 'absolute',
    top: 6,
    right: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    marginLeft: 2,
  },
  textContainer: {
    marginTop: 4,
  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  genre: {
    color: '#aaa',
    fontSize: 10,
  },
});
