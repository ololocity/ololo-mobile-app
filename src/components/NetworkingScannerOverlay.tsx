import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Svg, { LinearGradient, Stop, Defs, Rect } from 'react-native-svg'
import { colors } from '../util/style'

const TARGET_SIZE = 210
const TARGET_CORNER_SIZE = 20
const TARGET_CORNER_WIDTH = 4

interface Props {
  height: number
}

export default function NetworkingScannerOverlay({ height }: Props) {
  const { width: screenWidth } = Dimensions.get('window')
  const gradientHeight = height * 0.28

  return (
    <View style={styles.root} pointerEvents="none">
      <Svg width={screenWidth} height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="grad" x1="50%" y1="0" x2="50%" y2="100%">
            <Stop offset="0" stopColor="black" stopOpacity="0.7" />
            <Stop offset="1" stopColor="black" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height={gradientHeight}
          fill="url(#grad)"
        />
        <Rect
          x="0"
          y={height - gradientHeight}
          width="100%"
          height={gradientHeight}
          fill="url(#grad)"
          transform={{
            rotation: 180,
            originX: screenWidth / 2,
            originY: height - gradientHeight * 0.5
          }}
        />
      </Svg>

      <View style={styles.target}>
        <View
          style={[
            styles.targetCorner,
            {
              left: 0,
              top: 0,
              borderLeftWidth: TARGET_CORNER_WIDTH,
              borderTopWidth: TARGET_CORNER_WIDTH
            }
          ]}
        />
                <View
          style={[
            styles.targetCorner,
            {
              right: 0,
              top: 0,
              borderRightWidth: TARGET_CORNER_WIDTH,
              borderTopWidth: TARGET_CORNER_WIDTH
            }
          ]}
        />
                <View
          style={[
            styles.targetCorner,
            {
              left: 0,
              bottom: 0,
              borderLeftWidth: TARGET_CORNER_WIDTH,
              borderBottomWidth: TARGET_CORNER_WIDTH
            }
          ]}
        />
                <View
          style={[
            styles.targetCorner,
            {
              right: 0,
              bottom: 0,
              borderRightWidth: TARGET_CORNER_WIDTH,
              borderBottomWidth: TARGET_CORNER_WIDTH
            }
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'center',
    alignItems: 'center'
  },
  target: {
    width: TARGET_SIZE,
    height: TARGET_SIZE
  },
  targetCorner: {
    position: 'absolute',
    width: TARGET_CORNER_SIZE,
    height: TARGET_CORNER_SIZE,
    borderColor: colors.white
  }
})
