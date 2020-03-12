import React from 'react'
import {
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'
import Markdown from 'react-native-markdown-display'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import { HEIGHT as ACTION_BUTTON_HEIGHT } from './ActionButton'
import EventPreview from './EventPreview'
import { EventFeedItemType } from '../util/eventFeed'
import { colors } from '../util/style'
import { useSafeArea } from 'react-native-safe-area-context'

const backIconSrc = require('../assets/header-left-back-dark.png')

const PREVIEW_HEIGHT = 361
const SPRING_CONFIG = {
  friction: 8,
  tension: 40
}

const eventDescriptionQuery = gql`
  query EventDescriptionQuery($eventId: ItemId) {
    event(filter: { id: { eq: $eventId } }) {
      description
    }
  }
`

interface Props {
  item: EventFeedItemType
  initialLayout: Object
  onDismiss: () => void
  revealAnimValue: Animated.Value
}

export default function EventPreviewModal({
  item,
  initialLayout,
  onDismiss,
  revealAnimValue
}: Props) {
  const insets = useSafeArea()
  const [isRevealed, setRevealState] = React.useState(false)
  const { width: windowWidth, height: windowHeight } = Dimensions.get('screen')
  const colorScheme = useColorScheme()
  const { loading, data } = useQuery(eventDescriptionQuery, {
    variables: {
      eventId: item.id
    }
  })
  const [scrollY] = React.useState(new Animated.Value(0))

  const previewLeft = revealAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [initialLayout.px, 0]
  })
  const previewTop = isRevealed
    ? scrollY.interpolate({
        inputRange: [0, PREVIEW_HEIGHT],
        outputRange: [0, -PREVIEW_HEIGHT],
        extrapolate: 'clamp'
      })
    : revealAnimValue.interpolate({
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
    inputRange: [0, 1],
    outputRange: [initialLayout.py, 0]
  })
  const contentHeight = revealAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowHeight]
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
    <>
      <Animated.View
        style={[
          styles.scrollWrapper,
          {
            height: contentHeight,
            top: contentTop
          }
        ]}
      >
        <Animated.ScrollView
          style={[styles.scroll, colorScheme === 'dark' && styles.scrollDark]}
          contentContainerStyle={[
            styles.contentContainer,
            {
              paddingBottom: ACTION_BUTTON_HEIGHT + insets.bottom
            }
          ]}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ])}
          scrollEnabled={isRevealed}
        >
          {loading ? <ActivityIndicator /> : null}
          {data && data.event ? (
            <Markdown
              style={{
                root: {
                  color: colorScheme === 'dark' ? colors.white : colors.black,
                  fontSize: 13
                }
              }}
              mergeStyle
            >
              {data.event.description}
            </Markdown>
          ) : null}
        </Animated.ScrollView>
      </Animated.View>

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
        pointerEvents="none"
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
          <Image source={backIconSrc} />
        </TouchableOpacity>
      </Animated.View>
    </>
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
  scrollWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,

    overflow: 'hidden'
  },
  scroll: {
    ...StyleSheet.absoluteFillObject,

    flex: 1,

    backgroundColor: colors.white
  },
  scrollDark: {
    backgroundColor: colors.black
  },
  contentContainer: {
    paddingTop: PREVIEW_HEIGHT,
    paddingHorizontal: 16
  },
  dismissButtonWrapper: {
    position: 'absolute',

    left: 0,
    top: 0
  },
  dismissButton: {
    padding: 20,
    paddingTop: 50
  }
})
