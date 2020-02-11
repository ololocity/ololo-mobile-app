import React from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import {
  PanGestureHandler,
  TapGestureHandler,
  State
} from 'react-native-gesture-handler'
import throttle from 'lodash/throttle'

import RatingStar from './RatingStar'
import { clamp } from '../util/misc'

const STAR_COUNT = 5
const {
  useCode,
  block,
  debug,
  divide,
  ceil,
  multiply,
  greaterThan,
  onChange,
  set,
  call,
  eq,
  cond
} = Animated

interface Props {
  onChange: (rating: number) => void
}

function EventFeedbackRating(props: Props) {
  const [rootWidthValue] = React.useState(new Animated.Value(-1))
  const [touchX] = React.useState(new Animated.Value(-1))
  const [gestureState] = React.useState(new Animated.Value(-1))
  const [selectedStar] = React.useState(new Animated.Value(-1))

  const panCallback = React.useCallback(
    throttle(([nextSelectedStar]) => {
      if (nextSelectedStar > 0) {
        props.onChange(clamp(nextSelectedStar, 0, 5))
      }
    }, 60),
    []
  )

  useCode(
    () =>
      block([
        cond(
          eq(gestureState, State.ACTIVE),
          set(
            selectedStar,
            ceil(multiply(divide(touchX, rootWidthValue), STAR_COUNT))
          )
        ),
        cond(greaterThan(selectedStar, 0), call([selectedStar], panCallback))
      ]),
    []
  )

  function handleTap(event) {
    const { x: tapX } = event.nativeEvent

    selectedStar.setValue(
      ceil(multiply(divide(tapX, rootWidthValue), STAR_COUNT))
    )
  }

  function handleRootLayout(event) {
    const { width: rootWidth } = event.nativeEvent.layout
    rootWidthValue.setValue(rootWidth)
  }

  return (
    <TapGestureHandler onHandlerStateChange={handleTap}>
      <Animated.View style={styles.root} onLayout={handleRootLayout}>
        <PanGestureHandler
          onHandlerStateChange={Animated.event([
            { nativeEvent: { state: gestureState } }
          ])}
          onGestureEvent={Animated.event([{ nativeEvent: { x: touchX } }], {
            useNativeDriver: true
          })}
        >
          <Animated.View style={styles.container}>
            {Array(STAR_COUNT)
              .fill(null)
              .map((_, index) => (
                <RatingStar
                  key={index.toString()}
                  index={index}
                  selectedStar={selectedStar}
                />
              ))}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TapGestureHandler>
  )
}
const styles = StyleSheet.create({
  root: {
    alignSelf: 'center'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default React.memo(EventFeedbackRating)
