import React from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'
import Animated from 'react-native-reanimated'
import NetworkingTool from './NetworkingTool'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { onGestureEvent } from 'react-native-redash'

import SheetHeader, { BORDER_RADIUS } from './SheetHeader'
import NetworkingActiveConnection from './NetworkingActiveConnection'

const {
  useCode,
  cond,
  eq,
  greaterOrEq,
  lessOrEq,
  and,
  or,
  set,
  interpolate,
  block,
  spring,
  Extrapolate,
  Clock,
  startClock,
  stopClock,
  clockRunning,
  call,
  not
} = Animated

const springConfig = {
  damping: 30,
  mass: 1,
  stiffness: 300,
  overshootClamping: true,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001
}

function runSpring(clock, value, dest) {
  const state = {
    finished: new Animated.Value(0),
    velocity: new Animated.Value(0),
    position: new Animated.Value(0),
    time: new Animated.Value(0)
  }

  const config = {
    ...springConfig,
    toValue: new Animated.Value(0)
  }

  return block([
    cond(
      clockRunning(clock),
      [set(config.toValue, dest)],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.velocity, 0),
        set(config.toValue, dest),
        startClock(clock)
      ]
    ),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    set(value, state.position)
  ])
}

interface Props {
  onDismiss: () => void
}

function NetworkingSheet({ onDismiss }: Props) {
  const { height: screenHeight } = Dimensions.get('window')
  const sheetHeight = screenHeight - 120
  const [activeConnection, setActiveConnection] = React.useState(undefined)

  const [clock] = React.useState(new Clock())
  const [gestureY] = React.useState(new Animated.Value(0))
  const [gestureVelocityY] = React.useState(new Animated.Value(0))
  const [gestureState] = React.useState(new Animated.Value(State.UNDETERMINED))

  const [isDismissing] = React.useState(new Animated.Value<1 | 0>(0))
  const [sheetY] = React.useState(new Animated.Value(sheetHeight))

  useCode(
    () =>
      block([
        cond(
          and(
            not(isDismissing),
            eq(gestureState, State.END),
            or(
              greaterOrEq(gestureVelocityY, 500),
              greaterOrEq(gestureY, sheetHeight * 0.72)
            )
          ),
          set(isDismissing, 1)
        ),
        cond(
          and(not(isDismissing), eq(gestureState, State.UNDETERMINED)),
          runSpring(clock, sheetY, 0)
        ),
        cond(
          and(
            not(isDismissing),
            eq(gestureState, State.END),
            lessOrEq(gestureVelocityY, 400)
          ),
          runSpring(clock, sheetY, 0)
        ),
        cond(and(not(isDismissing), eq(gestureState, State.ACTIVE)), [
          stopClock(clock),
          set(
            sheetY,
            interpolate(gestureY, {
              inputRange: [0, sheetHeight],
              outputRange: [0, sheetHeight],
              extrapolateLeft: Extrapolate.CLAMP
            })
          )
        ]),
        cond(isDismissing, [
          runSpring(clock, sheetY, sheetHeight),
          cond(greaterOrEq(sheetY, sheetHeight), [
            stopClock(clock),
            call([], () => onDismiss())
          ])
        ])
      ]),
    [isDismissing]
  )

  function handleOverlayPress() {
    isDismissing.setValue(1)
  }

  const overlayOpacity = sheetY.interpolate({
    inputRange: [0, screenHeight],
    outputRange: [1, 0]
  })

  const gestureHandler = onGestureEvent({
    translationY: gestureY,
    velocityY: gestureVelocityY,
    state: gestureState
  })

  function handleCardScan(nextConnection: Object) {
    setActiveConnection(nextConnection)
  }

  function handleConnectionDismiss() {
    setActiveConnection(undefined)
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      </TouchableWithoutFeedback>
      <PanGestureHandler activeOffsetY={[-10, 10]} {...gestureHandler}>
        <Animated.View
          style={[
            styles.sheet,
            { height: sheetHeight, transform: [{ translateY: sheetY }] }
          ]}
        >
          {activeConnection ? (
            <NetworkingActiveConnection onDismiss={handleConnectionDismiss} />
          ) : (
            <NetworkingTool
              height={sheetHeight}
              onCardScan={handleCardScan}
              onPress={onDismiss}
            />
          )}
          <View style={styles.header}>
            <SheetHeader transparent />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
  sheet: {
    position: 'absolute',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    overflow: 'hidden',
    bottom: 0,
    left: 0,
    right: 0
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  }
})
export default React.memo(NetworkingSheet)
