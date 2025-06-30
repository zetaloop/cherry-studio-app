import { useNavigation } from '@react-navigation/native'
import { Settings2 } from '@tamagui/lucide-icons'
import { sortBy } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, useTheme, XStack, YStack } from 'tamagui'

import { SettingHelpText } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { ModelSelect } from '@/components/settings/providers/ModelSelect'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { isEmbeddingModel } from '@/config/models/embedding'
import { useModel } from '@/hooks/useModel'
import { useAllProviders } from '@/hooks/useProviders'
import { Model } from '@/types/assistant'
import { NavigationProps } from '@/types/naviagate'
import { getModelUniqId } from '@/utils/model'

export default function ModelSettingsScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const { defaultModel, topicNamingModel, translateModel, setDefaultModel, setTopicNamingModel, setTranslateModel } =
    useModel()

  const { providers } = useAllProviders()
  const selectOptions = providers
    .filter(p => p.models && p.models.length > 0)
    .map(p => ({
      label: p.isSystem ? t(`provider.${p.id}`) : p.name,
      title: p.name,
      options: sortBy(p.models, 'name')
        .filter(m => !isEmbeddingModel(m))
        .map(m => ({
          label: `${m.name}`,
          value: getModelUniqId(m),
          model: m
        }))
    }))

  const handleModelChange = (value: string, setter: (model: Model) => void) => {
    if (!value) {
      return
    }

    const model = selectOptions.flatMap(group => group.options).find(opt => opt.value === value)?.model

    console.log('handleModelChange', value, model)

    if (model) {
      setter(model)
    }
  }

  return (
    <SafeAreaContainer>
      <HeaderBar title={t('settings.models.default_model')} onBackPress={() => navigation.goBack()} />
      <YStack padding="$4" backgroundColor="$background" flex={1} gap={24}>
        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.models.default_assistant_model')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              backgroundColor="$colorTransparent"
              onPress={() => navigation.navigate('AssistantDetailScreen', { assistantId: '0' })}
            />
          </XStack>
          <XStack>
            <ModelSelect
              value={defaultModel ? getModelUniqId(defaultModel) : undefined}
              onValueChange={val => handleModelChange(val, setDefaultModel)}
              selectOptions={selectOptions}
              placeholder={t('settings.models.empty')}
            />
          </XStack>
          <SettingHelpText>{t('settings.models.default_assistant_model_description')}</SettingHelpText>
        </YStack>

        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.models.topic_naming_model')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              onPress={() => navigation.navigate('NamingModelSettingsScreen')}
              backgroundColor="$colorTransparent"
            />
          </XStack>
          <XStack>
            <ModelSelect
              value={topicNamingModel ? getModelUniqId(topicNamingModel) : undefined}
              onValueChange={val => handleModelChange(val, setTopicNamingModel)}
              selectOptions={selectOptions}
              placeholder={t('settings.models.empty')}
            />
          </XStack>
          <SettingHelpText>{t('settings.models.topic_naming_model_description')}</SettingHelpText>
        </YStack>

        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.models.translate_model')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              backgroundColor="$colorTransparent"
              onPress={() => navigation.navigate('TranslateModelSettingsScreen')}
            />
          </XStack>
          <XStack>
            <ModelSelect
              value={translateModel ? getModelUniqId(translateModel) : undefined}
              onValueChange={val => handleModelChange(val, setTranslateModel)}
              selectOptions={selectOptions}
              placeholder={t('settings.models.empty')}
            />
          </XStack>
          <SettingHelpText>{t('settings.models.translate_model_description')}</SettingHelpText>
        </YStack>
      </YStack>
    </SafeAreaContainer>
  )
}
