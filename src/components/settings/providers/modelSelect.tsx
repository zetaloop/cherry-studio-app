import { Check, ChevronRight } from '@tamagui/lucide-icons'
import React from 'react'
import { Adapt, Select, Sheet } from 'tamagui'

import { Model } from '@/types/agent'

interface SelectOptionItem {
  label: string
  value: string
  model: Model
}

interface SelectOptionGroup {
  label: string
  title?: string
  options: SelectOptionItem[]
}

interface ModelSelectProps {
  value: string | undefined
  onValueChange: (value: string) => void
  selectOptions: SelectOptionGroup[]
  placeholder: string
}

export function ModelSelect({ value, onValueChange, selectOptions, placeholder }: ModelSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange} native>
      <Select.Trigger width="100%" iconAfter={ChevronRight}>
        <Select.Value placeholder={placeholder} />
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
            <Select.Group key={group.title || groupIndex}>
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
