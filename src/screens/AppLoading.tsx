import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import * as Store from '../util/store'

export default function AppLoading() {
  const navigation = useNavigation()

  React.useEffect(() => {
    async function performRedirect() {
      let shouldSkipOnboarding = false

      try {
        // Temporary switch off shouldSkipOnboarding check for development
        // shouldSkipOnboarding = await Store.get('@ololo/skip-onboarding')
      } catch (error) {
        console.log(error)
      }

      navigation.navigate(shouldSkipOnboarding ? 'Auth' : 'Onboarding')
    }

    performRedirect()
  }, [])

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
