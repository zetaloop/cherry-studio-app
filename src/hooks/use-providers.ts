import { INITIAL_PROVIDERS } from '@/mock'

export function useAllProviders() {
  return INITIAL_PROVIDERS
}

export function useProvider(id: string) {
  const provider = INITIAL_PROVIDERS.find(p => p.id === id)

  if (!provider) {
    throw new Error(`Provider with id ${id} not found`)
  }

  return {
    provider,
    models: provider?.models || []
  }
}
