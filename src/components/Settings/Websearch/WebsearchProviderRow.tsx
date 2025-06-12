import { useNavigation } from '@react-navigation/native'
import { ChevronRight } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, XStack } from 'tamagui'

import { WebsearchProviderIcon } from '@/components/UI/WebsearchIcon'
import { NavigationProps } from '@/types/naviagate'
import { WebSearchProvider } from '@/types/websearch'

import { SettingRow } from '..'
interface WebsearchProviderRowProps {
  provider: WebSearchProvider
  // google, bing or baidu not need expended
  need_config?: boolean
}

export const WebsearchProviderRow = ({ provider, need_config }: WebsearchProviderRowProps) => {
  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProps>()

  const onPress = () => {
    if (!need_config) return
    navigation.navigate('WebsearchProviderSettingsPage', { providerId: provider.id })
  }

  return (
    <SettingRow onPress={onPress}>
      <XStack gap={5}>
        <WebsearchProviderIcon provider={provider} />
        <Text>{provider.name}</Text>
      </XStack>
      <XStack gap={10}>
        {provider.apiKey && (
          <Text
            borderRadius={8}
            backgroundColor="$backgroundGreen"
            color="$foregroundGreen"
            paddingVertical={2}
            paddingHorizontal={8}
            justifyContent="center"
            alignItems="center">
            {t('common.added')}
          </Text>
        )}
        {need_config && <ChevronRight />}
      </XStack>
    </SettingRow>
  )
}
