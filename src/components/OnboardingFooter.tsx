import React from 'react'
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native'

import { colors } from '../util/style'
import i18n from '../localization'

const PAGE_INDICATOR_SIZE = 8
const CURRENT_PAGE_INDICATOR_SIZE = 12
const PAGE_INDICATOR_HIT_SLOP = 12

interface Props {
  onSkipPress: () => void
  onContinuePress: () => void
  onPageIndicatorPress: (index: number) => void
  pageCount: number
  currentPageIndex: number
}

export default function OnboardingFooter({
  onSkipPress,
  onContinuePress,
  onPageIndicatorPress,
  pageCount,
  currentPageIndex
}: Props) {
  const { width: screenWidth } = Dimensions.get('window')
  const isOnLastPage = currentPageIndex === pageCount - 1
  const isSkipEnabled = !isOnLastPage
  return (
    <View style={styles.root} pointerEvents="auto">
      <TouchableOpacity
        onPress={onSkipPress}
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
        {Array(pageCount)
          .fill(null)
          .map((_, index) => (
            <TouchableWithoutFeedback
              key={index.toString()}
              hitSlop={{
                top: PAGE_INDICATOR_HIT_SLOP,
                left: PAGE_INDICATOR_HIT_SLOP,
                bottom: PAGE_INDICATOR_HIT_SLOP,
                right: PAGE_INDICATOR_HIT_SLOP
              }}
              onPress={() => onPageIndicatorPress(index)}
            >
              <View
                style={[
                  styles.page,
                  index === currentPageIndex && styles.pageCurrent
                ]}
              />
            </TouchableWithoutFeedback>
          ))}
      </View>

      <TouchableOpacity
        onPress={onContinuePress}
        style={[styles.navButton, { width: screenWidth / 3 }]}
      >
        <Text style={[styles.navButtonText, styles.navButtonContinueText]}>
          {isOnLastPage
            ? i18n.t('onboardingScreen.start')
            : i18n.t('onboardingScreen.next')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
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
  }
})
