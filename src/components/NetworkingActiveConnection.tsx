import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import ActionButton from './ActionButton'

import { colors } from '../util/style'

import i18n from '../localization'

import NavigationService from '../NavigationService'
interface Props {
  onDismiss: () => void
  onCloseButtonPress: () => void
}

const backIconSrc = require('../assets/header-left-back-dark.png')
const checkedIconSrc = require('../assets/networking-active-connection-checked-icon.png')
const phoneIconSrc = require('../assets/networking-active-connection-phone-icon.png')
const emailIconSrc = require('../assets/networking-active-connection-email-icon.png')

const AVATAR_SIZE = 60

export default function NetworkingActiveConnection({
  onDismiss,
  onCloseButtonPress
}: Props) {
  function handleBackButtonPress() {
    NavigationService.navigate('EventFeed')
  }
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onCloseButtonPress}>
            <Image style={styles.headerIcon} source={backIconSrc} />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {i18n.t('networking.activeConnection.title')}
          </Text>
        </View>
        <View style={styles.aboutUser}>
          <View style={styles.avatar}>
            <Image style={styles.avatarPicture} />
          </View>
          <Text style={styles.userFullName}>Константин Соколов</Text>
          <Image source={checkedIconSrc} />
        </View>
        <View style={styles.userContactDetails}>
          <Image style={styles.userContactDetailsIcon} source={phoneIconSrc} />
          <Text style={styles.userContactDetailsText}>0755755855</Text>
        </View>
        <View style={styles.userContactDetails}>
          <Image style={styles.userContactDetailsIcon} source={emailIconSrc} />
          <Text style={styles.userContactDetailsText}>sokolov@gmail.com</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <ActionButton
          label={i18n.t('networking.activeConnection.addMore')}
          onPress={onDismiss}
          color={colors.yellow}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.blue
  },
  content: {
    flex: 1,
    paddingVertical: 24
  },
  header: {
    paddingBottom: 34,
    flexDirection: 'row',
    alignItems: 'center',
    top: 0
  },
  headerIcon: {
    marginRight: 20
  },
  headerText: {
    fontSize: 20,
    lineHeight: 32,
    letterSpacing: 0.5,
    color: colors.white,
    fontWeight: '500'
  },
  aboutUser: {
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
  userFullName: {
    fontSize: 24,
    lineHeight: 28,
    color: colors.white,
    fontWeight: 'bold',
    width: 200
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 32
  },
  userContactDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  userContactDetailsText: {
    fontSize: 14,
    lineHeight: 16,
    color: colors.white
  },
  userContactDetailsIcon: {
    marginRight: 19
  }
})
