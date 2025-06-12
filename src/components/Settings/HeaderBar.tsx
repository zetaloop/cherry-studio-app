import { ArrowLeft } from '@tamagui/lucide-icons'
import React from 'react'
import { Button, Text, XStack } from 'tamagui'

interface HeaderBarProps {
  title: string
  onBackPress?: () => void
  rightButton?: {
    icon: any
    onPress: () => void
  }
  rightButtons?: {
    icon: any
    onPress: () => void
  }[]
  showBackButton?: boolean
}

export function HeaderBar({ title, onBackPress, rightButton, rightButtons, showBackButton = true }: HeaderBarProps) {
  // 如果同时提供了 rightButton 和 rightButtons，优先使用 rightButtons
  const buttonsToRender = rightButtons || (rightButton ? [rightButton] : [])

  return (
    <XStack paddingHorizontal="$4" alignItems="center" height={44} justifyContent="space-between">
      {/* 左侧按钮 */}
      <XStack alignItems="center" minWidth={40}>
        {showBackButton ? (
          <Button size="$2" chromeless circular icon={<ArrowLeft size={24} />} onPress={onBackPress} />
        ) : (
          <XStack width={40} /> // 占位，确保标题能正确居中
        )}
      </XStack>

      {/* 居中标题 */}
      <XStack flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="$6" fontWeight="bold" textAlign="center">
          {title}
        </Text>
      </XStack>

      {/* 右侧按钮 */}
      <XStack alignItems="center" minWidth={40} justifyContent="flex-end">
        {buttonsToRender.length > 0 ? (
          <XStack gap="$2">
            {buttonsToRender.map((button, index) => (
              <Button key={index} size="$2" chromeless circular icon={button.icon} onPress={button.onPress} />
            ))}
          </XStack>
        ) : (
          <XStack width={40} /> // 占位，确保标题能正确居中
        )}
      </XStack>
    </XStack>
  )
}
