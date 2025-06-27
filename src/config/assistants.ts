import assistantsEnJsonData from '@/resources/data/assistants-en.json'
import { Assistant } from '@/types/assistant'

export function getSystemAssistants(): Assistant[] {
  try {
    if (assistantsEnJsonData) {
      const assistants = JSON.parse(JSON.stringify(assistantsEnJsonData)) || []
      return assistants
    } else {
      return []
    }
  } catch (error) {
    console.error('Error reading assistants data:', error)
    return []
  }
}
