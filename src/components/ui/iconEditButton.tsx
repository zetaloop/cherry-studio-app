import React from 'react'
import { Button, YStack } from 'tamagui'

interface IconEditButtonProps {
  mainIcon: React.ReactNode
  editIcon: React.ReactNode
  onEditPress?: () => void
}

export function IconEditButton({ mainIcon, editIcon, onEditPress }: IconEditButtonProps) {
  return (
    <YStack position="relative">
      <Button
        size={120}
        circular
        borderColor="#00B96B"
        borderWidth={5}
        overflow="hidden"
        paddingTop={12}
        paddingLeft={19}
        rotate="-10deg">
        {mainIcon}
      </Button>
      <Button
        size={40}
        circular
        position="absolute"
        bottom={0}
        right={0}
        backgroundColor="#00B96B"
        zIndex={10}
        onPress={onEditPress}>
        {editIcon}
      </Button>
    </YStack>
  )
}
