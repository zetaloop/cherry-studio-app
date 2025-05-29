import { FC } from 'react'
import React from 'react'
import { Button, Text, XStack, YStack } from 'tamagui'

import { Agent } from '@/types/agent'

interface AgentItemProps {
  agent: Agent
}

const AgentItem: FC<AgentItemProps> = ({ agent }) => {
  return (
    <XStack
      borderRadius={30}
      backgroundColor="$gray2"
      justifyContent="space-between"
      alignItems="center"
      paddingVertical={3}
      paddingHorizontal={20}>
      <XStack gap={14} flex={1} width="60%">
        <Text fontSize={22}>{agent.emoji}</Text>
        <YStack gap={2} flex={1}>
          <Text width="90%" numberOfLines={1} ellipsizeMode="tail">
            {agent.name}
          </Text>
          <Text fontSize={12}>{agent.type}</Text>
        </YStack>
      </XStack>
      <Button disabled circular backgroundColor="$gray8" size={20}>
        <Text>{agent.topics.length}</Text>
      </Button>
    </XStack>
  )
}

export default AgentItem
