import MaskedView from '@react-native-masked-view/masked-view'
import { FlashList } from '@shopify/flash-list'
import { ArrowUpRight } from '@tamagui/lucide-icons'
import React, { useMemo } from 'react'
import { ScrollView, Text, XStack, YStack } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'

import AgentItemCard from '@/components/agent/agentItemCard'
import { Agent } from '@/types/agent'

interface AllAgentsTabProps {
  agentGroups: Record<string, Agent[]>
  onArrowClick: (groupKey: string) => void
  setIsBottomSheetOpen: (isOpen: boolean) => void
  onAgentPress: (agent: Agent) => void
}

interface GroupItem {
  type: 'group'
  groupKey: string
  agents: Agent[]
}

const AllAgentsTab: React.FC<AllAgentsTabProps> = ({
  agentGroups,
  onArrowClick,
  setIsBottomSheetOpen,
  onAgentPress
}) => {
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
        <Text>{item.groupKey.charAt(0).toUpperCase() + item.groupKey.slice(1)}</Text>
        <XStack onPress={() => onArrowClick(item.groupKey)}>
          <MaskedView style={{ width: 18, height: 18 }} maskElement={<ArrowUpRight size={18} color="black" />}>
            <LinearGradient colors={['#BAF4A5', '#315923']} start={[1, 0]} end={[0, 1]} style={{ flex: 1 }} />
          </MaskedView>
        </XStack>
      </XStack>
      <XStack flex={1}>
        <ScrollView flex={1} horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap={20}>
            {item.agents.slice(0, 5).map(agent => (
              <AgentItemCard
                key={agent.id}
                agent={agent}
                setIsBottomSheetOpen={setIsBottomSheetOpen}
                onAgentPress={onAgentPress}
              />
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
