import { useNavigation } from '@react-navigation/native'
import { ChevronRight } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, XStack } from 'tamagui'

import { Provider } from '@/types/agent'
import { NavigationProps } from '@/types/naviagate'

import { ProviderIcon } from '../../ui/providerIcon'

interface ProviderItemProps {
  provider: Provider
}

export const ProviderItem: React.FC<ProviderItemProps> = ({ provider }) => {
  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProps>()

  return (
    <XStack
      height={45}
      paddingVertical={12}
      paddingHorizontal={16}
      alignItems="center"
      justifyContent="space-between"
      onPress={() => navigation.navigate('ProviderSettingsPage', { providerId: provider.id })}
      pressStyle={{ opacity: 0.8 }}
      hoverStyle={{ backgroundColor: '$backgroundHover' }}>
      <XStack gap={5} alignItems="center">
        <ProviderIcon provider={provider} />
        <Text>{provider.name}</Text>
      </XStack>
      <XStack gap={10} alignItems="center">
        {/* todo 弄清楚added文本的含义 added !== enabled */}
        {provider.enabled && (
          <Text
            paddingVertical={2}
            paddingHorizontal={8}
            borderRadius={8}
            backgroundColor="$gray4"
            fontWeight="bold"
            fontSize={14}>
            {t('settings.provider.enabled')}
          </Text>
        )}
        <ChevronRight color="$white9" width={6} height={12} />
      </XStack>
    </XStack>
  )
}
