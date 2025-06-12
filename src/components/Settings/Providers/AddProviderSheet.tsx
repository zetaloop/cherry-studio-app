import BottomSheet from '@gorhom/bottom-sheet' // Keep this if bottomSheetRef type is needed, or import type directly
import { PenLine } from '@tamagui/lucide-icons'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, Text, XStack, YStack } from 'tamagui'

import { AvatarEditButton } from '@/components/UI/AvatarEditButton'
import { ISheet } from '@/components/UI/Sheet'
import { DefaultProviderIcon } from '@/components/UI/SvgIcons'

import { ProviderSelect } from './ProviderSelect'

interface AddProviderSheetProps {
  bottomSheetRef: React.RefObject<BottomSheet | null>
  isOpen: boolean
  onClose: () => void
  providerName: string
  onProviderNameChange: (name: string) => void
  selectedProviderType: string | undefined
  onProviderTypeChange: (type: string) => void
  onAddProvider: () => void
}

export function AddProviderSheet({
  bottomSheetRef,
  isOpen,
  onClose,
  providerName,
  onProviderNameChange,
  selectedProviderType,
  onProviderTypeChange,
  onAddProvider
}: AddProviderSheetProps) {
  const { t } = useTranslation()
  const snapPoints = useMemo(() => ['55%'], [])

  return (
    <ISheet bottomSheetRef={bottomSheetRef} isOpen={isOpen} onClose={onClose} snapPoints={snapPoints}>
      <YStack alignItems="center" paddingTop={10} paddingBottom={30} paddingHorizontal={20} gap={10}>
        <XStack width="100%" alignItems="center" justifyContent="center">
          <Text fontSize={24}>{t('settings.provider.add.title')}</Text>
        </XStack>
        <YStack width="100%" gap={24} justifyContent="center" alignItems="center">
          <AvatarEditButton
            content={<DefaultProviderIcon />}
            editIcon={<PenLine size={24} />}
            onEditPress={() => {
              // 处理编辑按钮点击事件
            }}
          />
          <YStack width="100%" gap={8}>
            <XStack gap={8}>
              <Text color="red">*</Text>
              <Text>{t('settings.provider.add.name')}</Text>
            </XStack>
            <Input
              placeholder={t('settings.provider.add.name.placeholder')}
              value={providerName}
              onChangeText={onProviderNameChange}
            />
          </YStack>
          <ProviderSelect
            value={selectedProviderType}
            onValueChange={onProviderTypeChange}
            placeholder={t('settings.provider.add.type')}
          />
          <Button
            height={44}
            width={216}
            borderRadius={15}
            paddingVertical={10}
            paddingHorizontal={15}
            fontSize={16}
            onPress={onAddProvider}>
            {t('settings.provider.add.title')}
          </Button>
        </YStack>
      </YStack>
    </ISheet>
  )
}
