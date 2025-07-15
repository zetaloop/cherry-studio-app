import { fetch } from 'expo/fetch'

import { WebSearchState } from '@/store/websearch'
import { WebSearchProvider, WebSearchProviderResponse } from '@/types/websearch'

import BaseWebSearchProvider from './BaseWebSearchProvider'

export default class TavilyProvider extends BaseWebSearchProvider {
  constructor(provider: WebSearchProvider) {
    super(provider)
    console.log('TavilyProvider initialized with provider:', provider)

    if (!this.apiKey) {
      throw new Error('API key is required for Tavily provider')
    }

    if (!this.apiHost) {
      throw new Error('API host is required for Tavily provider')
    }
  }

  public async search(query: string, websearch: WebSearchState): Promise<WebSearchProviderResponse> {
    try {
      if (!query.trim()) {
        throw new Error('Search query cannot be empty')
      }

      const url = new URL('/search', this.apiHost).toString()

      const requestBody = {
        query,
        search_depth: 'basic',
        max_results: Math.max(1, websearch.maxResults)
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API request failed with status ${response.status}: ${errorText}`)
      }

      const result = await response.json()

      return {
        query: result.query,
        results: result.results.slice(0, websearch.maxResults).map((res: any) => {
          return {
            title: res.title || 'No title',
            content: res.content || '',
            url: res.url || ''
          }
        })
      }
    } catch (error) {
      console.error('Tavily search failed:', error)
      throw new Error(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
