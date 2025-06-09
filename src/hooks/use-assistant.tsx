import { MOCK_ASSISTANTS } from '@/mock'

export function useAssistant(id?: string) {
  if (!id) {
    return {
      assistant: null
    }
  }

  const assistant = MOCK_ASSISTANTS.find(assistant => assistant.id === id)

  if (!assistant) {
    throw new Error(`Assistant with id ${id} not found`)
  }

  return {
    assistant
  }
}
