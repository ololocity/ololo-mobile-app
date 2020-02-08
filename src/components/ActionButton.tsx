import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { colors } from '../util/style'

interface Props {
  label: string
  onPress: () => void
  color?: string
}

export default function ActionButton({ onPress, label, color = colors.blue }: Props) {
  return (
    <TouchableOpacity
      style={[styles.root, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.labelText}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    paddingHorizontal: 49,
    borderRadius: 24
  },
  labelText: {
    textAlign: 'center',

    fontSize: 16,
    fontWeight: 'bold',

    color: colors.white
  }
})
