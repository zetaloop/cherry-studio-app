import { eq } from 'drizzle-orm'

import { WebSearchState } from '@/store/websearch'
import { WebSearchProvider, WebSearchProviderResponse } from '@/types'

import { db } from '../../../db'
import { websearch_providers } from '../../../db/schema'

export default abstract class BaseWebSearchProvider {
  // @ts-ignore this
  protected provider: WebSearchProvider
  protected apiHost?: string
  protected apiKey: string

  constructor(provider: WebSearchProvider) {
    this.provider = provider
    this.apiHost = this.getApiHost()
    this.apiKey = this.getApiKey()
  }

  abstract search(
    query: string,
    websearch: WebSearchState,
    httpOptions?: RequestInit
  ): Promise<WebSearchProviderResponse>

  public getApiHost() {
    const provider = db.select().from(websearch_providers).where(eq(websearch_providers.id, this.provider.id)).get()
    return provider?.api_host || ''
  }

  public defaultHeaders() {
    return {
      'HTTP-Referer': 'https://cherry-ai.com',
      'X-Title': 'Cherry Studio'
    }
  }

  // TODO 暂时单key处理
  public getApiKey() {
    const provider = db.select().from(websearch_providers).where(eq(websearch_providers.id, this.provider.id)).get()

    const keys = provider?.api_key?.split(',').map(key => key.trim()) || []

    if (keys.length > 0) {
      return keys[0]
    }

    return ''
  }
}
