import { Plus } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, XStack } from 'tamagui'
import { useRightSectionController } from '../hooks/useRightSectionController'

export const RightSection: React.FC = () => {
  const { t } = useTranslation()
  const { createNewTopicHandler } = useRightSectionController()

  return (
    <XStack alignItems="center" justifyContent="flex-end">
      <Button
        size="$3"
        circular
        backgroundColor="$blue9"
        icon={<Plus size={20} color="white" />}
        onPress={createNewTopicHandler}
      />
    </XStack>
  )
}
