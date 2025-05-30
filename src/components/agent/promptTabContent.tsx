import React from 'react'
import { useTranslation } from 'react-i18next'
import { Input, TextArea, YStack } from 'tamagui'

import { SettingRowTitle } from '@/components/settings'
import { Agent } from '@/types/agent'

interface PromptTabContentProps {
  agent?: Agent | null
}

export function PromptTabContent({ agent }: PromptTabContentProps) {
  const { t } = useTranslation()

  return (
    <YStack flex={1} gap={30}>
      <YStack width="100%" gap={8}>
        <SettingRowTitle paddingHorizontal={10}>{t('common.name')}</SettingRowTitle>
        <Input padding={15} placeholder={t('agents.name')} value={agent?.name} />
      </YStack>
      <YStack width="100%" gap={8} flex={1}>
        <SettingRowTitle paddingHorizontal={10}>{t('common.prompt')}</SettingRowTitle>
        <TextArea flex={1} padding={15} placeholder={t('common.prompt')} value={agent?.prompt} multiline />
      </YStack>
    </YStack>
  )
}
