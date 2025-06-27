import { getSystemProviders } from '@/config/providers'

export function useAllProviders() {
  // todo get all providers from database
  return {
    providers: getSystemProviders()
  }
}

export function useProviders() {
  // todo get all providers from database
  const providers = getSystemProviders().filter(provider => provider.enabled)
  return {
    providers: providers
  }
}

export function useProvider(id: string) {
  // todo get all providers from database
  const provider = getSystemProviders().find(p => p.id === id)

  if (!provider) {
    throw new Error(`Provider with id ${id} not found`)
  }

  return {
    provider,
    models: provider?.models || []
  }
}
