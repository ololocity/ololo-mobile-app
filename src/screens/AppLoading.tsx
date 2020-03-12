import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import * as Auth from '../util/auth'
import * as Store from '../util/store'

export default function AppLoading() {
  const navigation = useNavigation()
  const { isLoggedIn } = Auth.useAuth()

  React.useEffect(() => {
    async function performRedirect() {
      let shouldSkipOnboarding = false

      try {
        shouldSkipOnboarding = await Store.get('@ololo/skip-onboarding')
      } catch (error) {
        console.log(error)
      }

      if (!shouldSkipOnboarding) return navigation.navigate('Onboarding')

      navigation.navigate(isLoggedIn ? 'App' : 'Auth')
    }

    performRedirect()
  }, [isLoggedIn])

  return (
    <View style={styles.root}>
      <ActivityIndicator style={styles.indicator} size="large" />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  indicator: {
    ...StyleSheet.absoluteFillObject
  }
})
