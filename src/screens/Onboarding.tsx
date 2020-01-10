import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import SafeAreaView from '../components/SafeAreaView'
import OnboardingSlide from '../components/OnboardingSlide'

import { colors } from '../util/style'
import * as Store from '../util/store'

import logoSrc from '../assets/ololo-logo.png'
import i18n from '../localization'

const PAGE_INDICATOR_SIZE = 8
const CURRENT_PAGE_INDICATOR_SIZE = 12
const PAGE_INDICATOR_HIT_SLOP = 12

const slideI18nKeys = ['events', 'networking', 'feedback']
const slideCount = slideI18nKeys.length

export default function OnboardingScreen() {
  const navigation = useNavigation()
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0)
  const scrollViewRef = React.useRef()
  const { width: screenWidth } = Dimensions.get('window')
  const isOnLastPage = currentSlideIndex === slideCount - 1
  const isSkipEnabled = !isOnLastPage

  function handleScroll(event) {
    const offsetX = event.nativeEvent.contentOffset.x

    if (offsetX >= 0) {
      setCurrentSlideIndex(Math.round(offsetX / screenWidth))
    }
  }

  function scrollToIndex(index: number) {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * screenWidth })
    }
  }

  function handlePageIndicatorPress(index) {
    scrollToIndex(index)
  }

  function handleSkipPress() {
    navigation.navigate('Auth')
    Store.set('@ololo/skip-onboarding', true)
  }

  function handleContinuePress() {
    if (isOnLastPage) {
      return handleSkipPress()
    }

    scrollToIndex(currentSlideIndex + 1)
  }

  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scroll}
        horizontal
        snapToAlignment="start"
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={150}
        onScroll={handleScroll}
      >
        {slideI18nKeys.map((item, index) => (
          <OnboardingSlide
            key={index.toString()}
            title={i18n.t(`onboardingScreen.slides.${item}.title`)}
            subTitle={i18n.t(`onboardingScreen.slides.${item}.subTitle`)}
          />
        ))}
      </ScrollView>
      <SafeAreaView style={styles.container} pointerEvents="box-none">
        <View style={styles.logo}>
          <Image source={logoSrc} />
        </View>
        <View style={styles.footer} pointerEvents="auto">
          <TouchableOpacity
            onPress={handleSkipPress}
            hitSlop={{
              top: PAGE_INDICATOR_HIT_SLOP,
              left: PAGE_INDICATOR_HIT_SLOP,
              bottom: PAGE_INDICATOR_HIT_SLOP,
              right: PAGE_INDICATOR_HIT_SLOP
            }}
            style={[
              styles.navButton,
              { width: screenWidth / 3 },
              !isSkipEnabled && styles.navButtonDisabled
            ]}
            disabled={!isSkipEnabled}
          >
            <Text style={[styles.navButtonText, styles.navButtonSkipText]}>
              {i18n.t('onboardingScreen.skip')}
            </Text>
          </TouchableOpacity>

          <View style={styles.pager}>
            {slideI18nKeys.map((_, index) => (
              <TouchableWithoutFeedback
                key={index.toString()}
                onPress={() => handlePageIndicatorPress(index)}
              >
                <View
                  style={[
                    styles.page,
                    index === currentSlideIndex && styles.pageCurrent
                  ]}
                />
              </TouchableWithoutFeedback>
            ))}
          </View>

          <TouchableOpacity
            onPress={handleContinuePress}
            style={[styles.navButton, { width: screenWidth / 3 }]}
          >
            <Text style={[styles.navButtonText, styles.navButtonContinueText]}>
              {isOnLastPage
                ? i18n.t('onboardingScreen.start')
                : i18n.t('onboardingScreen.next')}
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
    paddingVertical: 30,
    paddingHorizontal: 25
  },
  navButtonDisabled: {
    opacity: 0
  },
  navButtonText: {
    fontSize: 12
  },
  navButtonSkipText: {
    color: colors.white
  },
  navButtonContinueText: {
    textAlign: 'right',
    fontWeight: 'bold',
    color: colors.yellow
  },
  pager: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  page: {
    position: 'relative',
    zIndex: 10,

    width: PAGE_INDICATOR_SIZE,
    height: PAGE_INDICATOR_SIZE,
    borderRadius: PAGE_INDICATOR_SIZE / 2,
    marginHorizontal: 6,

    backgroundColor: '#5999F1'
  },
  pageCurrent: {
    width: CURRENT_PAGE_INDICATOR_SIZE,
    height: CURRENT_PAGE_INDICATOR_SIZE,
    borderRadius: CURRENT_PAGE_INDICATOR_SIZE / 2,

    backgroundColor: colors.yellow
  },
  scroll: {
    ...StyleSheet.absoluteFillObject
  }
})
