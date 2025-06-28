import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { Plus } from '@tamagui/lucide-icons'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, useTheme, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { EmptyModelView } from '@/components/settings/providers/EmptyModelView'
import { ProviderItem } from '@/components/settings/providers/ProviderItem'
import CustomRadialGradientBackground from '@/components/ui/CustomRadialGradientBackground'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { SearchInput } from '@/components/ui/SearchInput'
import { getAllProviders } from '@/services/ProviderService'
import { Provider } from '@/types/assistant'
import { NavigationProps } from '@/types/naviagate'
import { runAsyncFunction } from '@/utils'

export default function ProvidersScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const [searchQuery, setSearchQuery] = useState('')

  const [providers, setProviders] = useState<Provider[]>([])

  const onAddProvider = () => {
    navigation.navigate('ProviderListScreen')
  }

  const handleFocus = useCallback(() => {
    const fetchProviders = async () => {
      try {
        const allProviders = await getAllProviders()
        const enabledProviders = allProviders.filter(provider => provider.enabled === true)
        console.log('Fetching enabled providers on screen focus:', enabledProviders)
        setProviders(enabledProviders)
      } catch (error) {
        console.error('Failed to fetch providers on screen focus:', error)
      }
    }

    runAsyncFunction(fetchProviders)
  }, [])

  useFocusEffect(handleFocus)

  return (
    <SafeAreaContainer
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
          <YStack flex={1} gap={8} paddingVertical={8}>
            <SettingGroupTitle>{t('settings.provider.title')}</SettingGroupTitle>
            <CustomRadialGradientBackground style={{ radius: 2 }}>
              <ScrollView backgroundColor="$colorTransparent">
                <SettingGroup>
                  {providers.map(p => (
                    <ProviderItem key={p.id} provider={p} mode="enabled" />
                  ))}
                </SettingGroup>
              </ScrollView>
            </CustomRadialGradientBackground>
          </YStack>
        )}
      </SettingContainer>
    </SafeAreaContainer>
  )
}
