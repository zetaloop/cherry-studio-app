import { BookmarkMinus } from '@tamagui/lucide-icons'
import { FC } from 'react'
import React from 'react'
import { Text, XStack, YStack } from 'tamagui'

import { Agent } from '@/types/agent'

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
    <XStack
      paddingVertical={10}
      paddingHorizontal={20}
      justifyContent="space-between"
      alignItems="center"
      borderWidth={1}
      borderColor="$gray8"
      borderRadius={8}
      onPress={handlePress}>
      <XStack gap={14} flex={1} marginRight={10} maxWidth="75%">
        <Text fontSize={35}>{agent.emoji}</Text>
        <YStack gap={4} flex={1} maxWidth="100%">
          <Text>{agent.name}</Text>
          <Text fontSize={12} numberOfLines={1} ellipsizeMode="tail">
            {agent.description}
          </Text>
        </YStack>
      </XStack>
      <XStack>
        <BookmarkMinus size={16} />
      </XStack>
    </XStack>
  )
}

export default AgentItemRow
