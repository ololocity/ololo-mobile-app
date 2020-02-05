import React from 'react'
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Image,
  Dimensions
} from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'

import EventFeedbackRateButton, { HEIGHT as RATE_BUTTON_HEIGHT } from './EventFeedbackRateButton'
import EventFeedbackRating from './EventFeedbackRating'

import { colors } from '../util/style'

const doneIconSrc = require('../assets/done-feedback.png')

export default function EventFeedback() {
  const sheetRef = React.useRef()
  const { height: screenHeight } = Dimensions.get('screen')

  function handleRatingChange(nextRating) {
    console.log({ nextRating })
  }

  function handleRateButtonPress() {
    if (sheetRef.current) {
      sheetRef.current.snapTo(1)
    }
  }

  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={[RATE_BUTTON_HEIGHT, screenHeight - 120]}
      initialSnap={0}
      borderRadius={20}
      renderContent={() => (
        <View style={[styles.root, { height: screenHeight }]}>
          <EventFeedbackRateButton onPress={handleRateButtonPress} />
          <View style={{ flex: 1 }}>
            <Text style={styles.eventTitle}>Название мероприятия</Text>
            <View style={styles.line} />
            <View style={styles.rateTitle}>
              <Text style={styles.rateTitleText}>Оцените мероприятие</Text>
            </View>
            <EventFeedbackRating onChange={handleRatingChange} />
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 24,

    backgroundColor: colors.blue
  },
  eventTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'left'
  },
  line: {
    marginTop: 24,
    marginBottom: 24,
    borderColor: colors.white,
    borderWidth: 0.5,
    opacity: 0.5
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
