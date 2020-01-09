import React from 'react'
import {
  View,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  Text
} from 'react-native'

import AuthHeader, { HEIGHT as HEADER_HEIGHT } from '../components/AuthHeader'
import { colors } from '../util/style'

export default function AuthScreen() {
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

    const showEventName = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
    const hideEventName = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'

    Keyboard.addListener(showEventName, handleKeyboardShow)
    Keyboard.addListener(hideEventName, handleKeyboardHide)

    return function cleanup() {
      Keyboard.removeListener(showEventName, handleKeyboardShow)
      Keyboard.removeListener(hideEventName, handleKeyboardHide)
    }
  }, [])

  function handleSubmitButtonPress() {}

  return (
    <KeyboardAvoidingView
      style={styles.root}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Введите свой номер телефона</Text>
          </View>
          <View>
            <Text style={styles.subTitleText}>Чтобы зарегистрироваться на мероприятие</Text>
          </View>

          <TextInput />
        </View>

        <Animated.View style={[styles.footer, { paddingHorizontal: footerHorizontalPadding, paddingBottom: footerBottomPadding }]}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitButtonPress}>
            <Animated.View
              style={[
                styles.submitButtonContent,
                { borderRadius: buttonRadius, height: buttonHeight }
              ]}
            >
              <Text style={styles.submitButtonText}>Войти</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  )
}

AuthScreen.navigationOptions = ({ navigation }) => ({
  headerTransparent: true,
  header: () => (
    <AuthHeader
      onButtonPress={() => navigation.navigate('App')}
      iconName="close"
    />
  )
})

const styles = StyleSheet.create({
  root: {
    flex: 1,

    paddingTop: HEADER_HEIGHT
  },
  wrapper: {
    flex: 1
  },
  content: {
    flex: 1,

    paddingHorizontal: 16
  },
  title: {
    marginBottom: 16
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 23
  },
  subTitleText: {
    fontSize: 13
  },
  footer: {
    flexDirection: 'row'
  },
  submitButton: {
    flex: 1
  },
  submitButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#2F80ED'
  },
  submitButtonText: {
    textAlign: 'center',

    fontWeight: 'bold',
    fontSize: 16,

    color: colors.white
  }
})
