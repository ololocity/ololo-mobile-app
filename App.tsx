import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import AppLoading from './src/screens/AppLoading'
import Onboarding from './src/screens/Onboarding'
import EventFeed from './src/screens/EventFeed'
import Auth from './src/screens/Auth'
import { colors } from './src/util/style'

const stackNavigatorConfig = {
  defaultNavigationOptions: { cardStyle: { backgroundColor: colors.white } }
}

const AuthStack = createStackNavigator({ Auth }, stackNavigatorConfig)
const AppStack = createStackNavigator({ EventFeed }, { ...stackNavigatorConfig, headerMode: 'none' })

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AppLoading,
      Onboarding,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
)

export default function App() {
  return <AppContainer />
}
