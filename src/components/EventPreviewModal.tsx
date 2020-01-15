import React from 'react'
import {
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Animated
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'
import Markdown from 'react-native-markdown-display'

import { EventFeedItem } from '../screens/EventFeed'
import EventPreview from './EventPreview'
import { colors } from '../util/style'

const backIconSrc = {
  default: require('../assets/header-left-back.png'),
  dark: require('../assets/header-left-back-dark.png')
}

const PREVIEW_HEIGHT = 361
const SPRING_CONFIG = {
  friction: 8,
  tension: 40
}
const dummyEventDescription = `
Reprehenderit non irure dolore ullamco aute. Enim dolor ipsum quis tempor dolor deserunt nostrud do quis minim enim ipsum. Esse ad excepteur enim reprehenderit duis consequat mollit. Dolor labore exercitation voluptate aute dolore esse dolor occaecat amet laboris enim.

Cupidatat esse quis tempor voluptate Lorem reprehenderit tempor officia cupidatat proident consectetur eiusmod consequat aliquip. Eiusmod officia dolor fugiat tempor ullamco proident ut pariatur nostrud eu officia consectetur irure sunt.
`

interface Props {
  item: EventFeedItem
  initialLayout: Object
  onDismiss: () => void
}

export default function EventPreviewModal({
  item,
  initialLayout,
  onDismiss
}: Props) {
  const [isRevealed, setRevealState] = React.useState(false)
  const { width: windowWidth, height: windowHeight } = Dimensions.get('screen')
  const colorScheme = useColorScheme()

  const [revealAnimValue] = React.useState(new Animated.Value(0))
  const previewLeft = revealAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [initialLayout.px, 0]
  })
  const previewTop = revealAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [initialLayout.py, 0]
  })
  const previewWidth = revealAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [initialLayout.width, windowWidth]
  })
  const previewHeight = revealAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [initialLayout.height, PREVIEW_HEIGHT]
  })
  const dismissButtonOpacity = revealAnimValue.interpolate({
    inputRange: [0.96, 1],
    outputRange: [0, 1]
  })
  const contentTop = revealAnimValue.interpolate({
    inputRange: [0.8, 1],
    outputRange: [-1 * windowHeight, 0]
  })

  React.useEffect(() => {
    Animated.spring(revealAnimValue, {
      toValue: 1,
      ...SPRING_CONFIG
    }).start(() => {
      setRevealState(true)
    })
  }, [])

  function handleDismissButtonPress() {
    setRevealState(false)

    Animated.spring(revealAnimValue, {
      toValue: 0,
      ...SPRING_CONFIG
    }).start(onDismiss)
  }

  return (
    <View style={styles.root} pointerEvents="box-none">
      <Animated.ScrollView
        style={[
          styles.content,
          colorScheme === 'dark' && styles.contentDark,
          { height: windowHeight, top: contentTop }
        ]}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={isRevealed}
      >
        <Markdown
          style={{
            root: {
              color: colorScheme === 'dark' ? colors.white : colors.black,
              fontSize: 13
            }
          }}
          mergeStyle
        >
          {dummyEventDescription}
        </Markdown>
      </Animated.ScrollView>

      <Animated.View
        style={[
          styles.preview,
          {
            left: previewLeft,
            top: previewTop,
            width: previewWidth,
            height: previewHeight
          }
        ]}
      >
        <EventPreview {...{ item, revealAnimValue }} />
      </Animated.View>

      <Animated.View
        style={[styles.dismissButtonWrapper, { opacity: dismissButtonOpacity }]}
      >
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={handleDismissButtonPress}
        >
          <Image
            source={backIconSrc[colorScheme === 'dark' ? 'dark' : 'default']}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,

    flex: 1
  },
  preview: {
    position: 'absolute'
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,

    backgroundColor: colors.white
  },
  contentDark: {
    backgroundColor: colors.black
  },
  contentContainer: {
    paddingTop: PREVIEW_HEIGHT,
    paddingHorizontal: 16
  },
  dismissButtonWrapper: {
    position: 'absolute',

    left: 0,
    top: 30
  },
  dismissButton: {
    padding: 20
  }
})
