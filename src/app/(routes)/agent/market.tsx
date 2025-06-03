import { useNavigation } from '@react-navigation/native'
import { ArrowUpRight, BookmarkMinus } from '@tamagui/lucide-icons'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Tabs, Text, useTheme, XStack, YStack } from 'tamagui'

import AgentItemCard from '@/components/agent/agentItemCard'
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

  const [actualFilterType, setActualFilterType] = useState('all')
  const [agentGroups, setAgentGroups] = useState<Record<string, Agent[]>>({})

  const tabConfigs = [
    { value: 'all', label: t('agents.market.groups.all') },
    { value: 'career', label: t('agents.market.groups.career') },
    { value: 'business', label: t('agents.market.groups.business') },
    { value: 'tools', label: t('agents.market.groups.tools') },
    { value: 'language', label: t('agents.market.groups.language') }
  ]

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

  useEffect(() => {
    const systemAgentsGroupList = groupByCategories(systemAgents)
    const agentsGroupList = {
      ...systemAgentsGroupList
    } as Record<string, Agent[]>
    setAgentGroups(agentsGroupList)
  }, [systemAgents])

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
            <ScrollView flex={1} showsVerticalScrollIndicator={true}>
              <YStack gap={16}>
                {Object.keys(agentGroups).map((groupKey, index) => (
                  <YStack key={index} gap={16}>
                    <XStack justifyContent="space-between" alignItems="center" paddingHorizontal={20}>
                      <Text>{groupKey}</Text>
                      <ArrowUpRight size={18} />
                    </XStack>
                    <XStack flex={1}>
                      <ScrollView flex={1} horizontal showsHorizontalScrollIndicator={true}>
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
        </Tabs>
      </SettingContainer>
    </SafeAreaView>
  )
}
