import React from 'react'
import { SafeAreaView as RNSafeAreaView, Platform } from 'react-native'

const ANDROID_TOP_PADDING = 25

interface Props {
  style?: Object
  children: React.ReactNode
}

export default function SafeAreaView({ style, ...restProps }: Props) {
  return (
    <RNSafeAreaView
      style={[
        style,
        Platform.OS === 'android' && { paddingTop: ANDROID_TOP_PADDING }
      ]}
      {...restProps}
    />
  )
}
