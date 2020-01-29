import React from 'react'
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native'

import SafeAreaView from './SafeAreaView'

import { colors } from '../util/style'

export const CONTENT_HEIGHT = 100

interface Props {
  title: string
  subTitle: string
  pictureName?: string
}

export default function OnboardingSlide({
  title,
  subTitle,
  pictureName
}: Props) {
  const { width } = Dimensions.get('screen')

  return (
    <View style={[styles.root, { width }]}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.title}>
              <Text style={[styles.contentText, styles.titleText]}>
                {title}
              </Text>
            </View>
            <View>
              <Text style={[styles.contentText]}>{subTitle}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  wrapper: {
    flex: 1,

    alignItems: 'stretch',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,

    paddingTop: 103,
    paddingBottom: 80,
    paddingHorizontal: 25,

    justifyContent: 'flex-end'
  },
  content: {
    height: CONTENT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  title: {
    marginBottom: 20
  },
  contentText: {
    textAlign: 'center',
    fontSize: 16,

    color: colors.white
  },
  titleText: {
    fontSize: 23,
    fontWeight: 'bold'
  }
})
