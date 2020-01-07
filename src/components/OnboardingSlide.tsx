import React from 'react'
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native'

import SafeAreaView from './SafeAreaView'

import { colors } from '../util/style'

const CIRCLE_SIZE = 240

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
          <View style={styles.circleWrapper}>
            <View style={styles.circle} />
          </View>

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

    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,

    paddingTop: 103,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  circleWrapper: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,

    backgroundColor: 'white',
    opacity: 0.1
  },
  content: {
    alignItems: 'center'
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
