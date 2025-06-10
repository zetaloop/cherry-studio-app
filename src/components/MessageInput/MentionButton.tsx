import { AtSign } from '@tamagui/lucide-icons'
import React from 'react'
import { Button } from 'tamagui'

export const MentionButton: React.FC = () => {
  return <Button chromeless size={24} icon={<AtSign size={24} />} />
}
