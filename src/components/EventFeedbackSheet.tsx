import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Dimensions
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import Animated from 'react-native-reanimated'
import { useSafeArea } from 'react-native-safe-area-context'

import EventFeedbackRateButton, {
  HEIGHT as RATE_BUTTON_HEIGHT
} from './EventFeedbackRateButton'
import EventFeedbackStarRating from './EventFeedbackStarRating'

import { colors } from '../util/style'
import i18n from '../localization'

const doneIconSrc = require('../assets/done-feedback.png')

const SHEET_TOP_MARGIN = 120

interface Props {
  eventId: string
  eventTitle: string
  onDismiss: () => void
}

function EventFeedbackSheet({
  eventId,
  eventTitle,
  onDismiss
}: Props) {
  const insets = useSafeArea()
  const sheetRef = React.useRef()
  const [rating, setRating] = React.useState(undefined)
  const [bottomSheetY] = React.useState(new Animated.Value(1))
  const { height: screenHeight } = Dimensions.get('screen')
  const rateButtonOpacity = bottomSheetY.interpolate({
    inputRange: [0.8, 1],
    outputRange: [0, 1]
  })
  const contentOpacity = bottomSheetY.interpolate({
    inputRange: [0, 0.8],
    outputRange: [1, 0]
  })

  function handleRatingChange(nextRating) {
    setRating(nextRating)
  }

  function handleRateButtonPress() {
    if (sheetRef.current) {
      sheetRef.current.snapTo(1)
    }
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[RATE_BUTTON_HEIGHT, screenHeight - SHEET_TOP_MARGIN]}
      initialSnap={0}
      borderRadius={20}
      callbackNode={bottomSheetY}
      renderContent={() => (
        <View
          style={[styles.root, { height: screenHeight - SHEET_TOP_MARGIN }]}
        >
          <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
            <View style={styles.header}>
              <View style={styles.eventTitle}>
                <Text style={styles.eventTitleText} numberOfLines={3}>
                  {eventTitle}
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
          </Animated.View>
          <Animated.View
            style={[styles.rateButton, { opacity: rateButtonOpacity }]}
          >
            <EventFeedbackRateButton onPress={handleRateButtonPress} />
          </Animated.View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.blue
  },
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
  header: {
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
  },
  rateButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: RATE_BUTTON_HEIGHT
  },
  content: {
    flex: 1,

    paddingHorizontal: 24
  }
})

export default React.memo(EventFeedbackSheet)
