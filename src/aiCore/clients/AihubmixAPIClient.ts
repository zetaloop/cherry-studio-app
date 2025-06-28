import { isOpenAILLMModel } from '@/config/models/webSearch'
import { Model, Provider } from '@/types/assistant'
import { SdkInstance, SdkModel } from '@/types/sdk'

import { AnthropicAPIClient } from './anthropic/AnthropicAPIClient'
import { BaseApiClient } from './BaseApiClient'
import { GeminiAPIClient } from './gemini/GeminiAPIClient'
import { OpenAIAPIClient } from './openai/OpenAIApiClient'
import { OpenAIResponseAPIClient } from './openai/OpenAIResponseAPIClient'

/**
 * AihubmixAPIClient - 根据模型类型自动选择合适的ApiClient
 * 使用装饰器模式实现，在ApiClient层面进行模型路由
 */
export class AihubmixAPIClient extends BaseApiClient {
  // 使用联合类型而不是any，保持类型安全
  private clients: Map<string, AnthropicAPIClient | GeminiAPIClient | OpenAIResponseAPIClient | OpenAIAPIClient> =
    new Map()
  private defaultClient: OpenAIAPIClient
  private currentClient: BaseApiClient

  constructor(provider: Provider) {
    super(provider)

    // 初始化各个client - 现在有类型安全
    const claudeClient = new AnthropicAPIClient(provider)
    const geminiClient = new GeminiAPIClient({ ...provider, apiHost: 'https://aihubmix.com/gemini' })
    const openaiClient = new OpenAIResponseAPIClient(provider)
    const defaultClient = new OpenAIAPIClient(provider)

    this.clients.set('claude', claudeClient)
    this.clients.set('gemini', geminiClient)
    this.clients.set('openai', openaiClient)
    this.clients.set('default', defaultClient)

    // 设置默认client
    this.defaultClient = defaultClient
    this.currentClient = this.defaultClient as BaseApiClient
  }

  /**
   * 类型守卫：确保client是BaseApiClient的实例
   */
  private isValidClient(client: unknown): client is BaseApiClient {
    return (
      client !== null &&
      client !== undefined &&
      typeof client === 'object' &&
      'createCompletions' in client &&
      'getRequestTransformer' in client &&
      'getResponseChunkTransformer' in client
    )
  }

  /**
   * 根据模型获取合适的client
   */
  private getClient(model: Model): BaseApiClient {
    const id = model.id.toLowerCase()

    // claude开头
    if (id.startsWith('claude')) {
      const client = this.clients.get('claude')

      if (!client || !this.isValidClient(client)) {
        throw new Error('Claude client not properly initialized')
      }

      return client
    }

    // gemini开头 且不以-nothink、-search结尾
    if ((id.startsWith('gemini') || id.startsWith('imagen')) && !id.endsWith('-nothink') && !id.endsWith('-search')) {
      const client = this.clients.get('gemini')

      if (!client || !this.isValidClient(client)) {
        throw new Error('Gemini client not properly initialized')
      }

      return client
    }

    // OpenAI系列模型
    if (isOpenAILLMModel(model)) {
      const client = this.clients.get('openai')

      if (!client || !this.isValidClient(client)) {
        throw new Error('OpenAI client not properly initialized')
      }

      return client
    }

    return this.defaultClient as BaseApiClient
  }

  /**
   * 根据模型选择合适的client并委托调用
   */
  public getClientForModel(model: Model): BaseApiClient {
    this.currentClient = this.getClient(model)
    return this.currentClient
  }

  // ============ BaseApiClient 抽象方法实现 ============

  async listModels(): Promise<SdkModel[]> {
    // 可以聚合所有client的模型，或者使用默认client
    return this.defaultClient.listModels()
  }

  async getSdkInstance(): Promise<SdkInstance> {
    return this.currentClient.getSdkInstance()
  }
}
