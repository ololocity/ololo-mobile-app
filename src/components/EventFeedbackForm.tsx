import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'

import TextInput from './TextInput'
import { SHEET_TOP_MARGIN } from './EventFeedbackSheet'
import EventFeedbackStarRating from './EventFeedbackStarRating'

import { colors } from '../util/style'
import i18n from '../localization'
import EventNegativeFeedbackIcon from './EventNegativeFeedbackIcon'

const NEGATIVE_DETAILS = {
  presentation: {
    iconSource: require('../assets/negative-detail-event.png'),
    label: i18n.t('eventFeedback.form.negativeDetails.event')
  },
  speaker: {
    iconSource: require('../assets/negative-detail-speaker.png'),
    label: i18n.t('eventFeedback.form.negativeDetails.speaker')
  },
  venue: {
    iconSource: require('../assets/negative-detail-venue.png'),
    label: i18n.t('eventFeedback.form.negativeDetails.venue')
  },
  organization: {
    iconSource: require('../assets/negative-detail-organization.png'),
    label: i18n.t('eventFeedback.form.negativeDetails.organization')
  },
  price: {
    iconSource: require('../assets/negative-detail-price.png'),
    label: i18n.t('eventFeedback.form.negativeDetails.price')
  }
}

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
  const [comment, setComment] = React.useState('')
  const [negativeDetails, setNegativeDetails] = React.useState([])
  const hasRating = typeof rating === 'number'

  function handleRatingChange(nextRating) {
    setRating(nextRating)
  }

  function handleCommentChange(nextCommentValue) {
    setComment(nextCommentValue)
  }

  function handleSubmit() {
    onSubmit({ rating, comment, negativeDetails })
  }

  function handleNegativeDetailPress(detailKey: string) {
    if (negativeDetails.includes(detailKey)) {
      setNegativeDetails(negativeDetails.filter(key => key !== detailKey))
    } else {
      setNegativeDetails([...negativeDetails, detailKey])
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.root}>
        <View style={styles.content}>
          <View style={styles.eventTitle}>
            <Text style={styles.eventTitleText} numberOfLines={3}>
              {title}
            </Text>
          </View>
          <View style={styles.rateTitle}>
            <Text style={styles.rateTitleText}>
              {i18n.t('eventFeedback.form.callToAction')}
            </Text>
          </View>
          <EventFeedbackStarRating onChange={handleRatingChange} />

          {hasRating ? (
            <View style={styles.commentContainer}>
              {rating < 4 ? (
                <View style={styles.negativeDetails}>
                  <View style={styles.negativeDetailsTitle}>
                    <Text style={styles.negativeDetailsTitleText}>
                      {i18n.t('eventFeedback.form.negativeDetails.title')}
                    </Text>
                  </View>

                  {Object.entries(NEGATIVE_DETAILS).map(([key, item]) => {
                    const isActive = negativeDetails.includes(key)
                    return (
                      <TouchableWithoutFeedback
                        key={key}
                        onPress={() => handleNegativeDetailPress(key)}
                      >
                        <View style={styles.negativeDetail}>
                          <EventNegativeFeedbackIcon
                            source={item.iconSource}
                            isActive={isActive}
                          />

                          <Text
                            style={[
                              styles.negativeDetailText,
                              isActive && styles.negativeDetailActiveText
                            ]}
                          >
                            {item.label}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })}
                </View>
              ) : null}

              <TextInput
                focusColor="rgba(255, 255, 255, 0.72)"
                label={i18n.t('eventFeedback.form.commentLabel')}
                placeholder={i18n.t('eventFeedback.form.commentPlaceholder')}
                inputStyle={styles.commentInput}
                onChange={handleCommentChange}
              />
            </View>
          ) : null}
        </View>
        <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
          {hasRating ? (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>
                {i18n.t('eventFeedback.form.submit')}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.noShowButton} onPress={onDismiss}>
              <Text style={styles.noShowButtonText}>
                {i18n.t('eventFeedback.form.noShow')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    paddingTop: 8
  },
  eventTitle: {
    paddingBottom: 24,

    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    borderBottomWidth: 0.5
  },
  eventTitleText: {
    fontSize: 34,
    fontWeight: 'bold',

    color: colors.white
  },
  rateTitle: {
    paddingVertical: 16
  },
  rateTitleText: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.white
  },
  content: {
    flexGrow: 1
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

  negativeDetails: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.5)'
  },

  negativeDetailsTitle: {
    marginBottom: 16
  },
  negativeDetailsTitleText: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    lineHeight: 27,
    color: colors.white
  },

  negativeDetail: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 16
  },
  negativeDetailText: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,

    color: colors.white
  },
  negativeDetailActiveText: {
    color: colors.yellow
  },

  commentContainer: {
    paddingVertical: 24
  },
  commentInput: {
    color: colors.white
  },

  submitButton: {
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 218,

    backgroundColor: colors.yellow
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',

    color: colors.black
  }
})
