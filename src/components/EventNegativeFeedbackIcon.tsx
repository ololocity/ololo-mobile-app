import React from 'react'
import { StyleSheet, View, Image, ImageSourcePropType } from 'react-native'
import MaskedView from '@react-native-community/masked-view'

import { colors } from '../util/style'

const SIZE = 24

interface Props {
  source: ImageSourcePropType
  isActive: boolean
}

export default function EventNegativeFeedbackIcon({ source, isActive }: Props) {
  return (
    <MaskedView
      style={styles.root}
      maskElement={
        <Image source={source} style={styles.icon} resizeMode="contain" />
      }
    >
      <View style={[styles.content, isActive && styles.contentActive]} />
    </MaskedView>
  )
}

const styles = StyleSheet.create({
  root: {
    width: SIZE,
    height: SIZE,
    marginRight: 32
  },
  icon: {
    width: SIZE,
    height: SIZE
  },
  content: {
    flex: 1,

    backgroundColor: colors.white
  },
  contentActive: {
    backgroundColor: colors.yellow
  }
})
