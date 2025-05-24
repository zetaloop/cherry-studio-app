import React, { useMemo } from 'react'
import { Image, useThemeName } from 'tamagui'

import { Model } from '@/types/agent'
interface ModelIconProps {
  model: Model
}
const MODEL_ICONS_DARK = {
  chatgpt: require('@/assets/images/llmIcons/dark/openai.png'),
  o1: require('@/assets/images/llmIcons/dark/openai.png'),
  o3: require('@/assets/images/llmIcons/dark/openai.png'),
  'gpt-4': require('@/assets/images/llmIcons/dark/openai.png'),
  claude: require('@/assets/images/llmIcons/dark/claude.png'),
  gemini: require('@/assets/images/llmIcons/dark/gemini.png'),
  grok: require('@/assets/images/llmIcons/dark/grok.png'),
  deepseek: require('@/assets/images/llmIcons/dark/deepseek.png'),
  doubao: require('@/assets/images/llmIcons/dark/doubao.png'),
  qwen: require('@/assets/images/llmIcons/dark/qwen.png'),
  moonshot: require('@/assets/images/llmIcons/dark/moonshot.png'),
  jina: require('@/assets/images/llmIcons/dark/jina.png')
}

const MODEL_ICONS_LIGHT = {
  chatgpt: require('@/assets/images/llmIcons/light/openai.png'),
  o1: require('@/assets/images/llmIcons/light/openai.png'),
  o3: require('@/assets/images/llmIcons/light/openai.png'),
  'gpt-4': require('@/assets/images/llmIcons/light/openai.png'),
  claude: require('@/assets/images/llmIcons/light/claude.png'),
  gemini: require('@/assets/images/llmIcons/light/gemini.png'),
  grok: require('@/assets/images/llmIcons/light/grok.png'),
  deepseek: require('@/assets/images/llmIcons/light/deepseek.png'),
  doubao: require('@/assets/images/llmIcons/light/doubao.png'),
  qwen: require('@/assets/images/llmIcons/light/qwen.png'),
  moonshot: require('@/assets/images/llmIcons/light/moonshot.png'),
  jina: require('@/assets/images/llmIcons/light/jina.png')
}

export const ModelIcon: React.FC<ModelIconProps> = ({ model }) => {
  const theme = useThemeName()

  const modelIcons = useMemo(() => {
    return theme === 'dark' ? MODEL_ICONS_DARK : MODEL_ICONS_LIGHT
  }, [theme])

  const iconSource = useMemo(() => {
    for (const key in modelIcons) {
      const regex = new RegExp(key, 'i')

      if (regex.test(model.id)) {
        return modelIcons[key as keyof typeof modelIcons]
      }
    }
  }, [modelIcons, model.id])

  return <Image width={20} height={20} source={iconSource} />
}
