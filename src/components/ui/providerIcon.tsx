import React, { useMemo } from 'react'
import { Image, useThemeName } from 'tamagui'

import { Provider } from '@/types/agent'
interface ProviderIconProps {
  provider: Provider
}
const PROVIDER_ICONS_DARK = {
  aihubmix: require('@/assets/images/llmIcons/dark/aihubmix.png'),
  alayanew: require('@/assets/images/llmIcons/dark/alayanew.png'),
  anthropic: require('@/assets/images/llmIcons/dark/anthropic.png'),
  'azure-openai': require('@/assets/images/llmIcons/dark/azure.png'),
  'baidu-cloud': require('@/assets/images/llmIcons/dark/baidu.png'),
  baichuan: require('@/assets/images/llmIcons/dark/baichuan.png'),
  burncloud: require('@/assets/images/llmIcons/dark/burncloud.png'),
  copilot: require('@/assets/images/llmIcons/dark/githubcopilot.png'),
  dashscope: require('@/assets/images/llmIcons/dark/dashscope.png'),
  deepseek: require('@/assets/images/llmIcons/dark/deepseek.png'),
  dmxapi: require('@/assets/images/llmIcons/dark/dmxapi.png'),
  doubao: require('@/assets/images/llmIcons/dark/doubao.png'),
  fireworks: require('@/assets/images/llmIcons/dark/fireworks.png'),
  gemini: require('@/assets/images/llmIcons/dark/gemini.png'),
  github: require('@/assets/images/llmIcons/dark/github.png'),
  'gitee-ai': require('@/assets/images/llmIcons/dark/giteeai.png'),
  grok: require('@/assets/images/llmIcons/dark/grok.png'),
  groq: require('@/assets/images/llmIcons/dark/groq.png'),
  gpustack: require('@/assets/images/llmIcons/dark/gpustack.png'),
  hunyuan: require('@/assets/images/llmIcons/dark/hunyuan.png'),
  hyperbolic: require('@/assets/images/llmIcons/dark/hyperbolic.png'),
  infini: require('@/assets/images/llmIcons/dark/infini.png'),
  jina: require('@/assets/images/llmIcons/dark/jina.png'),
  minimax: require('@/assets/images/llmIcons/dark/minimax.png'),
  mistral: require('@/assets/images/llmIcons/dark/mistral.png'),
  modelscope: require('@/assets/images/llmIcons/dark/modelscope.png'),
  moonshot: require('@/assets/images/llmIcons/dark/moonshot.png'),
  nvidia: require('@/assets/images/llmIcons/dark/nvidia.png'),
  o3: require('@/assets/images/llmIcons/dark/o3.png'),
  ocoolai: require('@/assets/images/llmIcons/dark/ocoolai.png'),
  ollama: require('@/assets/images/llmIcons/dark/ollama.png'),
  openai: require('@/assets/images/llmIcons/dark/openai.png'),
  openrouter: require('@/assets/images/llmIcons/dark/openrouter.png'),
  perplexity: require('@/assets/images/llmIcons/dark/perplexity.png'),
  ppio: require('@/assets/images/llmIcons/dark/ppio.png'),
  qiniu: require('@/assets/images/llmIcons/dark/qiniu.png'),
  silicon: require('@/assets/images/llmIcons/dark/silicon.png'),
  stepfun: require('@/assets/images/llmIcons/dark/stepfun.png'),
  'tencent-cloud-ti': require('@/assets/images/llmIcons/dark/hunyuan.png'),
  together: require('@/assets/images/llmIcons/dark/together.png'),
  voyageai: require('@/assets/images/llmIcons/dark/voyage.png'),
  yi: require('@/assets/images/llmIcons/dark/yi.png'),
  zhinao: require('@/assets/images/llmIcons/dark/zhinao.png'),
  zhipu: require('@/assets/images/llmIcons/dark/zhipu.png'),
  default: require('@/assets/images/llmIcons/dark/openai.png')
}

const PROVIDER_ICONS_LIGHT = {
  aihubmix: require('@/assets/images/llmIcons/light/aihubmix.png'),
  alayanew: require('@/assets/images/llmIcons/light/alayanew.png'),
  anthropic: require('@/assets/images/llmIcons/light/anthropic.png'),
  'azure-openai': require('@/assets/images/llmIcons/light/azure.png'),
  'baidu-cloud': require('@/assets/images/llmIcons/light/baidu.png'),
  baichuan: require('@/assets/images/llmIcons/light/baichuan.png'),
  burncloud: require('@/assets/images/llmIcons/light/burncloud.png'),
  copilot: require('@/assets/images/llmIcons/light/githubcopilot.png'),
  dashscope: require('@/assets/images/llmIcons/light/dashscope.png'),
  deepseek: require('@/assets/images/llmIcons/light/deepseek.png'),
  dmxapi: require('@/assets/images/llmIcons/light/dmxapi.png'),
  doubao: require('@/assets/images/llmIcons/light/doubao.png'),
  fireworks: require('@/assets/images/llmIcons/light/fireworks.png'),
  gemini: require('@/assets/images/llmIcons/light/google.png'),
  github: require('@/assets/images/llmIcons/light/github.png'),
  'gitee-ai': require('@/assets/images/llmIcons/light/giteeai.png'),
  grok: require('@/assets/images/llmIcons/light/grok.png'),
  groq: require('@/assets/images/llmIcons/light/groq.png'),
  gpustack: require('@/assets/images/llmIcons/light/gpustack.png'),
  hunyuan: require('@/assets/images/llmIcons/light/hunyuan.png'),
  hyperbolic: require('@/assets/images/llmIcons/light/hyperbolic.png'),
  infini: require('@/assets/images/llmIcons/light/infini.png'),
  jina: require('@/assets/images/llmIcons/light/jina.png'),
  minimax: require('@/assets/images/llmIcons/light/minimax.png'),
  mistral: require('@/assets/images/llmIcons/light/mistral.png'),
  modelscope: require('@/assets/images/llmIcons/light/modelscope.png'),
  moonshot: require('@/assets/images/llmIcons/light/moonshot.png'),
  nvidia: require('@/assets/images/llmIcons/light/nvidia.png'),
  o3: require('@/assets/images/llmIcons/light/o3.png'),
  ocoolai: require('@/assets/images/llmIcons/light/ocoolai.png'),
  ollama: require('@/assets/images/llmIcons/light/ollama.png'),
  openai: require('@/assets/images/llmIcons/light/openai.png'),
  openrouter: require('@/assets/images/llmIcons/light/openrouter.png'),
  perplexity: require('@/assets/images/llmIcons/light/perplexity.png'),
  ppio: require('@/assets/images/llmIcons/light/ppio.png'),
  qiniu: require('@/assets/images/llmIcons/light/qiniu.png'),
  silicon: require('@/assets/images/llmIcons/light/silicon.png'),
  stepfun: require('@/assets/images/llmIcons/light/stepfun.png'),
  'tencent-cloud-ti': require('@/assets/images/llmIcons/light/hunyuan.png'),
  together: require('@/assets/images/llmIcons/light/together.png'),
  voyageai: require('@/assets/images/llmIcons/light/voyage.png'),
  yi: require('@/assets/images/llmIcons/light/yi.png'),
  zhinao: require('@/assets/images/llmIcons/light/zhinao.png'),
  zhipu: require('@/assets/images/llmIcons/light/zhipu.png'),
  default: require('@/assets/images/llmIcons/light/openai.png')
}

export const ProviderIcon: React.FC<ProviderIconProps> = ({ provider }) => {
  const theme = useThemeName()

  const llmIcons = useMemo(() => {
    return theme === 'dark' ? PROVIDER_ICONS_DARK : PROVIDER_ICONS_LIGHT
  }, [theme])

  const iconSource = useMemo(() => {
    return llmIcons[provider.id as keyof typeof llmIcons] || llmIcons.default
  }, [llmIcons, provider.id])

  return <Image width={20} height={20} source={iconSource} />
}
