import { useNavigation } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, useTheme, YStack } from 'tamagui'

import { SettingContainer } from '@/components/Settings'
import { HeaderBar } from '@/components/Settings/HeaderBar'
import { NavigationProps } from '@/types/naviagate'
import { SubscribeSource } from '@/types/websearch'

import BlacklistSection from './blacklist'
import GeneralSettings from './general-settings'
import ProviderSection from './websearch-provider'

const blacklistSubscription: SubscribeSource[] = [{ key: 1, url: 'https://git.io/ublacklist', name: 'git.io' }]

export default function WebSearchSettingsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()

  // General settings state
  const [searchWithDates, setSearchWithDates] = useState<boolean>(true)
  const [overrideSearchService, setOverrideSearchService] = useState<boolean>(true)
  const [searchCount, setSearchCount] = useState<number>(6)
  const [contentLimit, setContentLimit] = useState<string>('2000')

  // Blacklist state
  const [blacklistText, setBlacklistText] = useState<string>('')

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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <HeaderBar title={t('settings.websearch.title')} onBackPress={() => navigation.goBack()} />
        <ScrollView flex={1}>
          <SettingContainer>
            <YStack gap={24} flex={1}>
              <ProviderSection />

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
