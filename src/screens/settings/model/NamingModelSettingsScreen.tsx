import { useNavigation } from '@react-navigation/native'
import { RotateCw } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextArea, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { CustomSwitch } from '@/components/ui/Switch'
import { useSettings } from '@/hooks/useSettings'

export default function NamingModelSettingsScreen() {
  const { t } = useTranslation()
  const { topicNamingSetting, setTopicNamingSetting } = useSettings()

  const navigation = useNavigation()

  return (
    <SafeAreaContainer>
      <HeaderBar title={t('settings.models.topic_naming_settings.title')} onBackPress={() => navigation.goBack()} />
      <SettingContainer>
        <YStack flex={1} paddingTop={24} gap={8}>
          <SettingRow>
            <Text>{t('settings.models.topic_naming_settings.hint.autonaming')}</Text>
            <CustomSwitch
              checked={topicNamingSetting.autoNaming}
              onCheckedChange={() =>
                setTopicNamingSetting({ ...topicNamingSetting, autoNaming: !topicNamingSetting.autoNaming })
              }></CustomSwitch>
          </SettingRow>

          <XStack paddingHorizontal={10} height={20} justifyContent="space-between">
            <Text>{t('settings.models.topic_naming_settings.hint.prompt')}</Text>
            <RotateCw size={12} />
          </XStack>
          <TextArea
            flex={1}
            maxHeight={'60%'}
            value={topicNamingSetting.prompt}
            onChangeText={text => setTopicNamingSetting({ ...topicNamingSetting, prompt: text })}
          />
        </YStack>
      </SettingContainer>
    </SafeAreaContainer>
  )
}
