import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { YStack } from 'tamagui'

import AgentItemRow from '@/components/agent/agentItemRow'
import { Agent } from '@/types/agent'

interface CategoryAgentsTabProps {
  agents: Agent[]
}

const CategoryAgentsTab: React.FC<CategoryAgentsTabProps> = ({ agents }) => {
  const renderItem = ({ item }: { item: Agent }) => <AgentItemRow agent={item} />

  return (
    <YStack flex={1}>
      <FlashList
        data={agents}
        renderItem={renderItem}
        estimatedItemSize={70}
        ItemSeparatorComponent={() => <YStack height={10} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  )
}

export default CategoryAgentsTab
