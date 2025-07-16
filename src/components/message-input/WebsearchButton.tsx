import { Globe } from '@tamagui/lucide-icons'
import React from 'react'
import { Button } from 'tamagui'

import { Assistant } from '@/types/assistant'

interface WebsearchButtonProps {
  assistant: Assistant
  updateAssistant: (assistant: Assistant) => Promise<void>
}

export const WebsearchButton: React.FC<WebsearchButtonProps> = ({ assistant, updateAssistant }) => {
  const handlePress = () => {
    updateAssistant({
      ...assistant,
      enableWebSearch: !assistant.enableWebSearch
    })
  }

  return (
    <Button
      chromeless
      size={24}
      icon={<Globe size={24} />}
      onPress={handlePress}
      color={assistant.enableWebSearch ? '$colorBrand' : undefined}
    />
  )
}
