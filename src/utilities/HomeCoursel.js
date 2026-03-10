import React, { useRef, useState, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import { getImageUrl, BACKDROP_SIZE } from '../services/tmdbConfig'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const ITEM_WIDTH = Math.round(SCREEN_WIDTH * 0.78)
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 0.56)
const SPACING = 16

const SAMPLE_DATA = [
  {
    id: '1',
    title: 'Black Panther: Wakanda Forever',
    date: 'On March 2, 2022',
    image: 'https://picsum.photos/800/450?random=1',
  },
  {
    id: '2',
    title: 'The Jungle Waiting',
    date: 'On Feb 10, 2021',
    image: 'https://picsum.photos/800/450?random=2',
  },
  {
    id: '3',
    title: 'Life of Pi',
    date: 'On Nov 7, 2020',
    image: 'https://picsum.photos/800/450?random=3',
  },
]

export default function HomeCoursel({ data = SAMPLE_DATA, onPressItem }) {
  console.log("coursal rendering------------------------------")
  const { colors } = useContext(ThemeContext);
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleMomentumEnd = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x
    const index = Math.round(offsetX / (ITEM_WIDTH + SPACING))
    setActiveIndex(index)
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
        onMomentumScrollEnd={handleMomentumEnd}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={[styles.itemWrapper, { marginRight: SPACING }]}
            onPress={() => onPressItem && onPressItem(item)}
          >
            {/* prefer explicit image property but fall back to TMDB's poster_path/backdrop_path */}
            <ImageBackground
              source={{
                uri:
                  item.image ||
                  getImageUrl(item.backdrop_path, BACKDROP_SIZE),
              }}
              style={styles.image}
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay} />
              <View style={styles.textWrap}>
                <Text numberOfLines={2} style={[styles.title, { color: colors.text }]}> 
                  {item.title || item.name}
                </Text>
                <Text style={[styles.date, { color: colors.mutedText }]}>{item.date || item.release_date}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.dots}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  scrollContent: {
    paddingHorizontal: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
    alignItems: 'center',
  },
  itemWrapper: {
    width: ITEM_WIDTH,
  },
  image: {
    width: '100%',
    height: ITEM_HEIGHT,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 14,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.28)',
    borderRadius: 14,
  },
  textWrap: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: '#2ec4b6',
    width: 18,
    borderRadius: 9,
  },
  dotInactive: {
    backgroundColor: '#334155',
  },
})
