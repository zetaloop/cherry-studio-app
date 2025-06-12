import { CircleDollarSign, Eye, Globe, Languages, Lightbulb, Repeat2, Wrench } from '@tamagui/lucide-icons'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, XStack } from 'tamagui'

import { isFreeModel } from '@/config/models'
import { isEmbeddingModel } from '@/config/models/embedding'
import { isFunctionCallingModel } from '@/config/models/function-calling'
import { isReasoningModel } from '@/config/models/reasoning'
import { isRerankModel } from '@/config/models/rerank'
import { isVisionModel } from '@/config/models/vision'
import { isWebSearchModel } from '@/config/models/web-search'
import { Model } from '@/types/assistant'

import { CustomTag } from './CustomTag'

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
        color: '$foregroundGreen',
        icon: <Eye size={size} color="$foregroundGreen" />,
        label: t('models.type.vision')
      })
    }

    if (isWebSearchModel(model)) {
      result.push({
        key: 'websearch',
        color: '$foregroundBlue',
        icon: <Globe size={size} color="$foregroundBlue" />,
        label: t('models.type.websearch')
      })
    }

    if (showReasoning && isReasoningModel(model)) {
      result.push({
        key: 'reasoning',
        color: '$foregroundPurple',
        icon: <Lightbulb size={size} color="$foregroundPurple" />,
        label: t('models.type.reasoning')
      })
    }

    if (showToolsCalling && isFunctionCallingModel(model)) {
      result.push({
        key: 'function_calling',
        color: '$foregroundOrange',
        icon: <Wrench size={size} color="$foregroundOrange" />,
        label: t('models.type.function_calling')
      })
    }

    // color need to be replace
    if (isEmbeddingModel(model)) {
      result.push({
        key: 'embedding',
        color: '$foregroundDarkPurple',
        icon: <Languages size={size} color="$foregroundDarkPurple" />,
        label: t('models.type.embedding')
      })
    }

    if (showFree && isFreeModel(model)) {
      result.push({
        key: 'free',
        color: '$foregroundYellow',
        icon: <CircleDollarSign size={size} color="$foregroundYellow" />,
        label: t('models.type.free')
      })
    }

    if (isRerankModel(model)) {
      result.push({
        key: 'rerank',
        color: '$foregroundGray',
        icon: <Repeat2 size={size} color="$foregroundGray" />,
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
