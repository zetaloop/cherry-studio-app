import { Check, ChevronRight } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Adapt, Select, Sheet, Text } from 'tamagui' // Added Text, XStack

import { Assistant } from '@/types/assistant'

interface ReasoningSelectProps {
  assistant?: Assistant | null
  onValueChange?: (value: string) => void
}

export function ReasoningSelect({ assistant, onValueChange }: ReasoningSelectProps) {
  const { t } = useTranslation()
  const [value, setValue] = useState<string | undefined>(assistant?.settings?.reasoning_effort || 'auto')

  const selectOptions = [
    {
      label: 'Reasoning Effort',
      options: [
        { value: 'auto', label: 'Auto' },
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    }
  ]

  const handleValueChange = (newValue: string) => {
    setValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <Select value={value} onValueChange={handleValueChange}>
      <Select.Trigger width="30%" backgroundColor="$colorTransparent" borderWidth={0} iconAfter={ChevronRight}>
        <Text
          fontSize={12}
          backgroundColor="$backgroundGreen"
          color="$foregroundGreen"
          paddingHorizontal={5}
          borderRadius={5}>
          {t(`assistants.settings.reasoning.${value}`)}
        </Text>
      </Select.Trigger>

      <Adapt platform="touch">
        <Sheet native modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.Viewport>
          {selectOptions.map((group, groupIndex) => (
            <Select.Group key={group.label || groupIndex}>
              <Select.Label>{group.label}</Select.Label>
              {group.options.map((item, itemIndex) => {
                return (
                  <Select.Item index={itemIndex} key={item.value} value={item.value}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                )
              })}
            </Select.Group>
          ))}
        </Select.Viewport>
      </Select.Content>
    </Select>
  )
}
