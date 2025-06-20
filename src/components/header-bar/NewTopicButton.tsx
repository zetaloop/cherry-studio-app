import { SquarePen } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, XStack } from 'tamagui'

export const NewTopicButton: React.FC = () => {
  const { t } = useTranslation()

  return (
    <XStack alignItems="center" justifyContent="flex-end">
      <Button size={24} circular chromeless icon={<SquarePen size={24} />} />
    </XStack>
  )
}
