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
import { Linking } from 'expo'

import AuthHeader, { HEIGHT as HEADER_HEIGHT } from '../components/AuthHeader'
import ActionButton from '../components/ActionButton'

import useLinkingEffect from '../hooks/useLinkingEffect'
import { colors } from '../util/style'
import * as Auth from '../util/auth'

import i18n from '../localization'

export default function AuthCheckEmailScreen() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()

  const handleLinkingEvent = React.useCallback(url => {
    let { queryParams } = Linking.parse(url)

    if (typeof queryParams.link === 'string') {
      Auth.confirmEmailWithLink(navigation.getParam('email'), queryParams.link)
    }
  }, [])
  useLinkingEffect(handleLinkingEvent)

  function handleButtonPress() {
    return true
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
                  {i18n.t('authCheckEmailScreen.title')}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.subTitleText,
                    colorScheme === 'dark' && styles.titleTextDark
                  ]}
                >
                  {i18n.t('authCheckEmailScreen.subTitle')}
                </Text>
              </View>
            </View>
            <View>
              <ActionButton
                onPress={handleButtonPress}
                label={i18n.t('authCheckEmailScreen.checkEmail')}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  )
}

AuthCheckEmailScreen.navigationOptions = ({ navigation }) => ({
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
    justifyContent: 'center',
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
  }
})
