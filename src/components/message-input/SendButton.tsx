import { Send } from '@tamagui/lucide-icons'
import React from 'react'
import { Button } from 'tamagui'

interface SendButtonProps {
  onSend: () => void
}

export const SendButton: React.FC<SendButtonProps> = ({ onSend }) => {
  return <Button chromeless size={24} icon={<Send size={24} />} onPress={onSend} />
}
