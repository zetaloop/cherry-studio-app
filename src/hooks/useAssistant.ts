import { getSystemAssistants } from '@/config/assistants'

export function useAssistant(id?: string) {
  if (!id) {
    return {
      assistant: null
    }
  }

  // todo get assistant from database
  const assistant = getSystemAssistants().find(assistant => assistant.id === id)

  if (!assistant) {
    throw new Error(`Assistant with id ${id} not found`)
  }

  return {
    assistant
  }
}

export function useDefaultAssistant() {
  // todo get assistant from database
  const assistant = getSystemAssistants()[0]

  if (!assistant) {
    throw new Error('Default assistant not found')
  }

  return {
    assistant
  }
}
