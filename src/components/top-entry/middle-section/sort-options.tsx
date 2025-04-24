import { AlignCenter, Clock, Plus } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, RadioGroup, Separator, Text, XStack, YStack } from 'tamagui'
import { SortType } from '../../../store/top-entry'
import { useMiddleSectionController } from '../hooks/useMiddleSectionController'

interface SortOptionsProps {
  onClose: () => void
}

export const SortOptions: React.FC<SortOptionsProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const { assistantSortType, setSortType } = useMiddleSectionController()

  const handleSortChange = (value: string) => {
    setSortType(value as SortType)
    onClose()
  }

  return (
    <YStack gap="$3" width="100%">
      <Text fontSize="$4" fontWeight="600">
        {t('assistants.sort.title')}
      </Text>

      <Separator />

      <RadioGroup value={assistantSortType} onValueChange={handleSortChange}>
        <YStack gap="$2">
          <RadioGroup.Item value={SortType.ALPHABETICAL}>
            <XStack alignItems="center" gap="$2" paddingVertical="$1">
              <AlignCenter size={16} />
              <RadioGroup.Indicator />
              <Text>{t('assistants.sort.alphabetical')}</Text>
            </XStack>
          </RadioGroup.Item>

          <RadioGroup.Item value={SortType.RECENT_USE}>
            <XStack alignItems="center" gap="$2" paddingVertical="$1">
              <Clock size={16} />
              <RadioGroup.Indicator />
              <Text>{t('assistants.sort.recent_use')}</Text>
            </XStack>
          </RadioGroup.Item>

          <RadioGroup.Item value={SortType.RECENT_ADD}>
            <XStack alignItems="center" gap="$2" paddingVertical="$1">
              <Plus size={16} />
              <RadioGroup.Indicator />
              <Text>{t('assistants.sort.recent_add')}</Text>
            </XStack>
          </RadioGroup.Item>
        </YStack>
      </RadioGroup>

      <XStack justifyContent="flex-end" marginTop="$2">
        <Button
          size="$3"
          backgroundColor="$gray4"
          borderRadius="$4"
          onPress={onClose}>
          {t('common.cancel')}
        </Button>
      </XStack>
    </YStack>
  )
}
