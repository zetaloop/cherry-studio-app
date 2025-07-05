import { Check } from '@tamagui/lucide-icons'
import { FC } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, View, XStack, YStack } from 'tamagui'

import {
  MdiLightbulbAutoOutline,
  MdiLightbulbOn10,
  MdiLightbulbOn50,
  MdiLightbulbOn90
} from '@/components/icons/MdiLightbulbIcon'
import { ISheet } from '@/components/ui/Sheet'
import { ReasoningEffortOptions } from '@/types/assistant'

interface ThinkSheetProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  reasoningEffort: ReasoningEffortOptions | undefined
  setReasoningEffort: (options: ReasoningEffortOptions) => void
}

const ThinkSheet: FC<ThinkSheetProps> = ({ isOpen, setIsOpen, reasoningEffort, setReasoningEffort }) => {
  const { t } = useTranslation()

  const handleSelect = (option: ReasoningEffortOptions) => {
    setReasoningEffort(option)
    setIsOpen(false)
  }

  const options = [
    {
      value: 'auto' as ReasoningEffortOptions,
      label: t('assistants.settings.reasoning.auto'),
      icon: <MdiLightbulbAutoOutline />
    },
    {
      value: 'high' as ReasoningEffortOptions,
      label: t('assistants.settings.reasoning.high'),
      icon: <MdiLightbulbOn90 />
    },
    {
      value: 'medium' as ReasoningEffortOptions,
      label: t('assistants.settings.reasoning.medium'),
      icon: <MdiLightbulbOn50 />
    },
    {
      value: 'low' as ReasoningEffortOptions,
      label: t('assistants.settings.reasoning.low'),
      icon: <MdiLightbulbOn10 />
    }
  ]

  return (
    <ISheet isOpen={isOpen} onClose={() => setIsOpen(false)} snapPoints={['50%']}>
      <YStack gap={10} padding="20">
        {options.map(option => (
          <Button
            key={option.value}
            icon={option.icon}
            onPress={() => handleSelect(option.value)}
            justifyContent="space-between"
            chromeless>
            <XStack flex={1} justifyContent="space-between" alignItems="center">
              <Text>{option.label}</Text>
              {reasoningEffort === option.value ? <Check size={20} /> : <View width={20} />}
            </XStack>
          </Button>
        ))}
      </YStack>
    </ISheet>
  )
}

export default ThinkSheet
