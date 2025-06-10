import { Mic } from '@tamagui/lucide-icons'
import React from 'react'
import { Button } from 'tamagui'

export const VoiceButton: React.FC = () => {
  return <Button chromeless size={24} icon={<Mic size={24} />} />
}
