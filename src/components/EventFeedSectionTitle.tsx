import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface Props {
  title: string
}

export default function EventFeedSectionTitle({ title }: Props) {
  return (
    <View style={styles.root}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-end',
    height: 50,
    marginBottom: 16
  },
  titleText: {
    fontSize: 34,
    fontWeight: 'bold'
  }
})
