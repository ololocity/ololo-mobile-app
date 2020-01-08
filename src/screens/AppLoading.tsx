import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

export default function AppLoading() {
  const navigation = useNavigation()

  React.useEffect(() => {
    navigation.navigate('Onboarding')
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
