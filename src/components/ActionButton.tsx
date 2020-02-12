import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType
} from 'react-native'
import { colors } from '../util/style'

interface Props {
  label: string
  onPress: () => void
  color?: string
  iconSource?: ImageSourcePropType
  textColor?: string
}

export default function ActionButton({
  onPress,
  label,
  color = colors.blue,
  iconSource,
  textColor = colors.white
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.root, { backgroundColor: color }]}
      onPress={onPress}
    >
      {iconSource ? <Image style={styles.icon} source={iconSource} /> : null}
      <Text style={[styles.labelText, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 49,
    borderRadius: 24,
    justifyContent: 'space-between'
  },
  icon: {
    marginRight: 16
  },
  labelText: {
    textAlign: 'center',

    fontSize: 16,
    fontWeight: 'bold',

    color: colors.white
  }
})
