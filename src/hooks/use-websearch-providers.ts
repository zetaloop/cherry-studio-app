import { INITIAL_WEBSEARCH_PROVIDERS } from '@/mock'
import { WebSearchProvider } from '@/types/websearch'

export function useWebsearchProviders() {
  const freeProviders: WebSearchProvider[] = INITIAL_WEBSEARCH_PROVIDERS.filter(provider => provider.type === 'free')
  const apiProviders: WebSearchProvider[] = INITIAL_WEBSEARCH_PROVIDERS.filter(provider => provider.type === 'api')

  return {
    freeProviders,
    apiProviders
  }
}
