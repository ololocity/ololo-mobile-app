import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useColorScheme } from 'react-native-appearance'
import { colors } from '../util/style'

interface Props {
  title: string
}

export default function EventFeedSectionTitle({ title }: Props) {
  const colorScheme = useColorScheme()

  return (
    <View style={styles.root}>
      <Text
        style={[
          styles.titleText,
          colorScheme === 'dark' && styles.titleTextDark
        ]}
      >
        {title}
      </Text>
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
  },
  titleTextDark: {
    color: colors.white
  }
})
