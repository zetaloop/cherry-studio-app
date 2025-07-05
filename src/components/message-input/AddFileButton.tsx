import { CirclePlus } from '@tamagui/lucide-icons'
import React from 'react'
import { Button } from 'tamagui'

import { SheetType } from '@/screens/home/sheets'

interface AddFileButtonProps {
  setActiveSheet: (sheet: SheetType | null) => void
}

export const AddFileButton: React.FC<AddFileButtonProps> = ({ setActiveSheet }) => {
  return <Button chromeless size={24} icon={<CirclePlus size={24} />} onPress={() => setActiveSheet(SheetType.FILE)} />
}
