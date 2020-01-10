import React from 'react'
import {
  View,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'

import AuthHeader, { HEIGHT as HEADER_HEIGHT } from '../components/AuthHeader'
import TextInput from '../components/TextInput'
import { colors } from '../util/style'

import i18n from '../localization'

export default function AuthScreen() {
  const colorScheme = useColorScheme()
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

  function handleSubmitButtonPress() {
    Keyboard.dismiss()
  }

  return (
    <KeyboardAvoidingView
      style={[styles.root, colorScheme === 'dark' && styles.rootDark]}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.title}>
              <Text
                style={[
                  styles.titleText,
                  colorScheme === 'dark' && styles.titleTextDark
                ]}
              >
                {i18n.t('authScreen.title')}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.subTitleText,
                  colorScheme === 'dark' && styles.titleTextDark
                ]}
              >
                {i18n.t('authScreen.subTitle')}
              </Text>
            </View>
          </View>

          <TextInput
            label={i18n.t('authScreen.phoneInputLabel')}
            inputProps={{ placeholder: '+996', keyboardType: 'phone-pad' }}
          />
        </View>

        <Animated.View
          style={[
            styles.footer,
            {
              paddingHorizontal: footerHorizontalPadding,
              paddingBottom: footerBottomPadding
            }
          ]}
        >
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitButtonPress}
          >
            <Animated.View
              style={[
                styles.submitButtonContent,
                { borderRadius: buttonRadius, height: buttonHeight }
              ]}
            >
              <Text style={styles.submitButtonText}>
                {i18n.t('authScreen.logIn')}
              </Text>
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

    paddingTop: HEADER_HEIGHT,

    backgroundColor: colors.white
  },
  rootDark: {
    backgroundColor: 'transparent'
  },
  wrapper: {
    flex: 1
  },
  content: {
    flex: 1,

    paddingHorizontal: 16
  },
  header: {
    marginBottom: 24
  },
  title: {
    marginBottom: 16
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 23
  },
  titleTextDark: {
    color: colors.white
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
