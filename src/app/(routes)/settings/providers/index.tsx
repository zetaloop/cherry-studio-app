import { useNavigation } from '@react-navigation/native'
import { Plus } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme, YStack } from 'tamagui'

import { HeaderBar } from '@/components/settings/headerBar'
import { EmptyModelView } from '@/components/settings/providers/emptyModelView'
import { SearchInput } from '@/components/ui/searchInput'
import { useWidth } from '@/hooks/use-width'
import { NavigationProps } from '@/types/naviagate'

const mock_providers = []

export default function ProvidersPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const [searchQuery, setSearchQuery] = useState('')

  const isLargeScreen = useWidth(768)

  const onAddModel = () => {
    navigation.navigate('ProviderListPage' as any)
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.val
      }}>
      <YStack backgroundColor="$background" flex={1} gap={24} padding="$4">
        <HeaderBar
          title={t('settings.provider.title')}
          onBackPress={() => navigation.goBack()}
          rightButton={{
            icon: <Plus size={24} />,
            onPress: onAddModel
          }}
        />

        <SearchInput placeholder={t('settings.provider.search')} value={searchQuery} onChangeText={setSearchQuery} />
        {mock_providers.length === 0 ? <EmptyModelView onAddModel={onAddModel} /> : <YStack />}
      </YStack>
    </SafeAreaView>
  )
}
