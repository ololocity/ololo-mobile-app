import React from 'react'
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import * as Haptics from 'expo-haptics'

import { EventFeedItemType } from '../util/eventFeed'
import EventPreview from './EventPreview'

interface Props {
  item: EventFeedItemType
  onPress: Function
  isActive: boolean
}

export default function EventFeedItem({ item, onPress, isActive }: Props) {
  const rootRef = React.useRef()
  const [scaleAnimValue] = React.useState(new Animated.Value(1))
  const [rootSize, setRootSize] = React.useState({
    width: 0,
    height: 0,
    px: 0,
    py: 0
  })

  function handleRootLayout() {
    if (
      rootRef.current &&
      rootRef.current._component.measure instanceof Function
    ) {
      rootRef.current._component.measure((fx, fy, width, height, px, py) => {
        setRootSize({ width, height, px, py })
      })
    }
  }

  function handlePressIn() {
    Animated.spring(scaleAnimValue, { toValue: 0.93 }).start()
  }

  function handlePressOut() {
    Animated.spring(scaleAnimValue, {
      toValue: 1,
      friction: 3,
      tension: 42
    }).start()
  }

  function handlePress() {
    onPress(rootSize)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View
        ref={rootRef}
        onLayout={handleRootLayout}
        style={[
          styles.root,
          isActive && styles.rootActive,
          { transform: [{ scale: scaleAnimValue }] }
        ]}
      >
        <EventPreview {...{ item }} />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  root: {
    height: 230
  },
  rootActive: {
    opacity: 0
  }
})
