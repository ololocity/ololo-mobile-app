import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'

import ActionButton from './ActionButton'
import NetworkingTool from './NetworkingTool'

import i18n from '../localization'
import SheetHeader, { BORDER_RADIUS } from './SheetHeader'
import NetworkingActiveConnection from './NetworkingActiveConnection'

export default function NetworkingLayer() {
  const { height: screenHeight } = Dimensions.get('window')
  const [isActive, setActiveState] = React.useState(false)
  const [activeConnection, setActiveConnection] = React.useState(undefined)
  const insets = useSafeArea()
  const sheetHeight = screenHeight - 120

  function handleButtonPress() {
    setActiveState(true)
  }

  function handleCardScan(nextConnection: Object) {
    setActiveConnection(nextConnection)
  }

  function handleConnectionDismiss() {
    setActiveConnection(undefined)
  }
  function handleCloseButtonPress() {
    setActiveState(false), setActiveConnection(undefined)
  }

  return isActive ? (
    <View style={styles.overlay}>
      <View style={[styles.sheet, { height: sheetHeight }]}>
        {activeConnection ? (
          <NetworkingActiveConnection
            onDismiss={handleConnectionDismiss}
            onCloseButtonPress={handleCloseButtonPress}
          />
        ) : (
          <NetworkingTool height={sheetHeight} onCardScan={handleCardScan} />
        )}
        <View style={styles.header}>
          <SheetHeader transparent />
        </View>
      </View>
    </View>
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
    justifyContent: 'flex-end',

    backgroundColor: 'rgba(0,0,0,0.75)'
  },
  sheet: {
    position: 'relative',
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    overflow: 'hidden'
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  }
})
