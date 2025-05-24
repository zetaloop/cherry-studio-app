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
    <XStack position="relative" alignItems="center" height={24}>
      {/* 左侧按钮 */}
      <XStack position="absolute" left={0} zIndex={1}>
        {showBackButton ? (
          <Button
            size="$2"
            chromeless
            circular
            icon={<ArrowLeft size={24} />}
            onPress={onBackPress}
          />
        ) : null}
      </XStack>

      {/* 居中标题 */}
      <XStack flex={1} justifyContent="center" alignItems="center">
        <Text fontSize="$6" fontWeight="bold" textAlign="center">
          {title}
        </Text>
      </XStack>

      {/* 右侧按钮 */}
      <XStack position="absolute" right={0} zIndex={1}>
        {buttonsToRender.length > 0 ? (
          <XStack gap="$2">
            {buttonsToRender.map((button, index) => (
              <Button
                key={index}
                size="$2"
                chromeless
                circular
                icon={button.icon}
                onPress={button.onPress}
              />
            ))}
          </XStack>
        ) : null}
      </XStack>
    </XStack>
  )
}
