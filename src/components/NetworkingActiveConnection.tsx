import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'

import ActionButton from './ActionButton'
import NetworkingContactInfo from './NetworkingContactInfo'

import { colors } from '../util/style'

import i18n from '../localization'

const DEFAULT_BUTTON_BOTTOM_MARGIN = 16

const FAKE_CONNECTION = {
  photoURL:
    'https://images.unsplash.com/photo-1524150224918-8a8eded72c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&h=300&q=80',
  fullName: 'Константин Соколов',
  phoneNumber: '+996755755855',
  email: 'sokolov@gmail.com'
}

interface Props {
  onDismiss: () => void
}

const backIconSrc = require('../assets/header-left-back-dark.png')
const addMoreIconSrc = require('../assets/networking-active-connection-add-more.png')

export default function NetworkingActiveConnection({ onDismiss }: Props) {
  const insets = useSafeArea()
  const connection = FAKE_CONNECTION

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onDismiss}>
          <Image style={styles.headerIcon} source={backIconSrc} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {i18n.t('networking.activeConnection.title')}
        </Text>
      </View>
      <View style={styles.content}>
        <NetworkingContactInfo
          fullName={connection.fullName}
          photoURL={connection.photoURL}
          phoneNumber={connection.phoneNumber}
          email={connection.email}
        />
      </View>
      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom || DEFAULT_BUTTON_BOTTOM_MARGIN }
        ]}
      >
        <ActionButton
          label={i18n.t('networking.activeConnection.addMore')}
          onPress={onDismiss}
          color={colors.yellow}
          iconSource={addMoreIconSrc}
          textColor={colors.black}
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
    flex: 1
  },
  header: {
    paddingVertical: 34,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerIcon: {
    marginRight: 20
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 32,
    letterSpacing: 0.5,

    color: colors.white
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
