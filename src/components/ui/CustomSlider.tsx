import React from 'react'
import { Slider, XStack, YStack } from 'tamagui'

import { SettingRowTitle } from '@/components/settings'
import { useIsDark } from '@/utils'
import { getGreenColor } from '@/utils/color'

interface CustomSliderProps {
  label: string
  value: number
  min?: number
  max: number
  step?: number
  onValueChange: (value: number[]) => void
  displayValue?: string | number
  multiplier?: number
}

export function CustomSlider({
  label,
  value,
  min = 0,
  max,
  step = 1,
  onValueChange,
  displayValue,
  multiplier = 1
}: CustomSliderProps) {
  const isDark = useIsDark()
  const sliderValue = value * multiplier
  const displayText = displayValue !== undefined ? displayValue : value

  return (
    <YStack gap={10} flex={1}>
      <XStack justifyContent="space-between">
        <SettingRowTitle>{label}</SettingRowTitle>
        <SettingRowTitle>{displayText}</SettingRowTitle>
      </XStack>
      <Slider defaultValue={[sliderValue]} min={min} max={max} step={step} onValueChange={onValueChange}>
        <Slider.Track backgroundColor={getGreenColor(isDark, 20)}>
          <Slider.TrackActive backgroundColor={getGreenColor(isDark, 100)} />
        </Slider.Track>
        <Slider.Thumb backgroundColor={getGreenColor(isDark, 100)} borderWidth={0} size={16} index={0} circular />
      </Slider>
    </YStack>
  )
}
