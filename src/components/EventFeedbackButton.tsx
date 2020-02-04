import React from 'react'
import {
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native'
import { colors } from '../util/style'
import EventFeedBack from '../components/EventFeedBack'

export default function EventFeedBackButton() {
  const [isVisible, setIsVisible] = React.useState(false)
  const buttonImgSrc = require('../assets/event-fb-btn-icon.png')

  function handlePress() {
    setIsVisible(!isVisible)
  }

  return (
    <View style={styles.root}>
      <Animated.View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Image source={buttonImgSrc} />
          <Text style={styles.labelText}>Оцените мероприятие</Text>
        </TouchableOpacity>
      </Animated.View>
      <EventFeedBack handlePress={handlePress} isVisible={isVisible} />
    </View>
  )
}
const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 88,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: colors.blue
  },
  labelText: {
    marginLeft: 20,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
    color: colors.white
  },
  bottomSheetContainer: {
    backgroundColor: colors.blue,
    height: 520,
    padding: 24,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  }
})
