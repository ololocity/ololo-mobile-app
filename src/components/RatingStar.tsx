import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Animated from 'react-native-reanimated'
import { withSpringTransition, interpolateColor } from 'react-native-redash'
import MaskedView from '@react-native-community/masked-view'

import { colors } from '../util/style'

interface Props {
  index: number
  selectedStar: Animated.Value<number>
}

const { onChange, interpolate, greaterThan, useCode, set, debug } = Animated

function RatingStar({ index, selectedStar }: Props) {
  const activeValue = withSpringTransition(greaterThan(selectedStar, index))
  const scale = interpolate(activeValue, {
    inputRange: [0, 1],
    outputRange: [1, 1.2]
  })
  const fill = interpolateColor(activeValue, {
    inputRange: [0, 1],
    outputRange: [colors.lightBlue, colors.yellow]
  })

  return (
    <Animated.View style={[styles.root, { transform: [{ scale }] }]}>
      <MaskedView
        style={styles.star}
        maskElement={
          <Svg height="41" width="39">
            <Path
              d="M19.577 1.22c.341-.821 1.505-.821 1.846 0l4.794 11.525a1 1 0 00.843.613l12.442.997c.887.071 1.246 1.178.57 1.756l-9.479 8.12a1 1 0 00-.322.992l2.896 12.141c.207.865-.735 1.55-1.494 1.086l-10.652-6.507a1 1 0 00-1.042 0L9.327 38.45c-.76.463-1.7-.22-1.494-1.086l2.896-12.141a1 1 0 00-.322-.992l-9.48-8.12c-.675-.578-.316-1.685.57-1.756l12.443-.998a1 1 0 00.843-.612L19.577 1.22z"
              fill={colors.black}
              stroke="none"
            />
          </Svg>
        }
      >
        <Animated.View style={[styles.star, { backgroundColor: fill }]} />
      </MaskedView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: 41,
    height: 39,
    marginHorizontal: 8
  },
  star: {
    flex: 1
  }
})

export default React.memo(RatingStar)
