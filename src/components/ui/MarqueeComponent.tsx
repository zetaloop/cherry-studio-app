import { ChevronDown, ChevronRight } from '@tamagui/lucide-icons'
import React from 'react'
import { Spinner, Text, View, XStack, YStack } from 'tamagui'

import { MessageBlockStatus, ThinkingMessageBlock } from '@/types/message'

interface Props {
  block: ThinkingMessageBlock
  expanded: boolean
}

const MarqueeComponent: React.FC<Props> = ({ block, expanded }) => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <XStack justifyContent="space-between">
        <XStack gap={10} justifyContent="center" alignItems="center">
          {block.status === MessageBlockStatus.STREAMING && <Spinner size="small" color="rgba(0, 185, 107, 1)" />}
          <YStack gap={5}>
            <Text fontWeight="bold">Thinking for {(block.thinking_millsec || 0) / 1000} seconds</Text>
            <Text fontSize={12} opacity={0.5}>
              Tap to read my mind
            </Text>
          </YStack>
        </XStack>
        <XStack>{!expanded ? <ChevronDown size={24} /> : <ChevronRight size={24} />}</XStack>
      </XStack>
    </View>
  )
}

export default MarqueeComponent
