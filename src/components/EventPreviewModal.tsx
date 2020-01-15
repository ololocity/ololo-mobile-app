import React from 'react'
import {
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'

import { EventFeedItem } from '../screens/EventFeed'
import EventPreview from './EventPreview'

const backIconSrc = {
  default: require('../assets/header-left-back.png'),
  dark: require('../assets/header-left-back-dark.png')
}

const PREVIEW_HEIGHT = 361
const SPRING_CONFIG = {
  friction: 8,
  tension: 40
}

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
  const { width: windowWidth } = Dimensions.get('screen')
  const colorScheme = useColorScheme()
  const [leftAnimValue] = React.useState(new Animated.Value(initialLayout.px))
  const [topAnimValue] = React.useState(new Animated.Value(initialLayout.py))
  const [widthAnimValue] = React.useState(
    new Animated.Value(initialLayout.width)
  )
  const [heightAnimValue] = React.useState(
    new Animated.Value(initialLayout.height)
  )

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(leftAnimValue, {
        toValue: 0,
        ...SPRING_CONFIG
      }),
      Animated.spring(topAnimValue, {
        toValue: 0,
        ...SPRING_CONFIG
      }),
      Animated.spring(widthAnimValue, {
        toValue: windowWidth,
        ...SPRING_CONFIG
      }),
      Animated.spring(heightAnimValue, {
        toValue: PREVIEW_HEIGHT,
        ...SPRING_CONFIG
      })
    ]).start(() => {
      setRevealState(true)
    })
  }, [])

  function handleDismissButtonPress() {
    setRevealState(false)

    Animated.parallel([
      Animated.spring(leftAnimValue, {
        toValue: initialLayout.px,
        ...SPRING_CONFIG
      }),
      Animated.spring(topAnimValue, {
        toValue: initialLayout.py,
        ...SPRING_CONFIG
      }),
      Animated.spring(widthAnimValue, {
        toValue: initialLayout.width,
        ...SPRING_CONFIG
      }),
      Animated.spring(heightAnimValue, {
        toValue: initialLayout.height,
        ...SPRING_CONFIG
      })
    ]).start(onDismiss)
  }

  return (
    <View style={styles.root} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.preview,
          {
            left: leftAnimValue,
            top: topAnimValue,
            width: widthAnimValue,
            height: heightAnimValue
          }
        ]}
      >
        <EventPreview {...{ item }} />
      </Animated.View>

      {isRevealed ? (
        <TouchableOpacity
          style={styles.dismissButton}
          onPress={handleDismissButtonPress}
        >
          <Image
            source={backIconSrc[colorScheme === 'dark' ? 'dark' : 'default']}
          />
        </TouchableOpacity>
      ) : null}
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
  dismissButton: {
    position: 'absolute',

    left: 0,
    top: 30,

    padding: 30
  }
})
