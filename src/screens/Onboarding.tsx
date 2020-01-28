import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated
} from 'react-native'
import { useNavigation } from 'react-navigation-hooks'

import SafeAreaView from '../components/SafeAreaView'
import OnboardingSlide from '../components/OnboardingSlide'
import OnboardingFooter from '../components/OnboardingFooter'
import OnboardingCircleWithIcons from '../components/OnboardingCircleWithIcons'

import { colors } from '../util/style'
import * as Store from '../util/store'

import logoSrc from '../assets/ololo-logo.png'
import i18n from '../localization'

const pageI18nKeys = ['events', 'networking', 'feedback']
const pageCount = pageI18nKeys.length

export default function OnboardingScreen() {
  const navigation = useNavigation()
  const [scrollPosition] = React.useState(new Animated.Value(0))
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0)
  const scrollViewRef = React.useRef<Animated.ScrollView>()
  const { width: screenWidth } = Dimensions.get('window')
  const isOnLastPage = currentPageIndex === pageCount - 1

  function handleScroll(event) {
    const offsetX = event.nativeEvent.contentOffset.x

    if (offsetX >= 0) {
      setCurrentPageIndex(Math.round(offsetX / screenWidth))
    }
  }

  function scrollToIndex(index: number) {
    if (scrollViewRef.current) {
      scrollViewRef.current.getNode().scrollTo({ x: index * screenWidth })
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

    scrollToIndex(currentPageIndex + 1)
  }

  return (
    <View style={styles.root}>
      <Animated.ScrollView
        ref={scrollViewRef}
        style={styles.scroll}
        horizontal
        snapToAlignment="start"
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollPosition } } }],
          { useNativeDriver: true, listener: handleScroll }
        )}
      >
        {pageI18nKeys.map((item, index) => (
          <OnboardingSlide
            key={index.toString()}
            title={i18n.t(`onboardingScreen.slides.${item}.title`)}
            subTitle={i18n.t(`onboardingScreen.slides.${item}.subTitle`)}
          />
        ))}
      </Animated.ScrollView>
      <SafeAreaView style={styles.container} pointerEvents="box-none">
        <View style={styles.logo}>
          <Image source={logoSrc} />
        </View>
        <OnboardingCircleWithIcons
          {...{ scrollPosition, pageCount, currentPageIndex }}
        />
        <OnboardingFooter
          onContinuePress={handleContinuePress}
          onSkipPress={handleSkipPress}
          onPageIndicatorPress={handlePageIndicatorPress}
          {...{ pageCount, currentPageIndex }}
        />
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
  scroll: {
    ...StyleSheet.absoluteFillObject
  }
})
