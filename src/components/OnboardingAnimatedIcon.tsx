import React from 'react'
import { StyleSheet, Animated, Dimensions } from 'react-native'
import LottieView from 'lottie-react-native'

const animationSource = require('../assets/onboarding-animation.json')
const animationTimestamps = require('../assets/onboarding-animation-timestamps.json')
const totalFrameCount = 179
const revealAnimationEndProgress = 0.18

function getProgressByFrame(frame: number): number {
  return frame / totalFrameCount
}

interface Props {
  index: number
  pageKey: string
  scrollPosition: Animated.Value
}

type AnimationTimestamp = {
  started: number
  revealed: number
  ended: number
}

export default function OnboardingAnimatedIcon({
  index,
  pageKey,
  scrollPosition
}: Props) {
  // If it is a first page —  we'll need to keep track of it, to play reveal animation
  const isFirst = index === 0
  // We'll play reveal animation on component mount and then set it to a falsy value, to
  // substitute it with scroll-bounded interpolation
  // If it is not a first slide — we'll set it to `undefined` right away
  const [revealAnimationValue, setRevealAnimationValue] = React.useState(
    isFirst ? new Animated.Value(0) : undefined
  )

  const { width: screenWidth } = Dimensions.get('window')
  const animationRef = React.useRef<LottieView>()
  const timestamps: AnimationTimestamp = animationTimestamps[pageKey]
  const pageSnapPoint = screenWidth * index
  const animationProgress =
    revealAnimationValue ||
    scrollPosition.interpolate({
      inputRange: [
        pageSnapPoint - screenWidth * 0.39,
        pageSnapPoint,
        pageSnapPoint + screenWidth * 0.39
      ],
      outputRange: [
        getProgressByFrame(timestamps.started),
        getProgressByFrame(timestamps.revealed),
        getProgressByFrame(timestamps.ended)
      ],
      extrapolate: 'clamp'
    })

  React.useEffect(() => {
    if (isFirst) {
      const onAnimationCompleted = () => {
        setRevealAnimationValue(undefined)
      }

      Animated.timing(revealAnimationValue, {
        toValue: revealAnimationEndProgress
      }).start(onAnimationCompleted)
    }
  }, [isFirst])

  return (
    <LottieView
      ref={animationRef}
      style={styles.root}
      source={animationSource}
      progress={animationProgress}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    width: 240,
    height: 240
  }
})
