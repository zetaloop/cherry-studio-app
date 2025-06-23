import { SquarePen } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, XStack } from 'tamagui'

import { createNewTopic } from '@/services/AssistantService'
import { Assistant } from '@/types/assistant'

interface NewTopicButtonProps {
  assistant: Assistant
}

export const NewTopicButton: React.FC<NewTopicButtonProps> = ({ assistant }) => {
  const { t } = useTranslation()

  const handleAddNewTopic = async () => {
    await createNewTopic(assistant)
    // todo navigate to home screen with new topic
  }

  return (
    <XStack alignItems="center" justifyContent="flex-end">
      <Button size={24} circular chromeless icon={<SquarePen size={24} />} onPress={handleAddNewTopic} />
    </XStack>
  )
}
