import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance'
import { ApolloProvider } from '@apollo/react-hooks'

import AppLoading from './src/screens/AppLoading'
import Onboarding from './src/screens/Onboarding'
import EventFeed from './src/screens/EventFeed'
import Auth from './src/screens/Auth'
import AuthName from './src/screens/AuthName'

import NavigationService from './src/NavigationService'
import { client } from './src/util/db'

const AuthStack = createStackNavigator({ Auth, AuthName })
const AppStack = createStackNavigator({ EventFeed }, { headerMode: 'none' })

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AppLoading,
      Onboarding,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Onboarding'
    }
  )
)

export default function App() {
  const theme = useColorScheme()

  return (
    <AppearanceProvider>
      <ApolloProvider {...{ client }}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
          {...{ theme }}
        />
      </ApolloProvider>
    </AppearanceProvider>
  )
}
