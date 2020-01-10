import React from 'react'
import {
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  Platform,
  Keyboard
} from 'react-native'

import { colors } from '../util/style'

interface Props {
  onPress: () => void
  label: string
  disabled?: boolean
}

export default function AuthButton({ onPress, label, disabled }: Props) {
  const [keyboardAnimValue] = React.useState(new Animated.Value(0))
  const buttonRadius = keyboardAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0]
  })
  const footerHorizontalPadding = keyboardAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 0]
  })
  const footerBottomPadding = keyboardAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0]
  })
  const buttonHeight = keyboardAnimValue.interpolate({
    inputRange: [0, 1],
    outputRange: [48, 62]
  })

  React.useEffect(() => {
    function handleKeyboardShow() {
      Animated.spring(keyboardAnimValue, { toValue: 1 }).start()
    }

    function handleKeyboardHide() {
      Animated.spring(keyboardAnimValue, { toValue: 0 }).start()
    }

    const showEventName =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEventName =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    Keyboard.addListener(showEventName, handleKeyboardShow)
    Keyboard.addListener(hideEventName, handleKeyboardHide)

    return function cleanup() {
      Keyboard.removeListener(showEventName, handleKeyboardShow)
      Keyboard.removeListener(hideEventName, handleKeyboardHide)
    }
  }, [])

  return (
    <Animated.View
      style={[
        styles.root,
        {
          paddingHorizontal: footerHorizontalPadding,
          paddingBottom: footerBottomPadding
        }
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        {...{ disabled }}
      >
        <Animated.View
          style={[
            styles.content,
            disabled && styles.contentDisabled,
            { borderRadius: buttonRadius, height: buttonHeight }
          ]}
        >
          <Text style={styles.labelText}>{label}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    flexDirection: 'row'
  },
  button: {
    flex: 1
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(47,128,237,1)'
  },
  contentDisabled: {
    backgroundColor: 'rgba(47,128,237,.3)'
  },
  labelText: {
    textAlign: 'center',

    fontWeight: 'bold',
    fontSize: 16,

    color: colors.white
  }
})
