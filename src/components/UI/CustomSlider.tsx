import React from 'react'
import { Slider, XStack, YStack } from 'tamagui'

import { SettingRowTitle } from '@/components/Settings'

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
  const sliderValue = value * multiplier
  const displayText = displayValue !== undefined ? displayValue : value

  return (
    <YStack gap={10} flex={1}>
      <XStack justifyContent="space-between">
        <SettingRowTitle>{label}</SettingRowTitle>
        <SettingRowTitle>{displayText}</SettingRowTitle>
      </XStack>
      <Slider defaultValue={[sliderValue]} min={min} max={max} step={step} onValueChange={onValueChange}>
        <Slider.Track backgroundColor="rgba(0, 185, 107, 0.2)">
          <Slider.TrackActive backgroundColor="rgba(0, 185, 107, 1)" />
        </Slider.Track>
        <Slider.Thumb backgroundColor="rgba(0, 185, 107, 1)" borderWidth={0} size={16} index={0} circular />
      </Slider>
    </YStack>
  )
}
