import { MOCK_AGENTS } from '@/mock'

export function useAgent(id?: string) {
  if (!id) {
    return {
      agent: null
    }
  }

  const agent = MOCK_AGENTS.find(agent => agent.id === id)

  if (!agent) {
    throw new Error(`Agent with id ${id} not found`)
  }

  return {
    agent
  }
}
