import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { ChevronRight, Settings2 } from '@tamagui/lucide-icons'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { Button, Text, XStack, YStack } from 'tamagui'

import { SettingHelpText } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import ModelSheet from '@/components/sheets/ModelSheet'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useAssistant } from '@/hooks/useAssistant'
import { Assistant, Model } from '@/types/assistant'
import { NavigationProps } from '@/types/naviagate'

interface ModelPickerProps {
  assistant: Assistant
  onPress: () => void
}

function ModelPicker({ assistant, onPress }: ModelPickerProps) {
  const { t } = useTranslation()
  const model = assistant?.model

  return (
    <Button chromeless width="100%" onPress={onPress} iconAfter={<ChevronRight size={16} />} padding={0}>
      <XStack flex={1} alignItems="center" overflow="hidden" justifyContent="space-between">
        {model ? (
          <>
            <Text flexShrink={1} numberOfLines={1} ellipsizeMode="tail">
              {t(`provider.${model.provider}`)}
            </Text>
            <Text flexShrink={0} numberOfLines={1} maxWidth="60%" ellipsizeMode="tail">
              {model.name}
            </Text>
          </>
        ) : (
          <Text flex={1} numberOfLines={1} ellipsizeMode="tail">
            {t('settings.models.empty')}
          </Text>
        )}
      </XStack>
    </Button>
  )
}

export default function AssistantSettingsScreen() {
  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProps>()

  const { assistant: defaultAssistant, updateAssistant: updateDefaultAssistant } = useAssistant('default')
  const { assistant: topicNamingAssistant, updateAssistant: updateTopicNamingAssistant } = useAssistant('topic_naming')
  const { assistant: translateAssistant, updateAssistant: updateTranslateAssistant } = useAssistant('translate')

  const defaultSheetRef = useRef<BottomSheetModal>(null)
  const topicNamingSheetRef = useRef<BottomSheetModal>(null)
  const translateSheetRef = useRef<BottomSheetModal>(null)

  const handleModelChange = async (
    assistant: Assistant | undefined,
    updateAssistant: (assistant: Assistant) => Promise<void>,
    models: Model[]
  ) => {
    if (!assistant) return
    const newModel = models[0]
    await updateAssistant({ ...assistant, model: newModel })
  }

  if (!defaultAssistant || !topicNamingAssistant || !translateAssistant) {
    return (
      <SafeAreaContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </SafeAreaContainer>
    )
  }

  return (
    <SafeAreaContainer>
      <HeaderBar title={t('settings.assistant.title')} onBackPress={() => navigation.goBack()} />
      <YStack padding="$4" backgroundColor="$background" flex={1} gap={24}>
        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.assistant.default_assistant.name')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              backgroundColor="$colorTransparent"
              onPress={() => navigation.navigate('AssistantDetailScreen', { assistantId: 'default' })}
            />
          </XStack>
          <XStack>
            <ModelPicker assistant={defaultAssistant} onPress={() => defaultSheetRef.current?.present()} />
          </XStack>
          <SettingHelpText>{t('settings.assistant.default_assistant.description')}</SettingHelpText>
        </YStack>

        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.assistant.topic_naming_assistant.name')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              onPress={() => navigation.navigate('AssistantDetailScreen', { assistantId: 'topic_naming' })}
              backgroundColor="$colorTransparent"
            />
          </XStack>
          <XStack>
            <ModelPicker assistant={topicNamingAssistant} onPress={() => topicNamingSheetRef.current?.present()} />
          </XStack>
          <SettingHelpText>{t('settings.assistant.topic_naming_assistant.description')}</SettingHelpText>
        </YStack>

        <YStack gap={8}>
          <XStack justifyContent="space-between" height={20}>
            <Text>{t('settings.assistant.translate_assistant.name')}</Text>
            <Button
              size={14}
              icon={<Settings2 size={14} />}
              backgroundColor="$colorTransparent"
              onPress={() => navigation.navigate('AssistantDetailScreen', { assistantId: 'translate' })}
            />
          </XStack>
          <XStack>
            <ModelPicker assistant={translateAssistant} onPress={() => translateSheetRef.current?.present()} />
          </XStack>
          <SettingHelpText>{t('settings.assistant.translate_assistant.description')}</SettingHelpText>
        </YStack>
      </YStack>

      <ModelSheet
        ref={defaultSheetRef}
        mentions={defaultAssistant?.model ? [defaultAssistant.model] : []}
        setMentions={models => handleModelChange(defaultAssistant, updateDefaultAssistant, models)}
        multiple={false}
      />
      <ModelSheet
        ref={topicNamingSheetRef}
        mentions={topicNamingAssistant?.model ? [topicNamingAssistant.model] : []}
        setMentions={models => handleModelChange(topicNamingAssistant, updateTopicNamingAssistant, models)}
        multiple={false}
      />
      <ModelSheet
        ref={translateSheetRef}
        mentions={translateAssistant?.model ? [translateAssistant.model] : []}
        setMentions={models => handleModelChange(translateAssistant, updateTranslateAssistant, models)}
        multiple={false}
      />
    </SafeAreaContainer>
  )
}
