import { Model } from '@/types/agent'

export const SYSTEM_MODELS: Record<string, Model[]> = {
  silicon: [
    {
      id: 'deepseek-ai/DeepSeek-R1',
      name: 'deepseek-ai/DeepSeek-R1',
      provider: 'silicon',
      group: 'deepseek-ai'
    },
    {
      id: 'deepseek-ai/DeepSeek-V3',
      name: 'deepseek-ai/DeepSeek-V3',
      provider: 'silicon',
      group: 'deepseek-ai'
    }
  ]
}
