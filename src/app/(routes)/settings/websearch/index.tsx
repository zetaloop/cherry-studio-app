import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, useTheme, YStack } from 'tamagui'

import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { SubscribeSource } from '@/types/websearch'

import BlacklistSection from './blacklist'
import GeneralSettings from './general-settings'
import ProviderSection from './websearc-provider'

const selectOptions = [
  {
    label: 'Free Service Provider',
    options: [
      { label: 'Google', value: 'google' },
      { label: 'Bing', value: 'bing' },
      { label: 'Baidu', value: 'baidu' }
    ]
  },
  {
    label: 'API Service Provider',
    options: [
      { label: 'Tavily', value: 'tavily' },
      { label: 'Exa', value: 'exa' },
      { label: 'Searxng', value: 'searxng' }
    ]
  }
]

const blacklistSubscription: SubscribeSource[] = [{ key: 1, url: 'https://git.io/ublacklist', name: 'git.io' }]

export default function WebSearchSettingsPage() {
  const { t } = useTranslation()
  const theme = useTheme()

  // Provider state
  const [selectedProvider, setSelectedProvider] = useState<string | undefined>(undefined)

  // General settings state
  const [searchWithDates, setSearchWithDates] = useState<boolean>(true)
  const [overrideSearchService, setOverrideSearchService] = useState<boolean>(true)
  const [searchCount, setSearchCount] = useState<number>(6)
  const [contentLimit, setContentLimit] = useState<string>('2000')

  // Blacklist state
  const [blacklistText, setBlacklistText] = useState<string>('')

  // Provider handlers
  const handleProviderChange = useCallback((value: string | null) => {
    if (value) {
      setSelectedProvider(value)
      console.log('Selected web search provider:', value)
    }
  }, [])

  // General settings handlers
  const handleSearchCountChange = useCallback((value: number[]) => {
    setSearchCount(value[0])
  }, [])

  // Blacklist handlers
  const handleRefreshSubscription = useCallback((subscribe: SubscribeSource) => {
    console.log('Refreshing subscription for:', subscribe)
  }, [])

  const handleRefreshAllSubscriptions = useCallback(() => {
    console.log('Refreshing all subscriptions')
  }, [])

  const handleAddSubscription = useCallback(() => {
    console.log('Adding new subscription')
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={t('settings.websearch.title')} />
      <ScrollView flex={1}>
        <SettingContainer>
          <YStack gap={24} flex={1}>
            <ProviderSection
              selectedProvider={selectedProvider}
              onProviderChange={handleProviderChange}
              selectOptions={selectOptions}
            />

            <GeneralSettings
              searchWithDates={searchWithDates}
              onSearchWithDatesChange={setSearchWithDates}
              overrideSearchService={overrideSearchService}
              onOverrideSearchServiceChange={setOverrideSearchService}
              searchCount={searchCount}
              onSearchCountChange={handleSearchCountChange}
              contentLimit={contentLimit}
              onContentLimitChange={setContentLimit}
            />

            <BlacklistSection
              blacklistText={blacklistText}
              onBlacklistTextChange={setBlacklistText}
              subscriptions={blacklistSubscription}
              onRefreshSubscription={handleRefreshSubscription}
              onRefreshAllSubscriptions={handleRefreshAllSubscriptions}
              onAddSubscription={handleAddSubscription}
            />
          </YStack>
        </SettingContainer>
      </ScrollView>
    </SafeAreaView>
  )
}
