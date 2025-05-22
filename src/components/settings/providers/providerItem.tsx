import { ChevronRight } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, XStack } from 'tamagui'

import { Provider } from '@/types/agent'

import { ProviderIcon } from './providerIcon'

interface ProviderItemProps {
  provider: Provider
}

export const ProviderItem: React.FC<ProviderItemProps> = ({ provider }) => {
  const { t } = useTranslation()
  return (
    <XStack height={45} paddingVertical={12} paddingHorizontal={16} alignItems="center" justifyContent="space-between">
      <XStack gap={5} alignItems="center">
        <ProviderIcon provider={provider} />
        <Text>{provider.name}</Text>
      </XStack>
      <XStack gap={10} alignItems="center">
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
