import React, { useMemo, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../Redux/slices/favoriteSlice';
import { useTheme } from '../hooks/useTheme';



const SORT_OPTIONS = [
  { key: 'rating', label: '⭐ Rating'  },
  { key: 'title',  label: '🔤 Title'   },
  { key: 'date',   label: '📅 Date'    },
];



export default function FavoriteScreen() {
  const { colors }  = useTheme();
  const dispatch    = useDispatch();
  const favorites   = useSelector((state) => state.favorite.favorites);

  const [sortBy, setSortBy] = useState('rating'); 




//   const sortedFavorites = [...favorites].sort((a, b) => {
//     console.log('Sorting favorites by', sortBy);
//   if (sortBy === 'rating') {
//     return (b.vote_average || 0) - (a.vote_average || 0);
//   }

//   if (sortBy === 'title') {
//     return (a.title || '').localeCompare(b.title || '');
//   }

//   if (sortBy === 'date') {
//     return new Date(b.release_date || 0) - new Date(a.release_date || 0);
//   }

//   return 0;
// });

  const sortedFavorites = useMemo(() => {
    console.log('useMemo → re-sorting because favorites or sortBy changed');

    return [...favorites].sort((a, b) => {
      if (sortBy === 'rating') return (b.vote_average || 0) - (a.vote_average || 0);
      if (sortBy === 'title')  return (a.title || '').localeCompare(b.title || '');
      if (sortBy === 'date')   return new Date(b.release_date || 0) - new Date(a.release_date || 0);
      return 0;
    });
  }, [favorites, sortBy]);
  // ──────────────────────────────────────────────────────────────────────

  const handleRemove = useCallback((movie) => {
    dispatch(removeFromFavorites(movie));
  }, [dispatch]);

  const renderItem = useCallback(({ item }) => (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.cardInfo}> 
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.meta, { color: colors.mutedText }]}>
          ⭐ {item.vote_average?.toFixed(1) || 'N/A'}
          {'   '}📅 {item.release_date?.slice(0, 4) || '—'}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleRemove(item)}
        style={[styles.removeBtn, { borderColor: colors.primary }]}>
        <Text style={[styles.removeBtnText, { color: colors.primary }]}>Remove</Text>
      </TouchableOpacity>
    </View>
  ), [colors, handleRemove]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>

      {/* Header */}
      <Text style={[styles.header, { color: colors.text }]}>Favorite Movies</Text>

      {/* Sort Filter Chips */}
      <View style={styles.filterSection}>
        <Text style={[styles.filterLabel, { color: colors.mutedText }]}>Sort by:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {SORT_OPTIONS.map((opt) => {
            const isActive = sortBy === opt.key;
            return (
              <TouchableOpacity
                key={opt.key}
                onPress={() => setSortBy(opt.key)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: isActive ? colors.primary : colors.card,
                    borderColor:     isActive ? colors.primary : colors.border,
                  },
                ]}>
                <Text style={[
                  styles.chipText,
                  { color: isActive ? '#fff' : colors.text },
                ]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results count */}
      <Text style={[styles.count, { color: colors.mutedText }]}>
        {sortedFavorites.length} movies
      </Text>

      {/* Movie List */}
      <FlatList
        data={sortedFavorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.mutedText }]}>
            No favorites yet.
          </Text>
        }
      />
    </View>
  );
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 16,
  },

  // Filter row
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
  },

  // Count
  count: {
    fontSize: 12,
    marginBottom: 12,
  },

  // Card
  listContent: {
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  cardInfo: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
  },
  removeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  removeBtnText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Empty
  empty: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 15,
  },
});