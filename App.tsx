import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import AppLoading from './src/screens/AppLoading'
import Onboarding from './src/screens/Onboarding'
import EventFeed from './src/screens/EventFeed'
import Auth from './src/screens/Auth'

const AppStack = createStackNavigator({ EventFeed })
const AuthStack = createStackNavigator({ Auth })

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AppLoading,
      Onboarding,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AppLoading',
    },
  ),
);

export default function App() {
  return (
    <AppContainer />
  );
}
