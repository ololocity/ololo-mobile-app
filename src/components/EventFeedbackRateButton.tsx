import React from 'react'
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'

import { colors } from '../util/style'
import i18n from '../localization'

const buttonImgSrc = require('../assets/event-fb-btn-icon.png')

export const HEIGHT = 88

interface Props {
  onPress: () => void
}

export default function EventFeedbackRateButton({ onPress }: Props) {
  const insets = useSafeArea()

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom - 15 }]}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image source={buttonImgSrc} />
        <Text style={styles.labelText}>
          {i18n.t('eventFeedback.rateButton.label')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: HEIGHT
  },
  container: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelText: {
    marginLeft: 20,

    fontSize: 23,
    fontWeight: 'bold',

    color: colors.white
  }
})
