import React from 'react'
import { Text, YStack } from 'tamagui'

import { Agent } from '@/types/agent'

interface ToolTabContentProps {
  agent?: Agent | null
}

export function ToolTabContent({ agent }: ToolTabContentProps) {
  return (
    <YStack flex={1} padding="$4">
      <Text fontSize="$4" fontWeight="$6" marginBottom="$2">
        Knowledge Base
      </Text>
      <Text color="$gray10">Upload and manage tool documents for your agent.</Text>
    </YStack>
  )
}
