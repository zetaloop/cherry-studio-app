import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg'

interface CustomRadialGradientBackgroundProps {
  children?: React.ReactNode
  style?: {
    height?: number
    width?: number
    radius?: number
  }
}

export default function CustomRadialGradientBackground({ children, style }: CustomRadialGradientBackgroundProps) {
  const rectY = 0.0717773
  const rectRadius = style?.radius?.toString() || '20'

  return (
    <View style={[{ flex: 1 }, style]}>
      <Svg
        height="100%"
        width="100%"
        viewBox="0 0 148 217"
        preserveAspectRatio="none"
        style={StyleSheet.absoluteFillObject}>
        <Defs>
          {/* Gradient definitions based on the provided SVG */}
          {/* paint0_radial_4302_22867 */}
          <RadialGradient
            id="paint0"
            cx="66.785"
            cy="199.477"
            r="126.383" // Approximated from scale(126.383 86.8453)
            gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#00B96B" stopOpacity="0.5" />
            <Stop offset="0.335265" stopColor="#5BE598" stopOpacity="0.3" />
            <Stop offset="1" stopColor="#00B96B" stopOpacity="0" />
          </RadialGradient>

          {/* paint1_radial_4302_22867 */}
          <RadialGradient
            id="paint1"
            cx="148"
            cy="84.6763"
            r="40.7327" // Approximated from scale(40.7327 60.2975)
            gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#00B96B" stopOpacity="0.5" />
            <Stop offset="0.199984" stopColor="#5BE598" stopOpacity="0.3" />
            <Stop offset="1" stopColor="#00B96B" stopOpacity="0" />
          </RadialGradient>

          {/* paint2_radial_4302_22867 */}
          <RadialGradient
            id="paint2"
            cx="0" // cx="7.96161e-07" is effectively 0
            cy="84.1322"
            r="35.7091" // Approximated from scale(35.7091 52.9001)
            gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#00B96B" stopOpacity="0.5" />
            <Stop offset="0.159344" stopColor="#5BE598" stopOpacity="0.3" />
            <Stop offset="0.939422" stopColor="#00B96B" stopOpacity="0" />
          </RadialGradient>

          {/* paint3_radial_4302_22867 */}
          <RadialGradient
            id="paint3"
            cx="80.105"
            cy="3.33626"
            r="95.2175" // Approximated from scale(95.2175 88.6568)
            gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor="#F5F5F5" stopOpacity="0.5" />
            <Stop offset="0.34795" stopColor="#F5F5F5" stopOpacity="0.3" />
            <Stop offset="0.846583" stopColor="#00B96B" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Render all layers with percentage */}
        {/* Base layer */}
        <Rect y={rectY} width="100%" height="100%" rx={rectRadius} ry={rectRadius} fill="#898989" fillOpacity="0.05" />
        {/* Gradient layers */}
        <Rect
          y={rectY}
          width="100%"
          height="100%"
          rx={rectRadius}
          ry={rectRadius}
          fill="url(#paint0)"
          fillOpacity="0.2"
        />
        <Rect
          y={rectY}
          width="100%"
          height="100%"
          rx={rectRadius}
          ry={rectRadius}
          fill="url(#paint1)"
          fillOpacity="0.2"
        />
        <Rect
          y={rectY}
          width="100%"
          height="100%"
          rx={rectRadius}
          ry={rectRadius}
          fill="url(#paint2)"
          fillOpacity="0.2"
        />
        <Rect
          y={rectY}
          width="100%"
          height="100%"
          rx={rectRadius}
          ry={rectRadius}
          fill="url(#paint3)"
          fillOpacity="0.2"
        />
      </Svg>

      {/* 渲染传入的子组件 */}
      <View style={[StyleSheet.absoluteFillObject, { top: rectY }]}>{children}</View>
    </View>
  )
}
