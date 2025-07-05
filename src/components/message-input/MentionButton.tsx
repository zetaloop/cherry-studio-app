import { AtSign } from '@tamagui/lucide-icons'
import React from 'react'
import { Button } from 'tamagui'

import { SheetType } from '@/screens/home/sheets'
import { Model } from '@/types/assistant'

interface MentionButtonProps {
  mentions: Model[]
  setActiveSheet: (sheet: SheetType | null) => void
}

export const MentionButton: React.FC<MentionButtonProps> = ({ mentions, setActiveSheet }) => {
  return (
    <Button
      chromeless
      size={24}
      icon={<AtSign size={24} />}
      color={mentions.length > 0 ? 'rgba(0, 185, 107, 1)' : undefined}
      onPress={() => setActiveSheet(SheetType.MENTION)}
    />
  )
}
