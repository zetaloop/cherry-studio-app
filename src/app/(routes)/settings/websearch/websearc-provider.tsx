import React from 'react'
import { useTranslation } from 'react-i18next'

import { WebSearchSelect } from '@/components/settings/websearch/websearchSelect'

interface ProviderOption {
  label: string
  value: string
}

interface ProviderGroup {
  label: string
  options: ProviderOption[]
}

interface ProviderSectionProps {
  selectedProvider: string | undefined
  onProviderChange: (value: string | null) => void
  selectOptions: ProviderGroup[]
}

export default function ProviderSection({ selectedProvider, onProviderChange, selectOptions }: ProviderSectionProps) {
  const { t } = useTranslation()

  return (
    <WebSearchSelect
      value={selectedProvider}
      onValueChange={onProviderChange}
      selectOptions={selectOptions}
      placeholder={t('settings.websearch.selectPlaceholder')}
    />
  )
}
