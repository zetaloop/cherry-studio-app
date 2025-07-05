import React from 'react'
import { Button } from 'tamagui'

import { SheetType } from '@/screens/home/sheets'
import { ReasoningEffortOptions } from '@/types/assistant'

import {
  MdiLightbulbAutoOutline,
  MdiLightbulbOffOutline,
  MdiLightbulbOn10,
  MdiLightbulbOn50,
  MdiLightbulbOn90
} from '../icons/MdiLightbulbIcon'

interface ThinkButtonProps {
  reasoningEffort: ReasoningEffortOptions | null
  setActiveSheet: (sheet: SheetType | null) => void
}

export const ThinkButton: React.FC<ThinkButtonProps> = ({ reasoningEffort, setActiveSheet }) => {
  const getIcon = () => {
    const size = 24

    switch (reasoningEffort) {
      case 'auto':
        return <MdiLightbulbAutoOutline size={size} />
      case 'high':
        return <MdiLightbulbOn90 size={size} />
      case 'medium':
        return <MdiLightbulbOn50 size={size} />
      case 'low':
        return <MdiLightbulbOn10 size={size} />
      case null:
      default:
        return <MdiLightbulbOffOutline size={size} />
    }
  }

  return (
    <Button
      chromeless
      size={24}
      icon={getIcon()}
      onPress={() => setActiveSheet(SheetType.THINK)}
      color={reasoningEffort !== null ? 'rgba(0, 185, 107, 1)' : undefined}
    />
  )
}
