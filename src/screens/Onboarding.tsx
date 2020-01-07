import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'

import SafeAreaView from '../components/SafeAreaView'
import OnboardingSlide from '../components/OnboardingSlide'

import { colors } from '../util/style'

import logoSrc from '../assets/ololo-logo.png'

const slidesData = [
  {
    title: 'Посещай классные ивенты',
    subTitle: 'Смотри афишу и записывайся на мероприятия в Ololohaus'
  },
  {
    title: 'Знакомься с людьми',
    subTitle: 'Смотри афишу и записывайся на мероприятия в Ololohaus'
  },
  {
    title: 'Посещай классные ивенты',
    subTitle: 'Смотри афишу и записывайся на мероприятия в Ololohaus'
  }
]

export default function OnboardingScreen() {
  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        horizontal
        snapToAlignment="start"
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {slidesData.map((item, index) => (
          <OnboardingSlide key={index.toString()} {...item} />
        ))}
      </ScrollView>
      <SafeAreaView style={styles.container} pointerEvents="box-none">
        <View style={styles.logo}>
          <Image source={logoSrc} />
        </View>
        <View style={styles.footer} pointerEvents="auto">
          <TouchableOpacity style={styles.navButton}>
            <Text style={[styles.navButtonText, styles.navButtonSkipText]}>
              Пропустить
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButton}>
            <Text style={[styles.navButtonText, styles.navButtonContinueText]}>
              Далее
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: colors.blue
  },
  container: {
    flex: 1,

    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  logo: {
    marginTop: 47,
    alignItems: 'center'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  navButton: {
    padding: 30
  },
  navButtonText: {
    fontSize: 12
  },
  navButtonSkipText: {
    color: colors.white
  },
  navButtonContinueText: {
    fontWeight: 'bold',
    color: colors.yellow
  },
  scroll: {
    ...StyleSheet.absoluteFillObject
  }
})
