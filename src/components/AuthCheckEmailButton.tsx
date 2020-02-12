import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import * as Auth from '../util/auth'

import i18n from '../localization'

import { colors } from '../util/style'

export default function AuthCheckEmailButton({ onPress }) {

  return (
    <View
      style={[
        styles.root,
        {
          paddingHorizontal: 16,
          paddingBottom: 200
        }
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <View
          style={[
            styles.content,
            { borderRadius: 24, height: 48 }
          ]}
        >
          <Text style={styles.labelText}>{i18n.t('authCheckEmailScreen.checkEmail')}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row'
  },
  button: {
    flex: 1
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(47,128,237,1)'
  },
  labelText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.white
  }
})

