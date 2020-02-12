import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { colors } from '../util/style'

const checkedIconSrc = require('../assets/networking-active-connection-checked-icon.png')
const phoneIconSrc = require('../assets/networking-active-connection-phone-icon.png')
const emailIconSrc = require('../assets/networking-active-connection-email-icon.png')
const AVATAR_SIZE = 60

export default function NetworkingAboutContact() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Image style={styles.avatarPicture} />
        </View>
        <Text style={styles.fullName}>Константин Соколов</Text>
        <Image source={checkedIconSrc} />
      </View>
      <View style={styles.contactDetails}>
        <Image style={styles.contactDetailsIcon} source={phoneIconSrc} />
        <Text style={styles.contactDetailsText}>0755755855</Text>
      </View>
      <View style={styles.contactDetails}>
        <Image style={styles.contactDetailsIcon} source={emailIconSrc} />
        <Text style={styles.contactDetailsText}>sokolov@gmail.com</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  root: {},
  container: {
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
    overflow: 'hidden',
    backgroundColor: '#333'
  },
  avatarPicture: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    resizeMode: 'cover'
  },
  fullName: {
    fontSize: 24,
    lineHeight: 28,
    color: colors.white,
    fontWeight: 'bold',
    width: 200
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
