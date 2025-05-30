import { Check, ChevronRight } from '@tamagui/lucide-icons'
import React from 'react'
import { Adapt, Select, Sheet, Text, XStack } from 'tamagui' // Added Text, XStack

interface SelectOptionItem<T = any> {
  label: string
  value: string
  data?: T
}

interface SelectOptionGroup<T = any> {
  label: string
  title?: string
  options: SelectOptionItem<T>[]
}

interface ISelectProps<T = any> {
  value: string | undefined
  onValueChange: (value: string, item?: SelectOptionItem<T>) => void
  selectOptions: SelectOptionGroup<T>[]
  placeholder: string
  width?: string | number
  native?: boolean
}

export function ISelect<T = any>({
  value,
  onValueChange,
  selectOptions,
  placeholder,
  width = '100%',
  native = true
}: ISelectProps<T>) {
  const findSelectedItem = (selectedValue: string): SelectOptionItem<T> | undefined => {
    for (const group of selectOptions) {
      const item = group.options.find(option => option.value === selectedValue)
      if (item) return item
    }

    return undefined
  }

  const handleValueChange = (newValue: string) => {
    const selectedItem = findSelectedItem(newValue)
    onValueChange(newValue, selectedItem)
  }

  const [selectedDisplayInfo, setSelectedDisplayInfo] = React.useState<{
    groupLabel: string
    itemLabel: string
  } | null>(null)

  React.useEffect(() => {
    if (value) {
      for (const group of selectOptions) {
        const item = group.options.find(option => option.value === value)

        if (item) {
          setSelectedDisplayInfo({ groupLabel: group.label, itemLabel: item.label })
          return
        }
      }
    }

    setSelectedDisplayInfo(null)
  }, [value, selectOptions])

  return (
    <Select value={value} onValueChange={handleValueChange} native={native}>
      <Select.Trigger borderWidth={0} width={width} iconAfter={ChevronRight}>
        {selectedDisplayInfo ? (
          <XStack paddingVertical={8} flex={1} justifyContent="space-between" alignItems="center" gap="$2">
            <Text flexShrink={1} numberOfLines={1} ellipsizeMode="tail">
              {selectedDisplayInfo.groupLabel}
            </Text>
            <Text flexShrink={0} numberOfLines={1} maxWidth="60%" ellipsizeMode="tail">
              {selectedDisplayInfo.itemLabel}
            </Text>
          </XStack>
        ) : (
          <Select.Value paddingVertical={8} placeholder={placeholder} />
        )}
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
            <Select.Group key={group.title || group.label || groupIndex}>
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
