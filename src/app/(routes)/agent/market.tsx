import { useNavigation } from '@react-navigation/native'
import { BookmarkMinus } from '@tamagui/lucide-icons'
import { debounce } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Tabs, Text, useTheme } from 'tamagui'

import AllAgentsTab from '@/components/agent/market/allAgentsTab'
import CategoryAgentsTab from '@/components/agent/market/categoryAgentsTab'
import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { SearchInput } from '@/components/ui/searchInput'
import { getSystemAgents } from '@/mock'
import { groupByCategories } from '@/utils/agents'
interface TabConfig {
  value: string
  label: string
}

type FilterType = 'all' | string

export default function AgentMarketPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()

  const [actualFilterType, setActualFilterType] = useState<FilterType>('all')
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')

  const systemAgents = useMemo(() => getSystemAgents(), [])

  const debouncedSetSearchText = useMemo(() => debounce(setDebouncedSearchText, 300), [])

  useEffect(() => {
    debouncedSetSearchText(searchText)

    return () => {
      debouncedSetSearchText.cancel()
    }
  }, [searchText, debouncedSetSearchText])

  // Filter agents by search text first
  const baseFilteredAgents = useMemo(() => {
    if (!debouncedSearchText) {
      return systemAgents
    }

    const lowerSearchText = debouncedSearchText.toLowerCase().trim()

    if (!lowerSearchText) {
      return systemAgents
    }

    return systemAgents.filter(
      agent =>
        (agent.name && agent.name.toLowerCase().includes(lowerSearchText)) ||
        (agent.id && agent.id.toLowerCase().includes(lowerSearchText))
    )
  }, [systemAgents, debouncedSearchText])

  const agentGroupsForDisplay = useMemo(() => groupByCategories(baseFilteredAgents), [baseFilteredAgents])

  const agentGroupsForTabs = useMemo(() => groupByCategories(systemAgents), [systemAgents])

  // 过滤代理逻辑 for CategoryAgentsTab
  const filterAgents = useMemo(() => {
    if (actualFilterType === 'all') {
      return baseFilteredAgents
    }

    return baseFilteredAgents.filter(agent => agent.group && agent.group.includes(actualFilterType))
  }, [actualFilterType, baseFilteredAgents])

  const tabConfigs = useMemo(() => {
    const groupKeys = Object.keys(agentGroupsForTabs).sort()

    const allTab: TabConfig = {
      value: 'all',
      label: t('agents.market.groups.all')
    }

    const dynamicTabs: TabConfig[] = groupKeys.map(groupKey => ({
      value: groupKey,
      label: t(`agents.market.groups.${groupKey}`, groupKey.charAt(0).toUpperCase() + groupKey.slice(1))
    }))

    return [allTab, ...dynamicTabs]
  }, [agentGroupsForTabs, t])

  const getTabStyle = useCallback(
    (tabValue: string) => ({
      height: '100%',
      backgroundColor: actualFilterType === tabValue ? '$background' : 'transparent',
      borderRadius: 15
    }),
    [actualFilterType]
  )

  const handleArrowClick = useCallback((groupKey: string) => {
    if (groupKey) {
      setActualFilterType(groupKey)
    }
  }, [])

  const handleBackPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const handleBookmarkPress = useCallback(() => {
    console.log('Bookmark pressed')
  }, [])

  const renderTabList = useMemo(
    () => (
      <Tabs.List gap={10} flexDirection="row" height={34}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabConfigs.map(({ value, label }) => (
            <Tabs.Tab key={value} value={value} {...getTabStyle(value)}>
              <Text>{label}</Text>
            </Tabs.Tab>
          ))}
        </ScrollView>
      </Tabs.List>
    ),
    [tabConfigs, getTabStyle]
  )

  const renderTabContents = useMemo(
    () => (
      <>
        <Tabs.Content value={'all'} flex={1}>
          <AllAgentsTab agentGroups={agentGroupsForDisplay} onArrowClick={handleArrowClick} />
        </Tabs.Content>
        {tabConfigs
          .filter(({ value }) => value !== 'all')
          .map(({ value }) => (
            <Tabs.Content key={value} value={value} flex={1}>
              <CategoryAgentsTab agents={filterAgents} />
            </Tabs.Content>
          ))}
      </>
    ),
    [tabConfigs, agentGroupsForDisplay, handleArrowClick, filterAgents]
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar
        title={t('agents.market.title')}
        onBackPress={handleBackPress}
        rightButton={{
          icon: <BookmarkMinus size={24} />,
          onPress: handleBookmarkPress
        }}
      />
      <SettingContainer>
        <SearchInput
          placeholder={t('agents.market.search_placeholder')}
          value={searchText}
          onChangeText={setSearchText}
        />

        <Tabs
          gap={10}
          defaultValue={'all'}
          value={actualFilterType}
          onValueChange={setActualFilterType}
          orientation="horizontal"
          flexDirection="column"
          flex={1}>
          {renderTabList}
          {/* TODO: 有时可以滚动有时不可以 */}
          {renderTabContents}
        </Tabs>
      </SettingContainer>
    </SafeAreaView>
  )
}
