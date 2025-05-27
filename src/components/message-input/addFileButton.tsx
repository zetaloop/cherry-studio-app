import { CirclePlus } from '@tamagui/lucide-icons'
import React from 'react'
import { Button } from 'tamagui'

export const AddFileButton: React.FC = () => {
  return <Button chromeless size={24} icon={<CirclePlus size={24} />} />
}
