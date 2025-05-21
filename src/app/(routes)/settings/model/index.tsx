import { Edit3, Languages, MessageCircleMore, Settings } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, useTheme, XStack } from 'tamagui'

import { SettingContainer, SettingDescription, SettingGroup, SettingTitle } from '@/components/settings'
import { Select } from '@/components/ui/select'

const mock_models = [
  {
    label: 'gpt-4o',
    value: 'gpt-4o'
  },
  {
    label: 'gpt-4o-mini',
    value: 'gpt-4o-mini'
  },
  {
    label: 'o1-mini',
    value: 'o1-mini'
  },
  {
    label: 'o1-preview',
    value: 'o1-preview'
  }
]

export default function ModelSettingsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <SettingContainer>
        <SettingGroup>
          <SettingTitle>
            <XStack alignItems="center" gap={4}>
              <MessageCircleMore />
              <Text>{t('settings.models.default_assistant_model')}</Text>
            </XStack>
          </SettingTitle>
          <XStack gap={4}>
            <Select items={mock_models} placeholder={t('settings.models.empty')} />
            <Button icon={<Settings />} />
          </XStack>
          <SettingDescription>{t('settings.models.default_assistant_model_description')}</SettingDescription>
        </SettingGroup>

        <SettingGroup>
          <SettingTitle>
            <XStack alignItems="center" gap={4}>
              <Edit3 />
              <Text>{t('settings.models.topic_naming_model')}</Text>
            </XStack>
          </SettingTitle>
          <XStack gap={4}>
            <Select items={mock_models} placeholder={t('settings.models.empty')} />
            <Button icon={<Settings />} />
          </XStack>
          <SettingDescription>{t('settings.models.topic_naming_model_description')}</SettingDescription>
        </SettingGroup>

        <SettingGroup>
          <SettingTitle>
            <XStack alignItems="center" gap={4}>
              <Languages />
              <Text>{t('settings.models.translate_model')}</Text>
            </XStack>
          </SettingTitle>
          <XStack gap={4}>
            <Select items={mock_models} placeholder={t('settings.models.empty')} />
            <Button icon={<Settings />} />
          </XStack>
          <SettingDescription>{t('settings.models.translate_model_description')}</SettingDescription>
        </SettingGroup>
      </SettingContainer>
    </SafeAreaView>
  )
}
