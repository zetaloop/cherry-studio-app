import { sortBy } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input, Text, YStack } from 'tamagui'

import { SettingGroup, SettingRow } from '@/components/settings'
import { ModelSelect } from '@/components/settings/providers/modelSelect'
import { isEmbeddingModel } from '@/config/models/embedding'
import { useAllProviders } from '@/hooks/use-providers'
import { Agent, Model } from '@/types/agent'
import { getModelUniqId } from '@/utils/model'

import { CustomSlider } from '../ui/customSlider'
import { CustomSwitch } from '../ui/switch'
import { ReasoningSelect } from './reasoingSelect'

interface ModelTabContentProps {
  agent?: Agent | null
  onAgentChange?: (agent: Partial<Agent>) => void // 新增：传递更改回父组件
}

export function ModelTabContent({ agent, onAgentChange }: ModelTabContentProps) {
  const { t } = useTranslation()
  const { providers } = useAllProviders()

  // 状态管理
  const [selectedModel, setSelectedModel] = useState<Model | undefined>(agent?.model)
  const [temperature, setTemperature] = useState(agent?.settings?.temperature || 0.7)
  const [topP, setTopP] = useState(agent?.settings?.topP || 0.8)
  const [context, setContext] = useState(agent?.settings?.contextCount || 15)
  const [streamOutput, setStreamOutput] = useState(agent?.settings?.streamOutput || false)
  const [enableMaxTokens, setEnableMaxTokens] = useState(agent?.settings?.enableMaxTokens || false)
  const [maxTokens, setMaxTokens] = useState(agent?.settings?.maxTokens || 2048)
  const [reasoning, setReasoning] = useState(agent?.settings?.reasoning_effort || '')

  // 优化：使用 useMemo 缓存 selectOptions
  const selectOptions = useMemo(() => {
    return providers
      .filter(p => p.models && p.models.length > 0)
      .map(p => ({
        label: p.isSystem ? t(`provider.${p.id}`) : p.name,
        title: p.name,
        options: sortBy(p.models, 'name')
          .filter(m => !isEmbeddingModel(m))
          .map(m => ({
            label: `${m.name}`,
            value: getModelUniqId(m),
            model: m
          }))
      }))
  }, [providers, t])

  const handleModelChange = useCallback(
    (value: string) => {
      if (!value) {
        setSelectedModel(undefined)
        return
      }

      let modelToSet: Model | undefined

      for (const group of selectOptions) {
        const foundOption = group.options.find(opt => opt.value === value)

        if (foundOption) {
          modelToSet = foundOption.model
          break
        }
      }

      setSelectedModel(modelToSet)
    },
    [selectOptions]
  )

  const handleTemperatureChange = useCallback((value: number[]) => {
    setTemperature(value[0] / 10)
  }, [])

  const handleTopPChange = useCallback((value: number[]) => {
    setTopP(value[0] / 10)
  }, [])

  const handleContextChange = useCallback((value: number[]) => {
    setContext(value[0])
  }, [])

  const handleMaxTokensChange = useCallback((value: string) => {
    const numValue = parseInt(value, 10)

    if (!isNaN(numValue) && numValue > 0) {
      setMaxTokens(numValue)
    }
  }, [])

  return (
    <YStack flex={1} gap={30}>
      <ModelSelect
        value={selectedModel ? getModelUniqId(selectedModel) : undefined}
        onValueChange={handleModelChange}
        selectOptions={selectOptions}
        placeholder={t('settings.models.empty')}
      />

      <SettingGroup>
        <SettingRow>
          <CustomSlider
            label={t('agents.settings.temperature')}
            value={temperature}
            max={10}
            multiplier={10}
            onValueChange={handleTemperatureChange}
          />
        </SettingRow>
        <SettingRow>
          <CustomSlider
            label={t('agents.settings.top_p')}
            value={topP}
            max={10}
            multiplier={10}
            onValueChange={handleTopPChange}
          />
        </SettingRow>
        <SettingRow>
          <CustomSlider
            label={t('agents.settings.context')}
            value={context}
            max={30}
            onValueChange={handleContextChange}
          />
        </SettingRow>
      </SettingGroup>

      <SettingGroup>
        <SettingRow>
          <Text>{t('agents.settings.stream_output')}</Text>
          <CustomSwitch checked={streamOutput} onCheckedChange={setStreamOutput} />
        </SettingRow>
        <SettingRow>
          <Text>{t('agents.settings.max_tokens')}</Text>
          <CustomSwitch checked={enableMaxTokens} onCheckedChange={setEnableMaxTokens} />
        </SettingRow>
        {enableMaxTokens && (
          <SettingRow>
            <Text>{t('agents.settings.max_tokens_value')}</Text>
            <Input
              minWidth={80}
              height={25}
              fontSize={12}
              value={maxTokens.toString()}
              onChangeText={handleMaxTokensChange}
              keyboardType="numeric"
            />
          </SettingRow>
        )}
        <SettingRow>
          <Text>{t('agents.settings.reasoning')}</Text>
          <ReasoningSelect agent={agent} />
        </SettingRow>
      </SettingGroup>
    </YStack>
  )
}
