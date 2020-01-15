import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import format from 'date-fns/format'
import add from 'date-fns/add'

import { EventFeedItem } from '../screens/EventFeed'
import { colors } from '../util/style'

const locationIconSrc = require('../assets/map-marker.png')

interface Props {
  item: EventFeedItem
}

function EventPreview({ item }: Props) {
  const startsAt = new Date(item.startsAt)
  const endsAt = add(new Date(item.startsAt), { minutes: item.durationMinutes })
  const dateLabel = format(startsAt, 'MMMM dd')
  const durationLabel = [
    format(startsAt, 'HH:mm'),
    format(endsAt, 'HH:mm')
  ].join('-')

  return (
    <View style={styles.root}>
      <Image style={styles.picture} source={{ uri: item.coverImageUrl }} />

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
            <Text style={[styles.text, styles.dateText]}>{durationLabel}</Text>
          </View>
        </View>
        <View style={styles.location}>
          <Image style={styles.locationIcon} source={locationIconSrc} />
          <Text style={[styles.text, styles.locationText]}>
            {item.locationName}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    position: 'relative',

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

export default React.memo(EventPreview)
