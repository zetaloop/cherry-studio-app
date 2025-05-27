import { Globe } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text } from 'tamagui'

interface WebsearchButtonProps {
  selected: boolean
  onToggle: () => void
}

export const WebsearchButton: React.FC<WebsearchButtonProps> = ({ selected, onToggle }) => {
  const { t } = useTranslation()
  const globeIcon = <Globe size={24} />

  if (selected) {
    return (
      <Button size={24} onPress={onToggle} icon={globeIcon}>
        <Text>{t('inputs.websearch')}</Text>
      </Button>
    )
  }

  return <Button chromeless size={24} icon={globeIcon} onPress={onToggle} />
}
