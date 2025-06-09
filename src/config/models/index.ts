// 导出所有模型相关功能
import { Model } from '@/types/assistant'

export interface ModelGroup {
  [provider: string]: Model[]
}

export type ModelCategory =
  | 'embedding'
  | 'rerank'
  | 'vision'
  | 'function_calling'
  | 'reasoning'
  | 'text_to_image'
  | 'web_search'

export function isFreeModel(model: Model) {
  return (model.id + model.name).toLocaleLowerCase().includes('free')
}

/**
 * 按 Qwen 系列模型分组
 * @param models 模型列表
 * @returns 分组后的模型
 */
export function groupQwenModels(models: Model[]): Record<string, Model[]> {
  return models.reduce(
    (groups, model) => {
      // 匹配 Qwen 系列模型的前缀
      const prefixMatch = model.id.match(/^(qwen(?:\d+\.\d+|2(?:\.\d+)?|-\d+b|-(?:max|coder|vl)))/i)
      // 匹配 qwen2.5、qwen2、qwen-7b、qwen-max、qwen-coder 等
      const groupKey = prefixMatch ? prefixMatch[1] : model.group || '其他'

      if (!groups[groupKey]) {
        groups[groupKey] = []
      }

      groups[groupKey].push(model)

      return groups
    },
    {} as Record<string, Model[]>
  )
}
