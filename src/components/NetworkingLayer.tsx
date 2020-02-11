import React from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import Animated, { Extrapolate } from 'react-native-reanimated'
import ActionButton from './ActionButton'
import NetworkingTool from './NetworkingTool'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { onGestureEvent, spring } from 'react-native-redash'

import i18n from '../localization'
import SheetHeader, { BORDER_RADIUS } from './SheetHeader'
import NetworkingActiveConnection from './NetworkingActiveConnection'

const { useCode, cond, eq, set, interpolate, block, onChange } = Animated

function NetworkingLayer() {
  const { height: screenHeight } = Dimensions.get('window')
  const [isActive, setActiveState] = React.useState(false)
  const [activeConnection, setActiveConnection] = React.useState(undefined)
  const insets = useSafeArea()
  const [gestureY] = React.useState(new Animated.Value(0))
  const [gestureState] = React.useState(new Animated.Value(State.UNDETERMINED))

  const [sheetY] = React.useState(new Animated.Value(0))

  const sheetHeight = screenHeight - 120

  useCode(
    () =>
      block([
        onChange(
          gestureState,
          cond(
            eq(gestureState, State.END),
            set(sheetY, spring({ from: gestureY, to: 0 }))
          )
        ),
        cond(
          eq(gestureState, State.ACTIVE),
          set(
            sheetY,
            interpolate(gestureY, {
              inputRange: [0, sheetHeight],
              outputRange: [0, sheetHeight],
              extrapolateLeft: Extrapolate.CLAMP
            })
          )
        )
      ]),
    []
  )

  function handleButtonPress() {
    setActiveState(true)
  }

  const overlayOpacity = gestureY.interpolate({
    inputRange: [0, screenHeight],
    outputRange: [1, 0]
  })

  const gestureHandler = onGestureEvent({
    translationY: gestureY,
    state: gestureState
  })

  function handleCardScan(nextConnection: Object) {
    setActiveConnection(nextConnection)
  }

  function handleConnectionDismiss() {
    setActiveConnection(undefined)
  }
  function handleClosePress() {
    setActiveState(false), setActiveConnection(undefined)
  }

  return isActive ? (
    <>
      <TouchableWithoutFeedback onPress={handleClosePress}>
        <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
      </TouchableWithoutFeedback>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.sheet,
            { height: sheetHeight, transform: [{ translateY: sheetY }] }
          ]}
        >
          {activeConnection ? (
            <NetworkingActiveConnection
              onDismiss={handleConnectionDismiss}
              onCloseButtonPress={handleClosePress}
            />
          ) : (
            <NetworkingTool
              height={sheetHeight}
              onCardScan={handleCardScan}
              onPress={handleClosePress}
            />
          )}
          <View style={styles.header}>
            <SheetHeader transparent />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </>
  ) : (
    <View style={[styles.buttonContainer, { bottom: insets.bottom }]}>
      <ActionButton
        onPress={handleButtonPress}
        label={i18n.t('networking.actionButton')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,

    flexDirection: 'row',
    justifyContent: 'center'
  },
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
export default React.memo(NetworkingLayer)
