import { Agent } from '@/types/agent'

export function groupByCategories(data: Agent[]) {
  const groupedMap = new Map<string, Agent[]>()
  data.forEach(item => {
    item.group?.forEach(category => {
      if (!groupedMap.has(category)) {
        groupedMap.set(category, [])
      }

      groupedMap.get(category)?.push(item)
    })
  })
  const result: Record<string, Agent[]> = {}
  Array.from(groupedMap.entries()).forEach(([category, items]) => {
    result[category] = items
  })
  return result
}
