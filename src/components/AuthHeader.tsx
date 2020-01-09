import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'

import SafeAreaView from './SafeAreaView'

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
  iconName: string,
  onButtonPress: () => void
}

export default function AuthHeader({ iconName, onButtonPress }: Props) {
  const iconSrc = ICONS[iconName].default
  return (
    <View>
      <SafeAreaView>
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          {iconSrc ? (
            <Image source={iconSrc} />
          ) : null}
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}


const styles = StyleSheet.create({
  button: {
    padding: 20
  }
})
