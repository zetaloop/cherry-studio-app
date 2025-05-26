import { useNavigation } from '@react-navigation/native'
import { Plus } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, useTheme, YStack } from 'tamagui'

import { SettingContainer, SettingGroupTitle } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { EmptyModelView } from '@/components/settings/providers/emptyModelView'
import { ProviderItem } from '@/components/settings/providers/providerItem'
import { SearchInput } from '@/components/ui/searchInput'
import { useAllProviders } from '@/hooks/use-providers'
import { NavigationProps } from '@/types/naviagate'

export default function ProvidersPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const [searchQuery, setSearchQuery] = useState('')

  const { providers } = useAllProviders()

  const onAddProvider = () => {
    navigation.navigate('ProviderListPage')
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.val
      }}>
      <HeaderBar
        title={t('settings.provider.title')}
        onBackPress={() => navigation.goBack()}
        rightButton={{
          icon: <Plus size={24} />,
          onPress: onAddProvider
        }}
      />
      <SettingContainer>
        <SearchInput placeholder={t('settings.provider.search')} value={searchQuery} onChangeText={setSearchQuery} />

        {providers.length === 0 ? (
          <EmptyModelView onAddModel={onAddProvider} />
        ) : (
          <YStack gap={8} paddingVertical={8}>
            <SettingGroupTitle>{t('settings.provider.title')}</SettingGroupTitle>
            <ScrollView
              backgroundColor="$gray2"
              borderRadius={9}
              contentContainerStyle={{
                paddingTop: 2
              }}>
              {/* 此处providers应该显示key检测通过 但可能未开启 */}
              {providers
                .filter(p => p.checked)
                .map(p => (
                  <ProviderItem key={p.id} provider={p} mode="enabled" />
                ))}
            </ScrollView>
          </YStack>
        )}
      </SettingContainer>
    </SafeAreaView>
  )
}
