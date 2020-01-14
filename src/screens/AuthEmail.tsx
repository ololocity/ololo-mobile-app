import React from 'react'
import {
  View,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  Text,
  Switch
} from 'react-native'
import { useColorScheme } from 'react-native-appearance'

import AuthHeader, { HEIGHT as HEADER_HEIGHT } from '../components/AuthHeader'
import TextInput from '../components/TextInput'
import AuthButton from '../components/AuthButton'
import { colors, uiColors } from '../util/style'

import i18n from '../localization'

export default function AuthEmailScreen() {
  const colorScheme = useColorScheme()
  const [isSubscribed, setSubscribedState] = React.useState(false)

  function handleSubmitButtonPress() {
    Keyboard.dismiss()
  }

  function handleSubscribeValueChange(value) {
    setSubscribedState(value)
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
                  {i18n.t('authEmailScreen.title')}
                </Text>
              </View>
              <View>
                <Text
                  style={[
                    styles.subTitleText,
                    colorScheme === 'dark' && styles.titleTextDark
                  ]}
                >
                  {i18n.t('authEmailScreen.subTitle')}
                </Text>
              </View>
            </View>

            <TextInput
              label={i18n.t('authEmailScreen.emailInputLabel')}
              inputProps={{ keyboardType: 'email-address' }}
            />

            <View style={styles.subscriptionWrapper}>
              <Text
                style={[
                  styles.subscribeText,
                  colorScheme === 'dark' && styles.subscribeTextDark
                ]}
              >
                {i18n.t('authEmailScreen.subscribeText')}
              </Text>

              <Switch
                onValueChange={handleSubscribeValueChange}
                value={isSubscribed}
                thumbColor={
                  isSubscribed ? uiColors.switch.thumbEnabled : undefined
                }
                trackColor={uiColors.switch.track}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.footer}>
          <AuthButton
            onPress={handleSubmitButtonPress}
            disabled
            label={i18n.t('authEmailScreen.finish')}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

AuthEmailScreen.navigationOptions = ({ navigation }) => ({
  headerTransparent: true,
  header: () => (
    <AuthHeader onButtonPress={() => navigation.goBack()} iconName="back" />
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
  subscribeText: {
    fontSize: 13
  },
  subscribeTextDark: {
    color: colors.white
  },
  subscriptionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footer: {
    flexDirection: 'row'
  }
})
