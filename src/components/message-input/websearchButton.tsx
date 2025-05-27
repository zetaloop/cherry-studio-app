import { Globe } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'tamagui'

export const WebsearchButton: React.FC = () => {
  const { t } = useTranslation()
  const globeIcon = <Globe size={24} />

  return <Button chromeless size={24} icon={globeIcon} />
}
