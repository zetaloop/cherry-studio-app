import { useNavigation } from '@react-navigation/native'
import { Plus } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, useTheme, YStack } from 'tamagui'

import { HeaderBar } from '@/components/settings/headerBar'
import { ProviderItem } from '@/components/settings/providers/providerItem'
import { SearchInput } from '@/components/ui/searchInput'
import { useAllProviders } from '@/hooks/use-providers'

export default function ProviderListPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()

  const { providers } = useAllProviders()
  const [searchQuery, setSearchQuery] = useState('')

  const onAddProvider = () => {}

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{
        flex: 1,
        backgroundColor: theme.background.val
      }}>
      <YStack
        backgroundColor="$background"
        flex={1}
        gap={24}
        padding="$4"
        overflow="hidden" // 防止内容溢出
        onPress={Keyboard.dismiss}>
        <HeaderBar
          title={t('settings.provider.list.title')}
          onBackPress={() => navigation.goBack()}
          rightButton={{
            icon: <Plus size={24} />,
            onPress: onAddProvider
          }}
        />

        <SearchInput placeholder={t('settings.provider.search')} value={searchQuery} onChangeText={setSearchQuery} />
        <YStack flex={1} gap={8}>
          <Text>{t('settings.provider.title')}</Text>
          <ScrollView
            flex={1}
            borderRadius={9}
            backgroundColor="$gray2"
            contentContainerStyle={{
              paddingTop: 2
            }}>
            {providers.map(p => (
              <ProviderItem key={p.id} provider={p} mode="checked" />
            ))}
          </ScrollView>
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
