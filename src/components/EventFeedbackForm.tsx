import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'

import EventFeedbackStarRating from './EventFeedbackStarRating'

import { colors } from '../util/style'
import i18n from '../localization'

interface Props {
  title: string
  onSubmit: (values: Object) => void
  onDismiss: () => void
}

export default function EventFeedbackForm({
  title,
  onSubmit,
  onDismiss
}: Props) {
  const insets = useSafeArea()
  const [rating, setRating] = React.useState(undefined)

  function handleRatingChange(nextRating) {
    setRating(nextRating)
  }

  return (
    <>
      <View style={styles.content}>
        <View style={styles.eventTitle}>
          <Text style={styles.eventTitleText} numberOfLines={3}>
            {title}
          </Text>
        </View>
        <View style={styles.rateTitle}>
          <Text style={styles.rateTitleText}>
            {i18n.t('eventFeedback.callToAction')}
          </Text>
        </View>
        <EventFeedbackStarRating onChange={handleRatingChange} />
      </View>
      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity style={styles.noShowButton} onPress={onDismiss}>
          <Text style={styles.noShowButtonText}>
            {i18n.t('eventFeedback.noShow')}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  eventTitle: {
    paddingVertical: 24,
    marginBottom: 24,

    borderBottomColor: 'rgba(255,255,255,0.5)',
    borderBottomWidth: 0.5
  },
  eventTitleText: {
    fontSize: 34,
    fontWeight: 'bold',

    color: colors.white
  },
  rateTitle: {
    marginBottom: 16
  },
  rateTitleText: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.white
  },
  content: {
    flex: 1
  },
  footer: {
    alignItems: 'center'
  },
  noShowButton: {
    padding: 16
  },
  noShowButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 19,

    color: colors.white
  },

  leaveComment: {
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    opacity: 0.5,
    fontSize: 16,
    paddingBottom: 8,
    marginTop: 45
  },
  sendCommentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center'
  },
  sendCommentButton: {
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 218,
    backgroundColor: colors.yellow
  },
  sendCommentLabel: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold'
  },
  doneStep: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  doneStepTitle: {
    marginBottom: 75,
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.white
  },
  doneStepBottomText: {
    fontSize: 23,
    color: colors.white,
    textAlign: 'center',
    marginTop: 75
  }
})
