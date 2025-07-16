import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { ChevronRight } from '@tamagui/lucide-icons'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { Button, Text, XStack, YStack } from 'tamagui'

import { useWebsearchProviders } from '@/hooks/useWebsearchProviders'
import { Assistant } from '@/types/assistant'

import { SettingGroup } from '../settings'
import WebsearchSheet from '../sheets/WebsearchSheet'
import SafeAreaContainer from '../ui/SafeAreaContainer'

interface ToolTabContentProps {
  assistant: Assistant
  updateAssistant: (assistant: Assistant) => void
}

export function ToolTabContent({ assistant, updateAssistant }: ToolTabContentProps) {
  const { t } = useTranslation()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const { apiProviders, isLoading } = useWebsearchProviders()
  const [providerId, setProviderId] = useState<string | undefined>(assistant.webSearchProviderId)

  useEffect(() => {
    updateAssistant({
      ...assistant,
      webSearchProviderId: providerId
    })
  }, [providerId])

  const handlePress = () => {
    bottomSheetModalRef.current?.present()
  }

  if (isLoading) {
    return (
      <SafeAreaContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </SafeAreaContainer>
    )
  }

  const provider = apiProviders.find(p => p.id === providerId)

  return (
    <YStack flex={1} gap={30}>
      <SettingGroup>
        <Button chromeless width="100%" onPress={handlePress}>
          <XStack flex={1} alignItems="center" overflow="hidden" justifyContent="space-between">
            <Text flexShrink={1} numberOfLines={1} ellipsizeMode="tail">
              {t('settings.websearch.provider.title')}
            </Text>
            <XStack maxWidth="45%" gap={5}>
              {provider ? (
                <Text flexShrink={0} numberOfLines={1} ellipsizeMode="tail">
                  {provider.name}
                </Text>
              ) : (
                <Text flex={1} numberOfLines={1} ellipsizeMode="tail">
                  {t('settings.websearch.empty')}
                </Text>
              )}
              <ChevronRight size={16} />
            </XStack>
          </XStack>
        </Button>
      </SettingGroup>
      <WebsearchSheet
        ref={bottomSheetModalRef}
        providerId={providerId}
        setProviderId={setProviderId}
        providers={apiProviders}
      />
    </YStack>
  )
}
