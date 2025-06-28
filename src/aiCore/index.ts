import { Provider } from '@/types/assistant'
import { SdkModel } from '@/types/sdk'

import { ApiClientFactory, BaseApiClient } from './clients'

export default class LegacyAiProvider {
  private apiClient: BaseApiClient

  constructor(provider: Provider) {
    // Use the new ApiClientFactory to get a BaseApiClient instance
    this.apiClient = ApiClientFactory.create(provider)
  }

  public async models(): Promise<SdkModel[]> {
    return this.apiClient.listModels()
  }

  public getBaseURL(): string {
    return this.apiClient.getBaseURL()
  }

  public getApiKey(): string {
    return this.apiClient.getApiKey()
  }
}
