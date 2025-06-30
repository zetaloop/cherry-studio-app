import { useNavigation } from '@react-navigation/native'
import { ChevronRight, RotateCw } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TextArea, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { CustomSwitch } from '@/components/ui/Switch'
import { languagesOptions } from '@/config/languages'
import { useSettings } from '@/hooks/useSettings'
import { NavigationProps } from '@/types/naviagate'

export default function TranslateModelSettingsScreen() {
  const navigation = useNavigation<NavigationProps>()
  const { t } = useTranslation()
  const { translateModelSetting, setTranslateModelSetting } = useSettings()

  let content

  if (translateModelSetting.specifyLanguage) {
    content = (
      <SettingGroup>
        <SettingRow>
          <XStack justifyContent="space-between" flex={1}>
            <Text>{t('settings.models.translate_model_settings.hint.specify_language')}</Text>
            <CustomSwitch
              checked={translateModelSetting.specifyLanguage}
              onCheckedChange={() =>
                setTranslateModelSetting({
                  ...translateModelSetting,
                  specifyLanguage: !translateModelSetting.specifyLanguage
                })
              }
            />
          </XStack>
        </SettingRow>

        <SettingRow onPress={() => navigation.navigate('TranslateLanguageChooseScreen', { mode: 'target' })}>
          <XStack justifyContent="space-between" flex={1}>
            <Text>{t('settings.models.translate_model_settings.hint.target_language')}</Text>
            <XStack alignItems="center">
              {translateModelSetting.targetLanguage && (
                <XStack alignItems="center" gap={4}>
                  <Text>
                    {languagesOptions.find(lang => lang.value === translateModelSetting.targetLanguage)?.flag}
                  </Text>
                  <Text>
                    {languagesOptions.find(lang => lang.value === translateModelSetting.targetLanguage)?.label ||
                      translateModelSetting.targetLanguage}
                  </Text>
                </XStack>
              )}
              <ChevronRight size={24} color="$colorFocus" />
            </XStack>
          </XStack>
        </SettingRow>
        <SettingRow onPress={() => navigation.navigate('TranslateLanguageChooseScreen', { mode: 'source' })}>
          <XStack justifyContent="space-between" flex={1}>
            <Text>{t('settings.models.translate_model_settings.hint.local_language')}</Text>
            <XStack alignItems="center">
              <XStack alignItems="center" gap={4}>
                <Text>{languagesOptions.find(lang => lang.value === translateModelSetting.sourceLanguage)?.flag}</Text>
                <Text>
                  {languagesOptions.find(lang => lang.value === translateModelSetting.sourceLanguage)?.label ||
                    translateModelSetting.sourceLanguage}
                </Text>
              </XStack>
              <ChevronRight size={24} color="$colorFocus" />
            </XStack>
          </XStack>
        </SettingRow>
      </SettingGroup>
    )
  } else {
    content = (
      <SettingGroup>
        <SettingRow>
          <XStack justifyContent="space-between" flex={1}>
            <Text>{t('settings.models.translate_model_settings.hint.specify_language')}</Text>
            <CustomSwitch
              checked={translateModelSetting.specifyLanguage}
              onCheckedChange={() =>
                setTranslateModelSetting({
                  ...translateModelSetting,
                  specifyLanguage: !translateModelSetting.specifyLanguage
                })
              }
            />
          </XStack>
        </SettingRow>
      </SettingGroup>
    )
  }

  return (
    <SafeAreaContainer>
      <HeaderBar title={t('settings.models.translate_model_settings.title')} onBackPress={() => navigation.goBack()} />
      <SettingContainer>
        <YStack flex={1} paddingTop={24} gap={8}>
          <XStack height={20}>
            <SettingGroupTitle>{t('settings.models.translate_model_settings.hint.assistant')}</SettingGroupTitle>
          </XStack>
          {content}
          {translateModelSetting.specifyLanguage && (
            <YStack flex={1} gap={8}>
              <XStack paddingHorizontal={10} height={20} justifyContent="space-between">
                <Text>{t('settings.models.translate_model_settings.hint.prompt')}</Text>
                <RotateCw size={12} />
              </XStack>
              <TextArea
                flex={1}
                maxHeight={'60%'}
                value={translateModelSetting.prompt}
                onChangeText={text => setTranslateModelSetting({ ...translateModelSetting, prompt: text })}
              />
            </YStack>
          )}
        </YStack>
      </SettingContainer>
    </SafeAreaContainer>
  )
}
