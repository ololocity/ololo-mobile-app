import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Animated
} from 'react-native'
import * as Haptics from 'expo-haptics'

import SafeAreaView from './SafeAreaView'
import i18n from '../localization'

import { colors } from '../util/style'

interface Props {
  eventId: string
  previewAnimValue: Animated.Value
}

export default function EventSignUpButton({ previewAnimValue }: Props) {
  const [isSignedUp, setSignedUpState] = React.useState(false)
  const translateY = previewAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0]
  })

  function handlePress() {
    setSignedUpState(!isSignedUp)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }

  return (
    <Animated.View style={[styles.root, { transform: [{ translateY }] }]}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={[styles.button, isSignedUp && styles.buttonSignedUp]}
          onPress={handlePress}
        >
          <Text style={styles.labelText}>
            {i18n.t(isSignedUp ? 'eventFeed.signedUp' : 'eventFeed.signUp')}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0
  },
  container: {},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 24,

    backgroundColor: colors.blue
  },
  buttonSignedUp: {
    backgroundColor: colors.green
  },
  labelText: {
    textAlign: 'center',

    fontSize: 16,
    fontWeight: 'bold',

    color: colors.white
  }
})
