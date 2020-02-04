import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg from 'react-native-svg'
import { colors } from '../util/style'

export default function EventFeedBackRating() {
  return <View style={styles.root}></View>
}
const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    flexDirection: 'row',
    marginTop: 16
  }
})
