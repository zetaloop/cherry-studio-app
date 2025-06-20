// components/left-section.tsx
import { Menu } from '@tamagui/lucide-icons'
import React from 'react'
import { Button } from 'tamagui'

interface MenuButtonProps {
  onMenuPress: () => void
}

export const MenuButton = ({ onMenuPress }: MenuButtonProps) => {
  return (
    <Button
      size={24}
      circular
      icon={<Menu size={24} />}
      onPress={onMenuPress}
      backgroundColor="transparent"
      borderWidth={0}
      hoverStyle={{
        backgroundColor: '$backgroundHover'
      }}
      pressStyle={{
        backgroundColor: '$backgroundPress'
      }}
    />
  )
}
