import { WebSearchState } from '@/store/websearch'
import { WebSearchProvider, WebSearchProviderResponse } from '@/types/websearch'

export default abstract class BaseWebSearchProvider {
  protected provider: WebSearchProvider
  protected apiHost?: string
  protected apiKey?: string

  constructor(provider: WebSearchProvider) {
    this.provider = provider

    if (provider.apiHost) this.apiHost = provider.apiHost
    if (provider.apiKey) this.apiKey = provider.apiKey
  }

  public async initialize(): Promise<void> {
    const { getWebSearchProviderById } = await import('../../../db/queries/providers.queries')
    const fullProvider = await getWebSearchProviderById(this.provider.id)

    if (fullProvider) {
      this.provider = fullProvider
      this.apiHost = fullProvider.apiHost || ''
      this.apiKey = fullProvider.apiKey || ''
    }
  }

  abstract search(
    query: string,
    websearch: WebSearchState,
    httpOptions?: RequestInit
  ): Promise<WebSearchProviderResponse>

  public defaultHeaders() {
    return {
      'HTTP-Referer': 'https://cherry-ai.com',
      'X-Title': 'Cherry Studio'
    }
  }

  public getApiHost(): string {
    return this.apiHost || ''
  }

  // TODO 暂时单key处理
  public getApiKey(): string {
    if (!this.provider?.apiKey) return ''

    const keys = this.provider.apiKey.split(',').map(key => key.trim())

    if (keys.length > 0) {
      return keys[0]
    }

    return ''
  }
}
