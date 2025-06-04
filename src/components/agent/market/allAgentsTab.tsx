import { FlashList } from '@shopify/flash-list'
import { ArrowUpRight } from '@tamagui/lucide-icons'
import React, { useMemo } from 'react'
import { ScrollView, Text, XStack, YStack } from 'tamagui'

import AgentItemCard from '@/components/agent/agentItemCard'
import { Agent } from '@/types/agent'

interface AllAgentsTabProps {
  agentGroups: Record<string, Agent[]>
  onArrowClick: (groupKey: string) => void
}

interface GroupItem {
  type: 'group'
  groupKey: string
  agents: Agent[]
}

const AllAgentsTab: React.FC<AllAgentsTabProps> = ({ agentGroups, onArrowClick }) => {
  // 将分组数据转换为扁平化的列表数据
  const flatData = useMemo(() => {
    return Object.keys(agentGroups).map(
      (groupKey): GroupItem => ({
        type: 'group',
        groupKey,
        agents: agentGroups[groupKey]
      })
    )
  }, [agentGroups])

  const renderGroupItem = ({ item }: { item: GroupItem }) => (
    <YStack gap={16}>
      <XStack justifyContent="space-between" alignItems="center" paddingHorizontal={20}>
        <Text>{item.groupKey}</Text>
        <XStack onPress={() => onArrowClick(item.groupKey)}>
          <ArrowUpRight size={18} />
        </XStack>
      </XStack>
      <XStack flex={1}>
        <ScrollView flex={1} horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap={30}>
            {item.agents.map(agent => (
              <AgentItemCard key={agent.id} agent={agent} />
            ))}
          </XStack>
        </ScrollView>
      </XStack>
    </YStack>
  )

  return (
    <YStack flex={1}>
      <FlashList
        data={flatData}
        renderItem={renderGroupItem}
        estimatedItemSize={220}
        ItemSeparatorComponent={() => <YStack height={16} />}
        keyExtractor={item => item.groupKey}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  )
}

export default AllAgentsTab
