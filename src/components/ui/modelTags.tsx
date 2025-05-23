import { Eye, Globe, Lightbulb, Wrench } from '@tamagui/lucide-icons'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, XStack } from 'tamagui'

import {
  isEmbeddingModel,
  isFreeModel,
  isFunctionCallingModel,
  isReasoningModel,
  isRerankModel,
  isVisionModel,
  isWebSearchModel
} from '@/config/models'
import { Model } from '@/types/agent'

import { CustomTag } from './customTag'

interface ModelTagsProps {
  model: Model
  showFree?: boolean
  showReasoning?: boolean
  showToolsCalling?: boolean
  size?: number
  showLabel?: boolean
  style?: any
}

export const ModelTags: React.FC<ModelTagsProps> = ({
  model,
  showFree = true,
  showReasoning = true,
  showToolsCalling = true,
  size = 12,
  showLabel = false,
  style
}) => {
  const { t } = useTranslation()
  const tags = useMemo(() => {
    const result = []

    if (isVisionModel(model)) {
      result.push({
        key: 'vision',
        color: 'rgba(0, 185, 107, 1)',
        icon: <Eye size={size} color="rgba(0, 185, 107, 1)" />,
        label: t('models.type.vision')
      })
    }

    if (isWebSearchModel(model)) {
      result.push({
        key: 'websearch',
        color: 'rgba(28, 128, 254, 1)',
        icon: <Globe size={size} color="rgba(28, 128, 254, 1)" />,
        label: t('models.type.websearch')
      })
    }

    if (showReasoning && isReasoningModel(model)) {
      result.push({
        key: 'reasoning',
        color: 'rgba(114, 105, 255, 1)',
        icon: <Lightbulb size={size} color="rgba(114, 105, 255, 1)" />,
        label: t('models.type.reasoning')
      })
    }

    if (showToolsCalling && isFunctionCallingModel(model)) {
      result.push({
        key: 'function_calling',
        color: 'rgba(242, 136, 57, 1)',
        icon: <Wrench size={size} color="rgba(242, 136, 57, 1)" />,
        label: t('models.type.function_calling')
      })
    }

    // color need to be replace
    if (isEmbeddingModel(model)) {
      result.push({
        key: 'embedding',
        color: 'rgba(242, 136, 57, 1)',
        icon: null,
        label: t('models.type.embedding')
      })
    }

    if (showFree && isFreeModel(model)) {
      result.push({
        key: 'free',
        color: 'rgba(0, 185, 107, 1)',
        icon: null,
        label: t('models.type.free')
      })
    }

    if (isRerankModel(model)) {
      result.push({
        key: 'rerank',
        color: 'rgba(28, 128, 254, 1)',
        icon: null,
        label: t('models.type.rerank')
      })
    }

    return result
  }, [model, showFree, showReasoning, showToolsCalling, size, t])

  if (tags.length === 0) {
    return null
  }

  return (
    <XStack gap={4} alignItems="center">
      {tags.map(tag => (
        <CustomTag key={tag.key} size={size} color={tag.color} icon={tag.icon}>
          {tag.icon ? '' : <Text color={tag.color}>{tag.label}</Text>}
        </CustomTag>
      ))}
    </XStack>
  )
}
