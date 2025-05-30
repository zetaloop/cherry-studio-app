import React from 'react'
import { Text, YStack } from 'tamagui'

import { Agent } from '@/types/agent'
interface PresetTabContentProps {
  agent?: Agent | null
}

export function PresetTabContent({ agent }: PresetTabContentProps) {
  return (
    <YStack flex={1} padding="$4">
      <Text fontSize="$4" fontWeight="$6" marginBottom="$2">
        Preset Management
      </Text>
      <Text color="$gray10">Manage and apply presets for quick configuration.</Text>
    </YStack>
  )
}
