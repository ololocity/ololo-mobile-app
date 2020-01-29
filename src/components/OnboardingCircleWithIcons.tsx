import React from 'react'
import { Animated, View, Text, StyleSheet, Dimensions } from 'react-native'
import MaskedView from '@react-native-community/masked-view'

import OnboardingAnimatedIcon from './OnboardingAnimatedIcon'

import { CONTENT_HEIGHT } from './OnboardingSlide'

export const CIRCLE_SIZE = 240

interface Props {
  scrollPosition: Animated.Value
  pageCount: number
  pageKeys: Array<string>
}

export default function OnboardingCircleWithIcons({
  scrollPosition,
  pageCount,
  pageKeys
}: Props) {
  const { width: screenWidth } = Dimensions.get('window')
  const scrollOffsetWidth = pageCount * screenWidth
  const translateX = scrollPosition.interpolate({
    inputRange: [0, scrollOffsetWidth],
    outputRange: [0, -scrollOffsetWidth]
  })

  return (
    <View style={styles.root} pointerEvents="none">
      <MaskedView
        style={styles.wrapper}
        maskElement={
          <View style={styles.circleWrapper}>
            <View style={styles.circle} />
          </View>
        }
      >
        <View style={styles.content} pointerEvents="none">
          <Animated.View
            style={[styles.pages, { transform: [{ translateX }] }]}
          >
            {Array(pageCount)
              .fill(null)
              .map((_, index) => (
                <View
                  key={index.toString()}
                  style={[styles.page, { width: screenWidth }]}
                >
                  <OnboardingAnimatedIcon
                    pageKey={pageKeys[index]}
                    {...{ index, scrollPosition }}
                  />
                </View>
              ))}
          </Animated.View>
        </View>
      </MaskedView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',

    flex: 1,

    marginBottom: CONTENT_HEIGHT
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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

    backgroundColor: '#438DEF'
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
