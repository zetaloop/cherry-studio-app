import { WebSearchProviderResponse } from '@/types'

import BaseWebSearchProvider from './BaseWebSearchProvider'

export default class DefaultProvider extends BaseWebSearchProvider {
  search(): Promise<WebSearchProviderResponse> {
    throw new Error('Method not implemented.')
  }
}
