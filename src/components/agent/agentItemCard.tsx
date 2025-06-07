import { BookmarkMinus } from '@tamagui/lucide-icons'
import React from 'react'
import { Button, Text, XStack, YStack } from 'tamagui'

import { Agent } from '@/types/agent'

import CustomRadialGradientBackground from '../ui/customRadialGradientBackground'
import GroupTag from './market/groupTag'

interface AgentItemCardProps {
  agent: Agent
  setIsBottomSheetOpen: (isOpen: boolean) => void
  onAgentPress: (agent: Agent) => void
}

const AgentItemCard = ({ agent, setIsBottomSheetOpen, onAgentPress }: AgentItemCardProps) => {
  const handlePress = () => {
    onAgentPress(agent)
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
          <Text fontSize={30}>{agent.emoji?.replace(/\r\n/g, '')}</Text>
          <Text textAlign="center" numberOfLines={2} ellipsizeMode="tail">
            {agent.name}
          </Text>
          <Text color="$gray9" fontSize={10} numberOfLines={4} ellipsizeMode="tail">
            {agent.description}
          </Text>
          <XStack gap={10}>
            {agent.group &&
              agent.group.map((group, index) => (
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

export default AgentItemCard
