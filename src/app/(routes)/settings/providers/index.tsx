// import { Link } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft, Plus } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, useTheme, XStack, YStack } from 'tamagui'

import { EmptyModelView } from '@/components/settings/providers/emptyModelView'
import { SearchInput } from '@/components/ui/searchInput'
import { useWidth } from '@/hooks/use-width'

const mock_providers = []

export default function ProviderSettingsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()
  const [searchQuery, setSearchQuery] = useState('')

  const isLargeScreen = useWidth(768)

  const onAddModel = () => {
    console.log('onAddModel')
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.val
      }}>
      <YStack backgroundColor="$background" flex={1} gap={24} padding="$4">
        <XStack justifyContent="space-between" alignItems="center">
          <Button
            size="$2"
            backgroundColor="$colorTransparent"
            circular
            icon={<ArrowLeft size={24} />}
            onPress={() => navigation.goBack()}
          />
          <Text fontSize="$6" fontWeight="bold">
            {t('settings.provider.title')}
          </Text>
          <Button
            size="$2"
            backgroundColor="$colorTransparent"
            circular
            icon={<Plus size={24} />}
            onPress={onAddModel}
          />
        </XStack>
        <SearchInput placeholder={t('settings.provider.search')} value={searchQuery} onChangeText={setSearchQuery} />
        {mock_providers.length === 0 ? <EmptyModelView onAddModel={onAddModel} /> : <YStack />}
      </YStack>
    </SafeAreaView>
  )
}
