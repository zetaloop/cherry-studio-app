import OpenAI, { AzureOpenAI } from 'openai'

import { isSupportedModel } from '@/config/models'
import { Provider } from '@/types/assistant'
import {
  OpenAIResponseSdkMessageParam,
  OpenAIResponseSdkParams,
  OpenAIResponseSdkRawChunk,
  OpenAIResponseSdkRawOutput,
  OpenAIResponseSdkTool,
  OpenAIResponseSdkToolCall,
  OpenAISdkMessageParam,
  OpenAISdkParams,
  OpenAISdkRawChunk,
  OpenAISdkRawOutput
} from '@/types/sdk'
import { formatApiHost } from '@/utils/api'

import { BaseApiClient } from '../BaseApiClient'

/**
 * 抽象的OpenAI基础客户端类，包含两个OpenAI客户端之间的共享功能
 */
export abstract class OpenAIBaseClient<
  TSdkInstance extends OpenAI | AzureOpenAI,
  TSdkParams extends OpenAISdkParams | OpenAIResponseSdkParams,
  TRawOutput extends OpenAISdkRawOutput | OpenAIResponseSdkRawOutput,
  TRawChunk extends OpenAISdkRawChunk | OpenAIResponseSdkRawChunk,
  TMessageParam extends OpenAISdkMessageParam | OpenAIResponseSdkMessageParam,
  TToolCall extends OpenAI.Chat.Completions.ChatCompletionMessageToolCall | OpenAIResponseSdkToolCall,
  TSdkSpecificTool extends OpenAI.Chat.Completions.ChatCompletionTool | OpenAIResponseSdkTool
> extends BaseApiClient<TSdkInstance, TSdkParams, TRawOutput, TRawChunk, TMessageParam, TToolCall, TSdkSpecificTool> {
  constructor(provider: Provider) {
    super(provider)
  }

  // 仅适用于openai
  override getBaseURL(): string {
    const host = this.provider.apiHost
    return formatApiHost(host)
  }

  override async listModels(): Promise<OpenAI.Models.Model[]> {
    try {
      const sdk = await this.getSdkInstance()
      const response = await sdk.models.list()

      if (this.provider.id === 'github') {
        // @ts-ignore key is not typed
        return response?.body
          .map(model => ({
            id: model.name,
            description: model.summary,
            object: 'model',
            owned_by: model.publisher
          }))
          .filter(isSupportedModel)
      }

      if (this.provider.id === 'together') {
        // @ts-ignore key is not typed
        return response?.body.map(model => ({
          id: model.id,
          description: model.display_name,
          object: 'model',
          owned_by: model.organization
        }))
      }

      const models = response.data || []
      models.forEach(model => {
        model.id = model.id.trim()
      })

      return models.filter(isSupportedModel)
    } catch (error) {
      console.error('Error listing models:', error)
      return []
    }
  }

  override async getSdkInstance() {
    if (this.sdkInstance) {
      return this.sdkInstance
    }

    const apiKeyForSdkInstance = this.provider.apiKey

    // if (this.provider.id === 'copilot') {
    //   const defaultHeaders = store.getState().copilot.defaultHeaders
    //   const { token } = await window.api.copilot.getToken(defaultHeaders)
    //   // this.provider.apiKey不允许修改
    //   // this.provider.apiKey = token
    //   apiKeyForSdkInstance = token
    // }

    if (this.provider.id === 'azure-openai' || this.provider.type === 'azure-openai') {
      this.sdkInstance = new AzureOpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: apiKeyForSdkInstance,
        apiVersion: this.provider.apiVersion,
        endpoint: this.provider.apiHost
      }) as TSdkInstance
    } else {
      this.sdkInstance = new OpenAI({
        dangerouslyAllowBrowser: true,
        apiKey: apiKeyForSdkInstance,
        baseURL: this.getBaseURL(),
        defaultHeaders: {
          ...this.defaultHeaders(),
          ...(this.provider.id === 'copilot' ? { 'editor-version': 'vscode/1.97.2' } : {}),
          ...(this.provider.id === 'copilot' ? { 'copilot-vision-request': 'true' } : {})
        }
      }) as TSdkInstance
    }

    return this.sdkInstance
  }
}
