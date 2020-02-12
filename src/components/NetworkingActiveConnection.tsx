import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import ActionButton from './ActionButton'
import NetworkingAboutContact from './NetworkingAboutContact'
import { colors } from '../util/style'

import i18n from '../localization'

interface Props {
  onDismiss: () => void
  onCloseButtonPress: () => void
}

const backIconSrc = require('../assets/header-left-back-dark.png')
const addMoreIconSrc = require('../assets/networking-active-connection-add-more.png')
export default function NetworkingActiveConnection({
  onDismiss,
  onCloseButtonPress
}: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onCloseButtonPress}>
          <Image style={styles.headerIcon} source={backIconSrc} />
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {i18n.t('networking.activeConnection.title')}
        </Text>
      </View>
      <NetworkingAboutContact />
      <View style={styles.footer}>
        <ActionButton
          label={i18n.t('networking.activeConnection.addMore')}
          onPress={onDismiss}
          color={colors.yellow}
          iconSource={addMoreIconSrc}
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
    paddingVertical: 34,
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
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 32,
    right: 0,
    left: 0
  }
})
