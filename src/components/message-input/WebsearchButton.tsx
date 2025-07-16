import { Globe } from '@tamagui/lucide-icons'
import React from 'react'
import { Button } from 'tamagui'

import { Assistant } from '@/types/assistant'
import { useIsDark } from '@/utils'
import { getGreenColor } from '@/utils/color'

interface WebsearchButtonProps {
  assistant: Assistant
  updateAssistant: (assistant: Assistant) => Promise<void>
}

export const WebsearchButton: React.FC<WebsearchButtonProps> = ({ assistant, updateAssistant }) => {
  const isDark = useIsDark()

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
      color={assistant.enableWebSearch ? getGreenColor(isDark, 100) : undefined}
    />
  )
}
