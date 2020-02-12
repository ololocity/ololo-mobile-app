import React from 'react'
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'

import { colors } from '../util/style'

const checkedIconSrc = require('../assets/networking-active-connection-checked-icon.png')
const phoneIconSrc = require('../assets/networking-active-connection-phone-icon.png')
const emailIconSrc = require('../assets/networking-active-connection-email-icon.png')

const AVATAR_SIZE = 60

interface Props {
  fullName: string
  photoURL: string
  phoneNumber: string
  email: string
}

export default function NetworkingContactInfo({
  fullName,
  photoURL,
  phoneNumber,
  email
}: Props) {
  function handlePhonePress() {}

  function handleEmailPress() {}

  return (
    <>
      <View style={styles.header}>
        {photoURL ? (
          <View style={styles.avatar}>
            <Image source={{ uri: photoURL }} style={styles.avatarPicture} />
          </View>
        ) : null}
        <Text numberOfLines={2} style={styles.fullName}>
          {fullName}
        </Text>
        <Image source={checkedIconSrc} />
      </View>
      <TouchableOpacity
        onPress={handlePhonePress}
        style={styles.contactDetails}
      >
        <Image style={styles.contactDetailsIcon} source={phoneIconSrc} />
        <Text style={styles.contactDetailsText}>{phoneNumber}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleEmailPress}
        style={styles.contactDetails}
      >
        <Image style={styles.contactDetailsIcon} source={emailIconSrc} />
        <Text style={styles.contactDetailsText}>{email}</Text>
      </TouchableOpacity>
    </>
  )
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.5)',
    paddingBottom: 26,
    marginBottom: 18
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    marginRight: 19,
    overflow: 'hidden',

    backgroundColor: '#333'
  },
  avatarPicture: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    resizeMode: 'cover'
  },
  fullName: {
    flex: 1,

    paddingRight: 60,

    fontSize: 24,
    lineHeight: 28,
    fontWeight: 'bold',

    color: colors.white
  },
  contactDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  contactDetailsText: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.white
  },
  contactDetailsIcon: {
    marginRight: 19
  }
})
