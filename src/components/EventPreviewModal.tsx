import React from 'react'
import {
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  ActivityIndicator
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'
import Markdown from 'react-native-markdown-display'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import EventPreview from './EventPreview'
import Reanimated from 'react-native-reanimated'
import { onScroll } from 'react-native-redash'
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
  const [isRevealed, setRevealState] = React.useState(false)
  const { width: windowWidth, height: windowHeight } = Dimensions.get('screen')
  const colorScheme = useColorScheme()
  const { loading, data } = useQuery(eventDescriptionQuery, {
    variables: {
      eventId: item.id
    }
  })
  const [sheetY] = React.useState(new Reanimated.Value(0))

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
    inputRange: [0, 1],
    outputRange: [initialLayout.py, 0]
  })
  const contentHeight = revealAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, windowHeight]
  })
  const { interpolate, Extrapolate } = Reanimated
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
  const headerHeight = sheetY.interpolate({
    inputRange: [-PREVIEW_HEIGHT, 0],
    outputRange: [0, PREVIEW_HEIGHT]
  })

  const headerOpacity = interpolate(sheetY, {
    inputRange: [-PREVIEW_HEIGHT / 2, 0, PREVIEW_HEIGHT / 2],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP
  })
  return (
    <Reanimated.ScrollView
      onScroll={onScroll({ y: sheetY })}
      style={styles.root}
      pointerEvents="box-none"
    >
      <Animated.View
        style={[
          styles.scrollWrapper,
          {
            height: contentHeight,
            top: contentTop
          }
        ]}
      >
        <ScrollView
          style={[styles.scroll, colorScheme === 'dark' && styles.scrollDark]}
          contentContainerStyle={styles.contentContainer}
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
        </ScrollView>
      </Animated.View>

      <Animated.View
        style={[
          styles.preview,
          { height: headerHeight },
          {
            left: previewLeft,
            top: previewTop,
            width: previewWidth,
            height: previewHeight
            // opacity: headerOpacity
          }
        ]}
      >
        <EventPreview {...{ item, revealAnimValue, sheetY }} />
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
    </Reanimated.ScrollView>
  )
  paddingVertical: 24
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
