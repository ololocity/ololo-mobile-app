import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Text,
  Image,
  StyleSheet
} from 'react-native'
import format from 'date-fns/format'
import add from 'date-fns/add'

import { EventFeedItem as EventFeedItemType } from '../screens/EventFeed'
import { colors } from '../util/style'

const locationIconSrc = require('../assets/map-marker.png')

function getRandomUnsplashImage (id: string): string {
  return `https://source.unsplash.com/random/${id}`
}

interface Props {
  item: EventFeedItemType
}

export default function EventFeedItem({ item }: Props) {
  const [scaleAnimValue] = React.useState(new Animated.Value(1))
  const startsAt = new Date(item.startsAt)
  const endsAt = add(new Date(item.startsAt), { minutes: item.durationMinutes })
  const dateLabel = format(startsAt, 'MMMM dd')
  const durationLabel = [
    format(startsAt, 'HH:mm'),
    format(endsAt, 'HH:mm')
  ].join('-')

  function handlePressIn() {
    Animated.spring(scaleAnimValue, { toValue: 0.93 }).start()
  }

  function handlePressOut() {
    Animated.spring(scaleAnimValue, {
      toValue: 1,
      friction: 3,
      tension: 42
    }).start()
  }

  function handlePress() {}

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={styles.root}
    >
      <Animated.View style={[styles.root, {transform: [{scale: scaleAnimValue}]}]}>
        <Image
          style={styles.picture}
          source={{ uri: getRandomUnsplashImage(item.id) }}
        />

        <View>
          <View>
            <Text style={[styles.text, styles.hostText]}>
              {String(item.hostName).toUpperCase()}
            </Text>
          </View>
          <View>
            <Text style={[styles.text, styles.titleText]}>{item.title}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <View>
              <Text style={[styles.text, styles.dateText]}>{dateLabel}</Text>
            </View>
            <View>
              <Text style={[styles.text, styles.dateText]}>
                {durationLabel}
              </Text>
            </View>
          </View>
          <View style={styles.location}>
            <Image style={styles.locationIcon} source={locationIconSrc} />
            <Text style={[styles.text, styles.locationText]}>
              {item.locationName}
            </Text>
          </View>
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',

    height: 230,
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
    borderRadius: 13,
    overflow: 'hidden',

    backgroundColor: '#333'
  },
  picture: {
    ...StyleSheet.absoluteFillObject,

    resizeMode: 'cover',

    opacity: 0.72
  },
  text: {
    color: colors.white
  },
  hostText: {
    fontSize: 12
  },
  titleText: {
    fontSize: 23,
    fontWeight: 'bold'
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  dateText: {
    fontSize: 13
  },
  location: {
    flexDirection: 'row'
  },
  locationIcon: {
    marginRight: 3
  },
  locationText: {
    fontSize: 13
  }
})
