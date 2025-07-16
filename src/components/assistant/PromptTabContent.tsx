import { MotiView } from 'moti'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Input, TextArea, YStack } from 'tamagui'

import { SettingRowTitle } from '@/components/settings'
import { Assistant } from '@/types/assistant'

interface PromptTabContentProps {
  assistant: Assistant
  updateAssistant: (assistant: Assistant) => void
}

export function PromptTabContent({ assistant, updateAssistant }: PromptTabContentProps) {
  const { t } = useTranslation()

  return (
    <MotiView
      style={{ flex: 1, gap: 30 }}
      from={{ opacity: 0, translateY: 10 }}
      animate={{
        translateY: 0,
        opacity: 1
      }}
      exit={{ opacity: 1, translateY: -10 }}
      transition={{
        type: 'timing'
      }}>
      <YStack width="100%" gap={8}>
        <SettingRowTitle paddingHorizontal={10}>{t('common.name')}</SettingRowTitle>
        <Input
          height={49}
          padding={16}
          placeholder={t('assistants.name')}
          value={assistant?.name}
          onChangeText={name => updateAssistant({ ...assistant, name })}
        />
      </YStack>
      <YStack width="100%" gap={8} flex={1}>
        <SettingRowTitle paddingHorizontal={10}>{t('common.prompt')}</SettingRowTitle>
        <TextArea
          flex={1}
          padding={15}
          placeholder={t('common.prompt')}
          value={assistant?.prompt}
          multiline
          onChangeText={prompt => updateAssistant({ ...assistant, prompt })}
          verticalAlign="top"
        />
      </YStack>
    </MotiView>
  )
}
