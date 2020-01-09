import React from 'react'
import { View, Text } from 'react-native'

import AuthHeader from '../components/AuthHeader'

export default function AuthScreen() {
  return <View />
}

AuthScreen.navigationOptions = ({ navigation }) => ({
  header: () => (
    <AuthHeader
      onButtonPress={() => navigation.navigate('App')}
      iconName="close"
    />
  )
})
