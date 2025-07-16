// 用于兼容安卓 - Fixed for Expo SDK 53 compatibility

import React from 'react'
import { Platform, View } from 'react-native'

// Conditional import to avoid the Kotlin constructor issue on Android
const BlurViewExpo = Platform.OS === 'ios' ? require('expo-blur').BlurView : null

type BlurViewProps = {
  intensity?: number
  tint?: 'light' | 'dark' | 'default'
  experimentalBlurMethod?: string
  style?: any
  children?: React.ReactNode
}

export function BlurView(props: BlurViewProps) {
  if (Platform.OS === 'ios' && BlurViewExpo) {
    // Use expo-blur on iOS where it works properly
    return (
      <BlurViewExpo {...props}>
        {props.children}
      </BlurViewExpo>
    )
  } else {
    // Fallback to a semi-transparent view on Android to avoid Kotlin error
    const { intensity = 50, tint = 'default', ...otherProps } = props
    
    let backgroundColor: string
    switch (tint) {
      case 'dark':
        backgroundColor = `rgba(0, 0, 0, ${Math.min(intensity / 100, 0.8)})`
        break
      case 'light':
        backgroundColor = `rgba(255, 255, 255, ${Math.min(intensity / 100, 0.8)})`
        break
      default:
        backgroundColor = `rgba(128, 128, 128, ${Math.min(intensity / 100, 0.6)})`
    }

    return (
      <View 
        {...otherProps}
        style={[
          otherProps.style,
          { backgroundColor }
        ]}
      >
        {props.children}
      </View>
    )
  }
}
