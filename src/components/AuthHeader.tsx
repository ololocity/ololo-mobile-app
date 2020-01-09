import React from 'react'
import {
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity
} from 'react-native'

import SafeAreaView from './SafeAreaView'

export const HEIGHT = Platform.OS === 'ios' ? 80 : 70

const ICONS = {
  back: {
    default: require('../assets/header-left-back.png'),
    dark: require('../assets/header-left-back-dark.png')
  },
  close: {
    default: require('../assets/header-left-close.png'),
    dark: require('../assets/header-left-close-dark.png')
  }
}

interface Props {
  iconName: string
  onButtonPress: () => void
}

export default function AuthHeader({ iconName, onButtonPress }: Props) {
  const iconSrc = ICONS[iconName].default
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.button} onPress={onButtonPress}>
        {iconSrc ? <Image source={iconSrc} /> : null}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: HEIGHT,

    backgroundColor: 'transparent'
  },
  button: {
    padding: 20
  }
})
