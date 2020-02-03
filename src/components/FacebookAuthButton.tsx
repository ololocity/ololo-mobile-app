import React from 'react'
import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

import * as Auth from '../util/auth'

import i18n from '../localization'

const iconSource = require('../assets/facebook-login.png')

export default function FacebookAuthButton() {
  function handlePress() {
    Auth.loginWithFacebook()
  }

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Image style={styles.icon} source={iconSource} />
      <Text style={styles.labelText}>{i18n.t('authScreen.fbAuth')}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,

    borderColor: '#395185',
    borderWidth: 0.5,
    borderRadius: 24
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 14
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',

    color: '#395185'
  }
})
