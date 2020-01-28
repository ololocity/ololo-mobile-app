import React from 'react'
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native'
import MaskedView from '@react-native-community/masked-view'

import { CONTENT_HEIGHT } from './OnboardingSlide'

const CIRCLE_SIZE = 240

interface Props {
  scrollPosition: Animated.Value
  pageCount: number
  currentPageIndex: number
}

export default function OnboardingCircleWithIcons({
  scrollPosition,
  pageCount,
  currentPageIndex
}: Props) {
  const { width: screenWidth } = Dimensions.get('window')
  const scrollOffsetWidth = pageCount * screenWidth
  const translateX = scrollPosition.interpolate({
    inputRange: [0, scrollOffsetWidth],
    outputRange: [0, -scrollOffsetWidth]
  })
  return (
    <MaskedView
      style={styles.root}
      pointerEvents="none"
      maskElement={
        <View style={styles.circleWrapper}>
          <View style={styles.circle} />
        </View>
      }
    >
      <View style={styles.content}>
        <Animated.View style={[styles.pages, { transform: [{ translateX }] }]}>
          {Array(pageCount)
            .fill(null)
            .map((_, index) => (
              <View
                key={index.toString()}
                style={[styles.page, { width: screenWidth }]}
              >
                <Text>{index + 1}</Text>
              </View>
            ))}
        </Animated.View>
      </View>
    </MaskedView>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',

    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: CONTENT_HEIGHT
  },

  circleWrapper: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,

    backgroundColor: 'black'
  },
  content: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  pages: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,

    flexDirection: 'row'
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
