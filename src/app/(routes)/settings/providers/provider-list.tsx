import { useNavigation } from '@react-navigation/native'
import { ArrowLeft, Plus } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ScrollView, Text, useTheme, XStack, YStack } from 'tamagui'

import { ProviderItem } from '@/components/settings/providers/providerItem'
import { SearchInput } from '@/components/ui/searchInput'
import { useAllProviders } from '@/hooks/use-providers'

export default function ProviderListPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()

  const providers = useAllProviders()
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
      >
        <XStack justifyContent="space-between" alignItems="center">
          <Button
            size="$2"
            backgroundColor="$colorTransparent"
            circular
            icon={<ArrowLeft size={24} />}
            onPress={() => navigation.goBack()}
          />
          <Text fontSize="$6" fontWeight="bold">
            {t('settings.provider.list.title')}
          </Text>
          <Button
            size="$2"
            backgroundColor="$colorTransparent"
            circular
            icon={<Plus size={24} />}
            onPress={onAddProvider}
          />
        </XStack>
        <SearchInput placeholder={t('settings.provider.search')} value={searchQuery} onChangeText={setSearchQuery} />
        <YStack flex={1} gap={8}>
          <Text>{t('settings.provider.title')}</Text>
          <ScrollView
            flex={1}
            backgroundColor="$gray2"
            contentContainerStyle={{
              paddingTop: 2
            }}>
            {providers.map(p => (
              <ProviderItem key={p.id} provider={p} />
            ))}
          </ScrollView>
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
