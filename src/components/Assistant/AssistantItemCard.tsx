import { BookmarkMinus } from '@tamagui/lucide-icons'
import React from 'react'
import { Button, Text, XStack, YStack } from 'tamagui'

import { Assistant } from '@/types/assistant'

import CustomRadialGradientBackground from '../UI/CustomRadialGradientBackground'
import GroupTag from './Market/GroupTag'

interface AssistantItemCardProps {
  assistant: Assistant
  setIsBottomSheetOpen: (isOpen: boolean) => void
  onAssistantPress: (assistant: Assistant) => void
}

const AssistantItemCard = ({ assistant, setIsBottomSheetOpen, onAssistantPress }: AssistantItemCardProps) => {
  const handlePress = () => {
    onAssistantPress(assistant)
    setIsBottomSheetOpen(true)
  }

  return (
    <CustomRadialGradientBackground style={{ height: 216, width: 148 }}>
      <YStack
        paddingHorizontal={14}
        paddingTop={30}
        paddingBottom={10}
        height={216}
        width={148}
        borderRadius={20}
        onPress={handlePress}>
        <Button position="absolute" top={10} right={13} size="$2" circular chromeless zIndex={1}>
          <BookmarkMinus size={20} color="white" />
        </Button>
        <YStack gap={7} alignItems="center" justifyContent="center" height="100%">
          <Text fontSize={30}>{assistant.emoji?.replace(/\r\n/g, '')}</Text>
          <Text textAlign="center" numberOfLines={2} ellipsizeMode="tail">
            {assistant.name}
          </Text>
          <Text color="$gray9" fontSize={10} numberOfLines={4} ellipsizeMode="tail">
            {assistant.description}
          </Text>
          <XStack gap={10}>
            {assistant.group &&
              assistant.group.map((group, index) => (
                <GroupTag
                  key={index}
                  group={group}
                  fontSize={8}
                  color="$foregroundGreen"
                  borderWidth={1}
                  borderColor="$backgroundGreen"
                />
              ))}
          </XStack>
        </YStack>
      </YStack>
    </CustomRadialGradientBackground>
  )
}

export default AssistantItemCard
