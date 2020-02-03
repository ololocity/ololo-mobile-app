import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'

import * as Auth from '../util/auth'
import NavigationService from '../NavigationService'

const AVATAR_SIZE = 48

export default function UserNav() {
  const { isLoggedIn, userData } = Auth.useAuth()
  const insets = useSafeArea()
  const avatarUrl = isLoggedIn ? userData.photoURL : undefined

  // TODO: Show user menu with options
  function handleProfilePress() {
    if (isLoggedIn) {
      Alert.alert('Log Out', 'Are you sure you want to log out?', [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'OK',
          onPress: Auth.logout
        }
      ])
    } else {
      NavigationService.navigate('Auth')
    }
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <TouchableOpacity style={styles.avatar} onPress={handleProfilePress}>
        {avatarUrl ? (
          <Image style={styles.avatarPicture} source={{ uri: avatarUrl }} />
        ) : null}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 100,

    paddingRight: 16
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden',

    backgroundColor: '#333'
  },
  avatarPicture: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    resizeMode: 'cover'
  }
})
