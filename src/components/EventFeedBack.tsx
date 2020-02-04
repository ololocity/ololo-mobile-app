import React from 'react'
import {
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  SafeAreaView
} from 'react-native'
import EventFeedbackRating from '../components/EventFeedBackRating'
import { colors } from '../util/style'
import { BottomSheet } from 'react-native-btr'

const doneIconSrc = require('../assets/done-feedback.png')

export default function EventFeedBack({ handlePress, isVisible }) {
  // const [rating, setRating] = React.useState(5),
  const [commentValue, setCommentValue] = React.useState('Оставить комментарий')

  return (
    <BottomSheet
      visible={isVisible}
      onBackButtonPress={handlePress}
      onBackdropPress={handlePress}
    >
      <Animated.View style={styles.root}>
        <Text style={styles.eventTitle}>Название мероприятия</Text>
        <View style={styles.line} />
        <Text style={styles.rateTitleText}>Оцените мероприятие</Text>
        <EventFeedbackRating />
        <View style={styles.notToComeContainer}>
          <SafeAreaView>
            <TouchableOpacity style={styles.notToComeButton}>
              <Text style={styles.notToComeLabel}>Я не смог прийти</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* <View style={styles.leaveComment}>
        <TextInput editable maxLength={40} value={commentValue} />
      </View>
      <View style={styles.sendCommentContainer}>
        <SafeAreaView>
          <TouchableOpacity style={styles.sendCommentButton}>
            <Text style={styles.sendCommentLabel}>Отправить</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View> */}
        {/* <View style={styles.doneStep}>
        <Text style={styles.doneStepTitle}>Спасибо!</Text>
        <Image source={doneIconSrc} />
        <Text style={styles.doneStepBottomText}>
          Ваш отзыв очень важен для нас
        </Text>
      </View> */}
      </Animated.View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.blue,
    height: 520,
    padding: 24,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
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
  rateTitleText: {
    marginLeft: 20,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.white
  },
  notToComeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  notToComeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48
  },
  notToComeLabel: {
    fontSize: 16,
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
