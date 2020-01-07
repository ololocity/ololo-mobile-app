import React from "react";
import { SafeAreaView as RNSafeAreaView, Platform } from "react-native";

const ANDROID_TOP_PADDING = 25;

export default function SafeAreaView({ style, ...restProps }) {
  return (
    <RNSafeAreaView
      style={[
        style,
        Platform.OS === "android" && { paddingTop: ANDROID_TOP_PADDING }
      ]}
      {...restProps}
    />
  );
}
