import dayjs from 'dayjs'

import WebSearchEngineProvider from '@/providers/WebSearchProvider'
import { setWebSearchStatus } from '@/store/runtime'
import { WebSearchState } from '@/store/websearch'
import { WebSearchProvider, WebSearchProviderResponse, WebSearchStatus } from '@/types'
import { hasObjectKey } from '@/utils'

import { db } from '../../db'
import { websearch_providers } from '../../db/schema'

// interface RequestState {
//   signal: AbortSignal | null
//   searchBase?: KnowledgeBase
//   isPaused: boolean
//   createdAt: number
// }

class WebSearchService {
  /**
   * 是否暂停
   */
  private signal: AbortSignal | null = null

  isPaused = false

  /**
   * 获取当前存储的网络搜索状态
   * @private
   * @returns 网络搜索状态
   */
  private getWebSearchState(): WebSearchState {
    return store.getState().websearch
  }

  /**
   * 检查网络搜索功能是否启用
   * @public
   * @returns 如果默认搜索提供商已启用则返回true，否则返回false
   */
  public isWebSearchEnabled(providerId?: WebSearchProvider['id']): boolean {
    const providers = db.select().from(websearch_providers).all()
    const provider = providers.find(provider => provider.id === providerId)

    if (!provider) {
      return false
    }

    if (provider.id.startsWith('local-')) {
      return true
    }

    if (hasObjectKey(provider, 'api_key')) {
      return provider.api_key !== ''
    }

    if (hasObjectKey(provider, 'api_host')) {
      return provider.api_host !== ''
    }

    return false
  }

  /**
   * 获取当前默认的网络搜索提供商
   * @public
   * @returns 网络搜索提供商
   */
  public getWebSearchProvider(providerId?: string): WebSearchProvider | undefined {
    const providers = db.select().from(websearch_providers).all()
    const provider = providers.find(provider => provider.id === providerId)

    if (!provider) {
      return undefined
    }

    return {
      id: provider.id,
      name: provider.name ?? '',
      apiKey: provider.api_key,
      apiHost: provider.api_host,
      engines: provider.engines ? JSON.parse(provider.engines) : undefined,
      url: provider.url ?? undefined,
      basicAuthUsername: provider.basic_auth_username ?? undefined,
      basicAuthPassword: provider.basic_auth_password ?? undefined,
      usingBrowser: provider.using_browser ?? undefined
    }
  }

  /**
   * 使用指定的提供商执行网络搜索
   * @public
   * @param provider 搜索提供商
   * @param query 搜索查询
   * @param httpOptions
   * @returns 搜索响应
   */
  public async search(
    provider: WebSearchProvider,
    query: string,
    httpOptions?: RequestInit
  ): Promise<WebSearchProviderResponse> {
    const websearch = this.getWebSearchState()
    const webSearchEngine = new WebSearchEngineProvider(provider)

    let formattedQuery = query

    // FIXME: 有待商榷，效果一般
    if (websearch.searchWithTime) {
      formattedQuery = `today is ${dayjs().format('YYYY-MM-DD')} \r\n ${query}`
    }

    // try {
    return await webSearchEngine.search(formattedQuery, websearch, httpOptions)
    // } catch (error) {
    //   console.error('Search failed:', error)
    //   throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    // }
  }

  /**
   * 检查搜索提供商是否正常工作
   * @public
   * @param provider 要检查的搜索提供商
   * @returns 如果提供商可用返回true，否则返回false
   */
  public async checkSearch(provider: WebSearchProvider): Promise<{ valid: boolean; error?: any }> {
    try {
      const response = await this.search(provider, 'test query')
      console.log('[checkSearch] Search response:', response)
      // 优化的判断条件：检查结果是否有效且没有错误
      return { valid: response.results !== undefined, error: undefined }
    } catch (error) {
      return { valid: false, error }
    }
  }

  /**
   * 设置网络搜索状态
   */
  private async setWebSearchStatus(requestId: string, status: WebSearchStatus, delayMs?: number) {
    store.dispatch(setWebSearchStatus({ requestId, status }))

    if (delayMs) {
      await new Promise(resolve => setTimeout(resolve, delayMs))
    }
  }
}

export default new WebSearchService()
