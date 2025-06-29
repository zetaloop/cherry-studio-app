import { StreamTextParams } from '@cherrystudio/ai-core'
import { isEmpty } from 'lodash'

import ModernAiProvider from '@/aiCore/index_new'
import { AiSdkMiddlewareConfig } from '@/aiCore/middleware/aisdk/AiSdkMiddlewareBuilder'
import { buildStreamTextParams } from '@/aiCore/transformParameters'
import i18n from '@/i18n'
import { Assistant, Model, Provider } from '@/types/assistant'
import { Chunk, ChunkType } from '@/types/chunk'
import { SdkModel } from '@/types/sdk'

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

export async function fetchModels(provider: Provider): Promise<SdkModel[]> {
  const AI = new ModernAiProvider(provider)

  try {
    return await AI.models()
  } catch (error) {
    return []
  }
}
