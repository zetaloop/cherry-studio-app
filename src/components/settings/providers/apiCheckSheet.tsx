import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { ChevronsRight } from '@tamagui/lucide-icons'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, useTheme, XStack, YStack } from 'tamagui'

import { Model } from '@/types/agent'
import { getModelUniqId } from '@/utils/model'

import { ModelSelect } from './modelSelect'

interface ApiCheckSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>
  isOpen: boolean
  onClose: () => void
  selectedModel: Model | undefined
  onModelChange: (value: string) => void
  selectOptions: {
    label: string
    title: string
    options: {
      label: string
      value: string
      model: Model
    }[]
  }[]
  apiKey: string
  onStartModelCheck: () => void
}

export function ApiCheckSheet({
  bottomSheetRef,
  isOpen,
  onClose,
  selectedModel,
  onModelChange,
  selectOptions,
  apiKey,
  onStartModelCheck
}: ApiCheckSheetProps) {
  const { t } = useTranslation()
  const theme = useTheme()
  const snapPoints = useMemo(() => ['32%'], [])

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={onClose}
      backgroundStyle={{
        backgroundColor: theme.gray2.val
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.color.val
      }}>
      <BottomSheetView style={{ flex: 1 }}>
        <YStack alignItems="center" paddingTop={10} paddingBottom={30} paddingHorizontal={20} gap={10}>
          <XStack width="100%" alignItems="center" justifyContent="center">
            <Text fontSize={24}>{t('settings.provider.api_check.title')}</Text>
          </XStack>

          <YStack width="100%" gap={5}>
            <Text>{t('settings.provider.api_check.tooltip')}</Text>
            <ModelSelect
              value={selectedModel ? getModelUniqId(selectedModel) : undefined}
              onValueChange={onModelChange}
              selectOptions={selectOptions}
              placeholder={t('settings.models.empty')}
            />
          </YStack>

          <XStack width="100%" alignItems="center" justifyContent="center">
            <Button
              height={60}
              width={224}
              borderRadius={70}
              backgroundColor="$color1"
              disabled={!selectedModel || !apiKey}
              onPress={onStartModelCheck}>
              <XStack width="100%" alignItems="center" justifyContent="space-between">
                <Text fontSize={18} fontWeight="bold">
                  {t('button.start_check_model')}
                </Text>
                <ChevronsRight />
              </XStack>
            </Button>
          </XStack>
        </YStack>
      </BottomSheetView>
    </BottomSheet>
  )
}
