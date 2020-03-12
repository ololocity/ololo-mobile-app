import React from 'react'
import { View, Text, Image, Animated, StyleSheet } from 'react-native'
import format from 'date-fns/format'
import add from 'date-fns/add'
import { EventFeedItem } from '../screens/EventFeed'
import { colors } from '../util/style'

const locationIconSrc = require('../assets/map-marker.png')

interface Props {
  item: EventFeedItem
  revealAnimValue?: Animated.Value
}

function EventPreview({ item, revealAnimValue }: Props) {
  const startsAt = new Date(item.startsAt)
  const endsAt = add(new Date(item.startsAt), { minutes: item.duration })
  const dateLabel = format(startsAt, 'MMMM dd')
  const durationLabel = [
    format(startsAt, 'HH:mm'),
    format(endsAt, 'HH:mm')
  ].join('-')
  const borderRadius = revealAnimValue
    ? revealAnimValue.interpolate({
        inputRange: [0, 1],
        outputRange: [13, 0]
      })
    : 13
  const paddingTop = revealAnimValue
    ? revealAnimValue.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 86]
      })
    : 16

  return (
    <Animated.View style={[styles.root, { paddingTop, borderRadius }]}>
      <Image style={styles.picture} source={{ uri: item.coverImage.url }} />
      <View>
        <View>
          {item.speakers.map((speaker, index) => (
            <Text key={index.toString()} style={[styles.text, styles.hostText]}>
              {String(speaker.name).toUpperCase()}
            </Text>
          ))}
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
            <Text style={[styles.text, styles.dateText]}>{durationLabel}</Text>
          </View>
        </View>
        <View style={styles.location}>
          <Image style={styles.locationIcon} source={locationIconSrc} />
          <Text style={[styles.text, styles.locationText]}>
            {item.venue.name}
          </Text>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    position: 'relative',

    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 16,
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

export default React.memo(EventPreview)
