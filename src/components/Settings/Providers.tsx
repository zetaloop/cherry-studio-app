import { CircleMinus, Settings } from '@tamagui/lucide-icons'
import React from 'react'
import { Button, Separator, Text, XStack, YStack } from 'tamagui'

export const ProviderGroup: React.FC<{
  models: {
    name: string
    value: string
  }[]
  group_name: string
  icon: React.ReactNode
}> = ({ models, group_name, icon }) => (
  <YStack borderRadius="$4" overflow="hidden">
    <XStack backgroundColor="$gray5">
      <Text fontSize="$3" fontWeight="bold" paddingHorizontal="$3" paddingVertical="$2">
        {group_name}
      </Text>
    </XStack>
    <YStack backgroundColor="$gray2" padding="$2">
      {models.map((model, index) => (
        <YStack key={model.value}>
          <XStack padding="$2" alignItems="center" justifyContent="space-between">
            <XStack gap={8} alignItems="center">
              {icon}
              <Text>{model.name}</Text>
              <Button chromeless size="$2" circular icon={<Settings size={16} />} />
            </XStack>
            <Button chromeless size="$2" circular icon={<CircleMinus color="$red10" size={16} />} />
          </XStack>
          {index < models.length - 1 && <Separator />}
        </YStack>
      ))}
    </YStack>
  </YStack>
)
