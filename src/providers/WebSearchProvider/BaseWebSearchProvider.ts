import { WebSearchState } from '@/store/websearch'
import { WebSearchProviderResponse } from '@/types'
import { WebSearchProvider } from '@/types/websearch'

import { getWebSearchProviderById } from '../../../db/queries/providers.queries'

export default abstract class BaseWebSearchProvider {
  protected provider: WebSearchProvider
  protected apiHost?: string
  protected apiKey: string

  constructor(provider: WebSearchProvider) {
    this.provider = provider
    this.apiHost = ''
    this.apiKey = ''
  }

  public async initialize(): Promise<void> {
    this.apiHost = await this.getApiHost()
    this.apiKey = await this.getApiKey()
  }

  abstract search(
    query: string,
    websearch: WebSearchState,
    httpOptions?: RequestInit
  ): Promise<WebSearchProviderResponse>

  public async getApiHost() {
    const provider = await getWebSearchProviderById(this.provider.id)
    return provider?.apiHost || ''
  }

  public defaultHeaders() {
    return {
      'HTTP-Referer': 'https://cherry-ai.com',
      'X-Title': 'Cherry Studio'
    }
  }

  // TODO 暂时单key处理
  public async getApiKey() {
    const provider = await getWebSearchProviderById(this.provider.id)

    if (!provider?.apiKey) return ''

    const keys = provider.apiKey.split(',').map(key => key.trim())

    if (keys.length > 0) {
      return keys[0]
    }

    return ''
  }
}
