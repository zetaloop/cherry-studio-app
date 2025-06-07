import { BookmarkMinus } from '@tamagui/lucide-icons'
import { FC } from 'react'
import React from 'react'
import { Text, XStack, YStack } from 'tamagui'

import { Agent } from '@/types/agent'

import CustomRadialGradientBackground from '../ui/customRadialGradientBackground'

interface AgentItemRowProps {
  agent: Agent
  setIsBottomSheetOpen: (isOpen: boolean) => void
  onAgentPress: (agent: Agent) => void
}

const AgentItemRow: FC<AgentItemRowProps> = ({ agent, setIsBottomSheetOpen, onAgentPress }) => {
  const handlePress = () => {
    onAgentPress(agent)
    setIsBottomSheetOpen(true)
  }

  return (
    <CustomRadialGradientBackground style={{ height: 66, radius: 8 }}>
      <XStack
        paddingVertical={10}
        paddingHorizontal={20}
        justifyContent="space-between"
        alignItems="center"
        borderRadius={8}
        borderColor="$gary3"
        borderWidth={1}
        onPress={handlePress}>
        <XStack gap={14} flex={1} marginRight={10} maxWidth="75%">
          <Text fontSize={35}>{agent.emoji?.replace(/\r\n/g, '')}</Text>
          <YStack gap={4} flex={1} maxWidth="100%">
            <Text numberOfLines={1} ellipsizeMode="tail">
              {agent.name}
            </Text>
            <Text fontSize={12} numberOfLines={1} ellipsizeMode="tail">
              {agent.description}
            </Text>
          </YStack>
        </XStack>
        <XStack>
          <BookmarkMinus size={16} />
        </XStack>
      </XStack>
    </CustomRadialGradientBackground>
  )
}

export default AgentItemRow
