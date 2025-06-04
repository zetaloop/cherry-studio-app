import { useNavigation } from '@react-navigation/native'
import { ArrowUpRight, BookmarkMinus } from '@tamagui/lucide-icons'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Tabs, Text, useTheme, XStack, YStack } from 'tamagui'

import AgentItemCard from '@/components/agent/agentItemCard'
import AgentItemRow from '@/components/agent/agentItemRow'
import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { SearchInput } from '@/components/ui/searchInput'
import { getSystemAgents } from '@/mock'
import { Agent } from '@/types/agent'
import { groupByCategories } from '@/utils/agents'

export default function AgentMarketPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()

  const [actualFilterType, setActualFilterType] = useState('career')
  const [agentGroups, setAgentGroups] = useState<Record<string, Agent[]>>({})

  // 添加通用 tab 样式函数
  const getTabStyle = (tabValue: string) => ({
    height: '100%',
    backgroundColor: actualFilterType === tabValue ? '$background' : 'transparent',
    borderRadius: 15
  })

  const systemAgents = useMemo(() => getSystemAgents(), [])

  const filterAgents = useMemo(() => {
    if (actualFilterType === 'all') {
      return systemAgents
    }

    return systemAgents.filter(agent => agent.group && agent.group.includes(actualFilterType))
  }, [actualFilterType, systemAgents])

  // 处理箭头点击事件
  const handleArrowClick = (groupKey: string) => {
    if (groupKey) {
      setActualFilterType(groupKey)
    }
  }

  useEffect(() => {
    const systemAgentsGroupList = groupByCategories(systemAgents)

    setAgentGroups(systemAgentsGroupList)
  }, [systemAgents])

  const tabConfigs = useMemo(() => {
    // 对 agentGroups 的键进行排序，以确保标签顺序的一致性
    const groupKeys = Object.keys(agentGroups).sort()

    const dynamicTabs = groupKeys.map(groupKey => ({
      value: groupKey,
      label: t(`agents.market.groups.${groupKey}`, groupKey.charAt(0).toUpperCase() + groupKey.slice(1))
    }))

    return [{ value: 'all', label: t('agents.market.groups.all') }, ...dynamicTabs]
  }, [agentGroups, t])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar
        title={t('agents.market.title')}
        onBackPress={() => navigation.goBack()}
        rightButton={{
          icon: <BookmarkMinus size={24} />,
          onPress: () => console.log('Bookmark pressed')
        }}
      />
      <SettingContainer>
        <SearchInput placeholder={t('agents.market.search_placeholder')} />

        <Tabs
          gap={24}
          defaultValue="all"
          value={actualFilterType}
          onValueChange={setActualFilterType}
          orientation="horizontal"
          flexDirection="column"
          flex={1}>
          <Tabs.List gap="10" flexDirection="row" height={34}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {tabConfigs.map(({ value, label }) => (
                <Tabs.Tab key={value} value={value} {...getTabStyle(value)}>
                  <Text>{label}</Text>
                </Tabs.Tab>
              ))}
            </ScrollView>
          </Tabs.List>
          {/* todo fix scrollview bug */}
          {/* 有时可以滚动有时不可以 */}
          <Tabs.Content value="all" flex={1}>
            <ScrollView flex={1}>
              <YStack gap={16}>
                {Object.keys(agentGroups).map((groupKey, index) => (
                  <YStack key={index} gap={16}>
                    <XStack justifyContent="space-between" alignItems="center" paddingHorizontal={20}>
                      <Text>{groupKey}</Text>
                      <XStack onPress={() => handleArrowClick(groupKey)}>
                        <ArrowUpRight size={18} />
                      </XStack>
                    </XStack>
                    <XStack flex={1}>
                      <ScrollView flex={1} horizontal>
                        <XStack gap={30}>
                          {agentGroups[groupKey].map(agent => (
                            <AgentItemCard key={agent.id} agent={agent} />
                          ))}
                        </XStack>
                      </ScrollView>
                    </XStack>
                  </YStack>
                ))}
              </YStack>
            </ScrollView>
          </Tabs.Content>
          {tabConfigs.map(
            ({ value }) =>
              value !== 'all' && (
                <Tabs.Content key={value} value={value} flex={1}>
                  <ScrollView flex={1}>
                    <YStack gap={10}>
                      {filterAgents.map(agent => (
                        <AgentItemRow key={agent.id} agent={agent} />
                      ))}
                    </YStack>
                  </ScrollView>
                </Tabs.Content>
              )
          )}
        </Tabs>
      </SettingContainer>
    </SafeAreaView>
  )
}
