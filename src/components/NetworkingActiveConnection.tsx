import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ActionButton from './ActionButton'

import { colors } from '../util/style'

interface Props {
  onDismiss: () => void
}

export default function NetworkingActiveConnection({ onDismiss }: Props) {
  return (
    <View style={styles.root}>
      <View style={styles.content}>
        <Text>Контакт добавлен</Text>
      </View>
      <View style={styles.footer}>
        <ActionButton
          label="Добавить еще"
          onPress={onDismiss}
          color={colors.yellow}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: colors.blue
  },
  content: {
    flex: 1
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 32
  }
})
