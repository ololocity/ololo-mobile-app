import React from 'react'
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  TextInput as RNTextInput,
  Text
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'
import { useNavigation } from 'react-navigation-hooks'

import AuthHeader, { HEIGHT as HEADER_HEIGHT } from '../components/AuthHeader'
import TextInput from '../components/TextInput'
import FacebookAuthButton from '../components/FacebookAuthButton'
import AuthButton from '../components/AuthButton'
import { colors } from '../util/style'
import * as Auth from '../util/auth'

import i18n from '../localization'

export default function AuthScreen() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  const inputRef = React.useRef<RNTextInput>()
  const [isInputFocused, setInputFocusState] = React.useState(false)
  const [email, setEmail] = React.useState('')

  function handleInputFocus() {
    setInputFocusState(true)
  }

  function handleInputBlur() {
    setInputFocusState(false)
  }

  function handleInputChange(nextValue) {
    setEmail(nextValue)
  }

  function handleSubmitButtonPress() {
    if (email) {
      Auth.loginWithEmail(email)
      return navigation.navigate('AuthCheckEmail', { email })
    }

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <KeyboardAvoidingView
      style={[styles.root, colorScheme === 'dark' && styles.rootDark]}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              label={i18n.t('authScreen.emailInputLabel')}
              inputRef={inputRef}
              inputProps={{ keyboardType: 'email-address' }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.footer}>
          <View style={styles.fbAuthButtonWrapper}>
            <FacebookAuthButton />
          </View>
          <AuthButton
            onPress={handleSubmitButtonPress}
            disabled={isInputFocused && !email}
            label={
              isInputFocused
                ? i18n.t('authScreen.next')
                : i18n.t('authScreen.logIn')
            }
          />
        </View>
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
    backgroundColor: colors.black
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
    position: 'relative',
    flexDirection: 'row'
  },
  fbAuthButtonWrapper: {
    position: 'absolute',
    top: -64,
    left: 16,
    right: 16
  }
})
