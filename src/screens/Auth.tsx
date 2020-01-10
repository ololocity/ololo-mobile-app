import React from 'react'
import {
  View,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  Text
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'

import AuthHeader, { HEIGHT as HEADER_HEIGHT } from '../components/AuthHeader'
import TextInput from '../components/TextInput'
import AuthButton from '../components/AuthButton'
import { colors } from '../util/style'

import i18n from '../localization'

export default function AuthScreen() {
  const colorScheme = useColorScheme()
  const inputRef = React.useRef()
  const [isInputFocused, setInputFocusState] = React.useState(false)

  function handleInputFocus() {
    setInputFocusState(true)
  }

  function handleInputBlur() {
    setInputFocusState(false)
  }

  function handleSubmitButtonPress() {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
              inputRef={inputRef}
              inputProps={{ placeholder: '+996', keyboardType: 'phone-pad' }}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </View>

          <View style={styles.footer}>
            <AuthButton
              onPress={handleSubmitButtonPress}
              label={
                isInputFocused
                  ? i18n.t('authScreen.next')
                  : i18n.t('authScreen.logIn')
              }
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  }
})
