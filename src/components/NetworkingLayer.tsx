import React from 'react'
import {
  StyleSheet,
  View
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'

import ActionButton from './ActionButton'
import NetworkingSheet from './NetworkingSheet'
import NetworkingTool from './NetworkingTool'

import i18n from '../localization'
function NetworkingLayer() {
  const [isActive, setActiveState] = React.useState(false)
  const insets = useSafeArea()

  function handleButtonPress() {
    setActiveState(true)
  }

  function handleSheetDismiss() {
    setActiveState(false)
  }

  return isActive ? (
    <NetworkingSheet onDismiss={handleSheetDismiss} />
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
})

export default React.memo(NetworkingLayer)
