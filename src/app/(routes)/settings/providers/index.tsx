import { useNavigation } from '@react-navigation/native'
import { Plus } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, useTheme, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle } from '@/components/Settings'
import { HeaderBar } from '@/components/Settings/HeaderBar'
import { EmptyModelView } from '@/components/Settings/Providers/EmptyModelView'
import { ProviderItem } from '@/components/Settings/Providers/ProviderItem'
import CustomRadialGradientBackground from '@/components/UI/CustomRadialGradientBackground'
import { SearchInput } from '@/components/UI/SearchInput'
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
          <YStack flex={1} gap={8} paddingVertical={8}>
            <SettingGroupTitle>{t('settings.provider.title')}</SettingGroupTitle>
            <CustomRadialGradientBackground style={{ radius: 2 }}>
              <ScrollView backgroundColor="$colorTransparent">
                <SettingGroup>
                  {providers
                    .filter(p => p.checked)
                    .map(p => (
                      <ProviderItem key={p.id} provider={p} mode="enabled" />
                    ))}
                </SettingGroup>
              </ScrollView>
            </CustomRadialGradientBackground>
          </YStack>
        )}
      </SettingContainer>
    </SafeAreaView>
  )
}
