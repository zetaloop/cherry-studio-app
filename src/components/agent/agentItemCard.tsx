import { BookmarkMinus } from '@tamagui/lucide-icons'
import React from 'react'
import { Button, Text, XStack, YStack } from 'tamagui'

import { Agent } from '@/types/agent'

interface AgentItemCardProps {
  agent: Agent
}

const AgentItemCard = ({ agent }: AgentItemCardProps) => {
  return (
    <YStack
      paddingHorizontal={14}
      paddingTop={30}
      paddingBottom={10}
      height={216}
      width={148}
      borderRadius={20}
      borderWidth={1}
      borderColor="white">
      <Button position="absolute" top={10} right={13} size="$2" circular chromeless zIndex={1}>
        <BookmarkMinus size={20} color="white" />
      </Button>
      <YStack gap={7} alignItems="center" justifyContent="center" height="100%">
        <Text fontSize={30}>{agent.emoji}</Text>
        <Text textAlign="center" numberOfLines={2} ellipsizeMode="tail">
          {agent.name}
        </Text>
        <Text color="$gray9" fontSize={10} numberOfLines={4} ellipsizeMode="tail">
          {agent.description}
        </Text>
        <XStack gap={10}>
          {agent.group &&
            agent.group.map((group, index) => (
              <Text
                borderRadius={20}
                paddingVertical={2}
                paddingHorizontal={4}
                key={index}
                fontSize={8}
                color="$foregroundGreen"
                borderWidth={1}
                borderColor="$backgroundGreen">
                {group}
              </Text>
            ))}
        </XStack>
      </YStack>
    </YStack>
  )
}

export default AgentItemCard
