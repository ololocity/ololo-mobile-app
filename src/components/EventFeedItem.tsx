import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

import { EventFeedItem as EventFeedItemType } from '../screens/EventFeed'
import { colors } from '../util/style'

interface Props {
  item: EventFeedItemType
}

export default function EventFeedItem ({ item }: Props) {
  function handlePress () {

  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.root}>
      <View>
        <Text style={styles.text}>{item.hostName}</Text>
      </View>
      <View>
        <Text style={styles.text}>{item.title}</Text>
      </View>
      <View>
        <Text style={styles.text}>{item.locationName}</Text>
      </View>
      <View>
        <Text style={styles.text}>{item.startAt} with duration {item.durationMinutes}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    height: 230,
    padding: 16,
    marginBottom: 16,
    borderRadius: 13,

    backgroundColor: '#333'
  },
  text: {
    color: colors.white
  }
})
