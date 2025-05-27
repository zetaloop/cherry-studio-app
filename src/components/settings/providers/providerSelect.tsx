import React from 'react'

import { ISelect } from '@/components/ui/select'

interface SelectOptionItem {
  label: string
  value: string
}

interface SelectOptionGroup {
  label: string
  title?: string
  options: SelectOptionItem[]
}

interface ProviderSelectProps {
  value: string | undefined
  onValueChange: (value: string) => void
  placeholder: string
}

const providerOptions: SelectOptionGroup[] = [
  {
    label: 'Providers',
    options: [
      { label: 'OpenAI', value: 'openai' },
      { label: 'OpenAI-Response', value: 'openai-response' },
      { label: 'Gemini', value: 'gemini' },
      { label: 'Anthropic', value: 'anthropic' },
      { label: 'Azure OpenAI', value: 'azure-openai' }
    ]
  }
]

export function ProviderSelect({ value, onValueChange, placeholder }: ProviderSelectProps) {
  const handleValueChange = (newValue: string) => {
    onValueChange(newValue)
  }

  return (
    <ISelect
      value={value}
      onValueChange={handleValueChange}
      selectOptions={providerOptions}
      placeholder={placeholder}
    />
  )
}
