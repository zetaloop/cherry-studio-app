import { AtSign } from '@tamagui/lucide-icons'
import React from 'react'
import { Button } from 'tamagui'

import { Model } from '@/types/assistant'

interface MentionButtonProps {
  mentions: Model[]
  setIsMentionSheetOpen: (isOpen: boolean) => void
}

export const MentionButton: React.FC<MentionButtonProps> = ({ mentions, setIsMentionSheetOpen }) => {
  return (
    <Button
      chromeless
      size={24}
      icon={<AtSign size={24} />}
      color={mentions.length > 0 ? 'rgba(0, 185, 107, 1)' : undefined}
      onPress={() => setIsMentionSheetOpen(true)}
    />
  )
}
