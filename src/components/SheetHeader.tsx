import React from 'react'
import { View, StyleSheet } from 'react-native'

import { colors } from '../util/style'

const DRAG_INDICATOR_HEIGHT = 4
export const BORDER_RADIUS = 20
export const HEIGHT = BORDER_RADIUS + DRAG_INDICATOR_HEIGHT

interface Props {
  transparent: boolean
}

export default function SheetHeader({ transparent }: Props) {
  return (
    <View style={[styles.root, transparent && styles.rootTransparent]}>
      <View style={styles.indicator} />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: HEIGHT,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',

    backgroundColor: colors.blue
  },
  rootTransparent: {
    backgroundColor: 'transparent'
  },
  indicator: {
    width: 40,
    height: DRAG_INDICATOR_HEIGHT,
    borderRadius: 5,
    backgroundColor: colors.white,
    opacity: 0.65
  }
})
