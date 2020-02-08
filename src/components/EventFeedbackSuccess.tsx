import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import i18n from '../localization'
import { colors } from '../util/style'

const doneIconSrc = require('../assets/event-feedback-success-icon.png')

function EventFeedbackSuccess() {
  return (
    <View style={styles.root}>

      <View style={styles.title}><Text style={styles.titleText}>{i18n.t('eventFeedback.success.title')}</Text></View>

      <Image source={doneIconSrc} />

      <View style={styles.description}><Text style={styles.descriptionText}>{i18n.t('eventFeedback.success.description')}</Text></View>

    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 42
  },
  titleText: {
    textAlign: 'center',

    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 40,

    color: colors.white
  },
  descriptionText: {
    textAlign: 'center',

    fontSize: 23,
    lineHeight: 27,

    color: colors.white
  },
  title: {
    paddingBottom: 75
  },
  description: {
    paddingTop: 75
  }
})

export default React.memo(EventFeedbackSuccess)
