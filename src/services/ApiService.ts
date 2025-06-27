import { StreamTextParams } from '@cherrystudio/ai-core'
import { isEmpty } from 'lodash'

import ModernAiProvider from '@/aiCore'
import { AiSdkMiddlewareConfig } from '@/aiCore/middleware/aisdk/AiSdkMiddlewareBuilder'
import { buildStreamTextParams } from '@/aiCore/transformParameters'
import i18n from '@/i18n'
import { Assistant, Model, Provider } from '@/types/assistant'
import { Chunk, ChunkType } from '@/types/chunk'

import { getAssistantProvider } from './AssistantService'

const BASE_URL = 'http://localhost:8081'

export async function fetchChatCompletion({
  messages,
  assistant,
  options,
  onChunkReceived
}: {
  messages: StreamTextParams['messages']
  assistant: Assistant
  options: {
    signal?: AbortSignal
    timeout?: number
    headers?: Record<string, string>
  }

  onChunkReceived: (chunk: Chunk) => void
}) {
  console.log('fetchChatCompletion', messages, assistant)

  const provider = await getAssistantProvider(assistant)
  const AI = new ModernAiProvider(provider)
  const { params: aiSdkParams, modelId } = await buildStreamTextParams(messages, assistant, {
    // mcpTools: mcpTools,
    requestOptions: options
  })
  const middlewareConfig: AiSdkMiddlewareConfig = {
    streamOutput: assistant.settings?.streamOutput ?? true,
    onChunk: onChunkReceived,
    model: assistant.model,
    provider: provider,
    enableReasoning: assistant.settings?.reasoning_effort !== undefined
    // mcpTools
  }

  // --- Call AI Completions ---
  onChunkReceived({ type: ChunkType.LLM_RESPONSE_CREATED })
  await AI.completions(modelId, aiSdkParams, middlewareConfig)
}

export async function checkApi(provider: Provider, model: Model) {
  try {
    const url = `${BASE_URL}/api/provider/check`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        provider,
        model
      })
    }

    const response = await fetch(url, options)
    const data = await response.json()

    // 检查响应状态和数据
    if (!response.ok || !data.success) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('Error in checkApi:', error)
    throw error
  }
}

export async function fetchModels(provider: Provider): Promise<Model[]> {
  try {
    const url = `${BASE_URL}/api/models`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ provider })
    })
    const { models } = await response.json()
    return models
  } catch (error) {
    console.error('Error in fetchModels:', error)
    throw error
  }
}

export function checkApiProvider(provider: Provider): void {
  if (provider.id !== 'ollama' && provider.id !== 'lmstudio') {
    if (!provider.apiKey) {
      throw new Error(i18n.t('message.error.enter.api.key'))
    }
  }

  if (!provider.apiHost) {
    throw new Error(i18n.t('message.error.enter.api.host'))
  }

  if (isEmpty(provider.models)) {
    throw new Error(i18n.t('message.error.enter.model'))
  }
}

export async function mockCheckApi(provider: Provider, model: Model): Promise<void> {
  checkApiProvider(provider)
  return
  // const ai = new AiProvider(provider)

  // const assistant = await getAssistantById('1')
  // assistant.model = model

  // try {
  //   if (isEmbeddingModel(model)) {
  //     const result = await ai.getEmbeddingDimensions(model)

  //     if (result === 0) {
  //       throw new Error(i18n.t('message.error.enter.model'))
  //     }
  //   } else {
  //     const params: CompletionsParams = {
  //       callType: 'check',
  //       messages: 'hi',
  //       assistant,
  //       streamOutput: true
  //     }

  //     // Try streaming check first
  //     const result = await ai.completions(params)

  //     if (!result.getText()) {
  //       throw new Error('No response received')
  //     }

  //     console.log('Check API response:', result.getText())
  //   }
  // } catch (error: any) {
  //   if (error.message.includes('stream')) {
  //     const params: CompletionsParams = {
  //       callType: 'check',
  //       messages: 'hi',
  //       assistant,
  //       streamOutput: false
  //     }
  //     const result = await ai.completions(params)

  //     if (!result.getText()) {
  //       throw new Error('No response received')
  //     }
  //   } else {
  //     throw error
  //   }
  // }
}
