import React, { useMemo } from 'react'
import { Image, useThemeName } from 'tamagui'

import { Provider } from '@/types/agent'
interface ProviderIconProps {
  provider: Provider
}
const PROVIDER_ICONS_DARK = {
  aihubmix: require('@/assets/images/providerIcons/dark/aihubmix.png'),
  alayanew: require('@/assets/images/providerIcons/dark/alayanew.png'),
  anthropic: require('@/assets/images/providerIcons/dark/anthropic.png'),
  'azure-openai': require('@/assets/images/providerIcons/dark/azure.png'),
  'baidu-cloud': require('@/assets/images/providerIcons/dark/baidu.png'),
  baichuan: require('@/assets/images/providerIcons/dark/baichuan.png'),
  burncloud: require('@/assets/images/providerIcons/dark/burncloud.png'),
  copilot: require('@/assets/images/providerIcons/dark/githubcopilot.png'),
  dashscope: require('@/assets/images/providerIcons/dark/dashscope.png'),
  deepseek: require('@/assets/images/providerIcons/dark/deepseek.png'),
  dmxapi: require('@/assets/images/providerIcons/dark/dmxapi.png'),
  doubao: require('@/assets/images/providerIcons/dark/doubao.png'),
  fireworks: require('@/assets/images/providerIcons/dark/fireworks.png'),
  gemini: require('@/assets/images/providerIcons/dark/gemini.png'),
  github: require('@/assets/images/providerIcons/dark/github.png'),
  'gitee-ai': require('@/assets/images/providerIcons/dark/giteeai.png'),
  grok: require('@/assets/images/providerIcons/dark/grok.png'),
  groq: require('@/assets/images/providerIcons/dark/groq.png'),
  gpustack: require('@/assets/images/providerIcons/dark/gpustack.png'),
  hunyuan: require('@/assets/images/providerIcons/dark/hunyuan.png'),
  hyperbolic: require('@/assets/images/providerIcons/dark/hyperbolic.png'),
  infini: require('@/assets/images/providerIcons/dark/infini.png'),
  jina: require('@/assets/images/providerIcons/dark/jina.png'),
  minimax: require('@/assets/images/providerIcons/dark/minimax.png'),
  mistral: require('@/assets/images/providerIcons/dark/mistral.png'),
  modelscope: require('@/assets/images/providerIcons/dark/modelscope.png'),
  moonshot: require('@/assets/images/providerIcons/dark/moonshot.png'),
  nvidia: require('@/assets/images/providerIcons/dark/nvidia.png'),
  o3: require('@/assets/images/providerIcons/dark/o3.png'),
  ocoolai: require('@/assets/images/providerIcons/dark/ocoolai.png'),
  ollama: require('@/assets/images/providerIcons/dark/ollama.png'),
  openai: require('@/assets/images/providerIcons/dark/openai.png'),
  openrouter: require('@/assets/images/providerIcons/dark/openrouter.png'),
  perplexity: require('@/assets/images/providerIcons/dark/perplexity.png'),
  ppio: require('@/assets/images/providerIcons/dark/ppio.png'),
  qiniu: require('@/assets/images/providerIcons/dark/qiniu.png'),
  silicon: require('@/assets/images/providerIcons/dark/silicon.png'),
  stepfun: require('@/assets/images/providerIcons/dark/stepfun.png'),
  'tencent-cloud-ti': require('@/assets/images/providerIcons/dark/hunyuan.png'),
  together: require('@/assets/images/providerIcons/dark/together.png'),
  voyageai: require('@/assets/images/providerIcons/dark/voyage.png'),
  yi: require('@/assets/images/providerIcons/dark/yi.png'),
  zhinao: require('@/assets/images/providerIcons/dark/zhinao.png'),
  zhipu: require('@/assets/images/providerIcons/dark/zhipu.png'),
  default: require('@/assets/images/providerIcons/dark/openai.png')
}

const PROVIDER_ICONS_LIGHT = {
  aihubmix: require('@/assets/images/providerIcons/light/aihubmix.png'),
  alayanew: require('@/assets/images/providerIcons/light/alayanew.png'),
  anthropic: require('@/assets/images/providerIcons/light/anthropic.png'),
  'azure-openai': require('@/assets/images/providerIcons/light/azure.png'),
  'baidu-cloud': require('@/assets/images/providerIcons/light/baidu.png'),
  baichuan: require('@/assets/images/providerIcons/light/baichuan.png'),
  burncloud: require('@/assets/images/providerIcons/light/burncloud.png'),
  copilot: require('@/assets/images/providerIcons/light/githubcopilot.png'),
  dashscope: require('@/assets/images/providerIcons/light/dashscope.png'),
  deepseek: require('@/assets/images/providerIcons/light/deepseek.png'),
  dmxapi: require('@/assets/images/providerIcons/light/dmxapi.png'),
  doubao: require('@/assets/images/providerIcons/light/doubao.png'),
  fireworks: require('@/assets/images/providerIcons/light/fireworks.png'),
  gemini: require('@/assets/images/providerIcons/light/gemini.png'),
  github: require('@/assets/images/providerIcons/light/github.png'),
  'gitee-ai': require('@/assets/images/providerIcons/light/giteeai.png'),
  grok: require('@/assets/images/providerIcons/light/grok.png'),
  groq: require('@/assets/images/providerIcons/light/groq.png'),
  gpustack: require('@/assets/images/providerIcons/light/gpustack.png'),
  hunyuan: require('@/assets/images/providerIcons/light/hunyuan.png'),
  hyperbolic: require('@/assets/images/providerIcons/light/hyperbolic.png'),
  infini: require('@/assets/images/providerIcons/light/infini.png'),
  jina: require('@/assets/images/providerIcons/light/jina.png'),
  minimax: require('@/assets/images/providerIcons/light/minimax.png'),
  mistral: require('@/assets/images/providerIcons/light/mistral.png'),
  modelscope: require('@/assets/images/providerIcons/light/modelscope.png'),
  moonshot: require('@/assets/images/providerIcons/light/moonshot.png'),
  nvidia: require('@/assets/images/providerIcons/light/nvidia.png'),
  o3: require('@/assets/images/providerIcons/light/o3.png'),
  ocoolai: require('@/assets/images/providerIcons/light/ocoolai.png'),
  ollama: require('@/assets/images/providerIcons/light/ollama.png'),
  openai: require('@/assets/images/providerIcons/light/openai.png'),
  openrouter: require('@/assets/images/providerIcons/light/openrouter.png'),
  perplexity: require('@/assets/images/providerIcons/light/perplexity.png'),
  ppio: require('@/assets/images/providerIcons/light/ppio.png'),
  qiniu: require('@/assets/images/providerIcons/light/qiniu.png'),
  silicon: require('@/assets/images/providerIcons/light/silicon.png'),
  stepfun: require('@/assets/images/providerIcons/light/stepfun.png'),
  'tencent-cloud-ti': require('@/assets/images/providerIcons/light/hunyuan.png'),
  together: require('@/assets/images/providerIcons/light/together.png'),
  voyageai: require('@/assets/images/providerIcons/light/voyage.png'),
  yi: require('@/assets/images/providerIcons/light/yi.png'),
  zhinao: require('@/assets/images/providerIcons/light/zhinao.png'),
  zhipu: require('@/assets/images/providerIcons/light/zhipu.png'),
  default: require('@/assets/images/providerIcons/light/openai.png')
}

export const ProviderIcon: React.FC<ProviderIconProps> = ({ provider }) => {
  const theme = useThemeName()

  const providerIcons = useMemo(() => {
    return theme === 'dark' ? PROVIDER_ICONS_DARK : PROVIDER_ICONS_LIGHT
  }, [theme])

  const iconSource = useMemo(() => {
    return providerIcons[provider.id as keyof typeof providerIcons] || providerIcons.default
  }, [providerIcons, provider.id])

  return <Image width={20} height={20} source={iconSource} />
}
