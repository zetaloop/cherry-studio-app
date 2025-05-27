import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text } from 'tamagui'

import { MdiLightbulbOffOutline } from '../ui/svgIcons'

interface ThinkButtonProps {
  selected: boolean
  onToggle: () => void
}

export const ThinkButton: React.FC<ThinkButtonProps> = ({ selected, onToggle }) => {
  const { t } = useTranslation()
  const thinkIcon = <MdiLightbulbOffOutline size={24} />

  if (selected) {
    return (
      <Button size={24} onPress={onToggle} icon={thinkIcon}>
        <Text>{t('inputs.think')}</Text>
      </Button>
    )
  }

  return <Button chromeless size={24} icon={thinkIcon} onPress={onToggle} />
}
