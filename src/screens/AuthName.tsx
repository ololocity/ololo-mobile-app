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
import AuthButton from '../components/AuthButton'
import { colors } from '../util/style'

import i18n from '../localization'

export default function AuthNameScreen() {
  const colorScheme = useColorScheme()

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
                {i18n.t('authNameScreen.title')}
              </Text>
            </View>
            <View>
              <Text
                style={[
                  styles.subTitleText,
                  colorScheme === 'dark' && styles.titleTextDark
                ]}
              >
                {i18n.t('authNameScreen.subTitle')}
              </Text>
            </View>
          </View>

          <TextInput
            label={i18n.t('authNameScreen.nameInputLabel')}
          />
        </View>

        <View style={styles.footer}>
          <AuthButton
            onPress={handleSubmitButtonPress}
            label={i18n.t('authNameScreen.next')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

AuthNameScreen.navigationOptions = ({ navigation }) => ({
  headerTransparent: true,
  header: () => (
    <AuthHeader
      onButtonPress={() => navigation.goBack()}
      iconName="back"
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
    flexDirection: 'row'
  }
})
