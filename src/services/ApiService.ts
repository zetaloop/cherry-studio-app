import { StreamTextParams } from '@cherrystudio/ai-core'
import { t } from 'i18next'
import { isEmpty, takeRight } from 'lodash'

import LegacyAiProvider from '@/aiCore'
import AiProvider from '@/aiCore'
import ModernAiProvider from '@/aiCore/index_new'
import { AiSdkMiddlewareConfig } from '@/aiCore/middleware/aisdk/AiSdkMiddlewareBuilder'
import { CompletionsParams } from '@/aiCore/middleware/schemas'
import { buildStreamTextParams, convertMessagesToSdkMessages } from '@/aiCore/transformParameters'
import { isEmbeddingModel } from '@/config/models/embedding'
import i18n from '@/i18n'
import { Assistant, Model, Provider } from '@/types/assistant'
import { Chunk, ChunkType } from '@/types/chunk'
import { AssistantMessageStatus, Message, MessageBlock, MessageBlockStatus, MessageBlockType } from '@/types/message'
import { SdkModel } from '@/types/sdk'
import { createBaseMessageBlock, createTranslationBlock } from '@/utils/messageUtils/create'
import { filterMainTextMessages } from '@/utils/messageUtils/filters'

import { updateOneBlock, upsertBlocks } from '../../db/queries/messageBlocks.queries'
import { getMessageById, upsertMessages } from '../../db/queries/messages.queries'
import { createBlankAssistant, getAssistantById, getAssistantProvider, getDefaultModel } from './AssistantService'
import { createStreamProcessor, StreamProcessorCallbacks } from './StreamProcessingService'
import { getTopicById, upsertTopics } from './TopicService'

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
  const provider = await getAssistantProvider(assistant)

  const AI = new ModernAiProvider(assistant.model || getDefaultModel(), provider)

  // 使用 transformParameters 模块构建参数
  const {
    params: aiSdkParams,
    modelId,
    capabilities
  } = await buildStreamTextParams(messages, assistant, {
    requestOptions: options,
    webSearchProviderId: assistant.webSearchProviderId
  })

  const middlewareConfig: AiSdkMiddlewareConfig = {
    streamOutput: assistant.settings?.streamOutput ?? true,
    onChunk: onChunkReceived,
    model: assistant.model,
    provider: provider,
    enableReasoning: capabilities.enableReasoning
  }

  // --- Call AI Completions ---
  onChunkReceived({ type: ChunkType.LLM_RESPONSE_CREATED })
  await AI.completions(modelId, aiSdkParams, middlewareConfig)
}

export async function fetchModels(provider: Provider): Promise<SdkModel[]> {
  const AI = new AiProvider(provider)

  try {
    return await AI.models()
  } catch (error) {
    return []
  }
}

export async function fetchTranslate({
  assistantMessageId,
  message
}: {
  assistantMessageId: string
  message: Message
}) {
  let accumulatedContent = ''
  let initialPlaceholderBlockId: string | null = null
  let translationBlockId: string | null = null
  let callbacks: StreamProcessorCallbacks = {}
  callbacks = {
    onLLMResponseCreated: async () => {
      console.log(`[onLLMResponseCreated] Created initial placeholder block with ID`)

      const baseBlock = createBaseMessageBlock(assistantMessageId, MessageBlockType.UNKNOWN, {
        status: MessageBlockStatus.PROCESSING
      })
      initialPlaceholderBlockId = baseBlock.id
      await upsertBlocks(baseBlock)

      const toBeUpdatedMessage = await getMessageById(baseBlock.messageId)

      if (!toBeUpdatedMessage) {
        console.error(`[onLLMResponseCreated] Message ${baseBlock.messageId} not found.`)
        return
      }

      toBeUpdatedMessage.status = AssistantMessageStatus.PROCESSING
      await upsertMessages(toBeUpdatedMessage)
    },
    onTextChunk: async text => {
      accumulatedContent += text

      if (translationBlockId) {
        const blockChanges: Partial<MessageBlock> = {
          content: accumulatedContent,
          status: MessageBlockStatus.STREAMING
        }
        await updateOneBlock({ id: translationBlockId, changes: blockChanges })
      } else if (initialPlaceholderBlockId) {
        // 将占位块转换为翻译块
        const initialChanges: Partial<MessageBlock> = {
          type: MessageBlockType.TRANSLATION,
          content: accumulatedContent,
          status: MessageBlockStatus.STREAMING
        }
        translationBlockId = initialPlaceholderBlockId
        initialPlaceholderBlockId = null // 清理占位块ID
        await updateOneBlock({ id: translationBlockId, changes: initialChanges })
      } else {
        // Fallback in case onLLMResponseCreated was not triggered
        const newBlock = createTranslationBlock(assistantMessageId, accumulatedContent, {
          status: MessageBlockStatus.STREAMING
        })
        translationBlockId = newBlock.id
        await upsertBlocks(newBlock)
      }
    },
    onTextComplete: async finalText => {
      if (translationBlockId) {
        const changes = {
          content: finalText,
          status: MessageBlockStatus.SUCCESS
        }
        await updateOneBlock({ id: translationBlockId, changes })
        translationBlockId = null
      } else {
        console.warn(
          `[onTextComplete] Received text.complete but last block was not TRANSLATION  or lastBlockId  is null.`
        )
      }
    }
  }
  const streamProcessorCallbacks = createStreamProcessor(callbacks)

  const translateAssistant = await getAssistantById('translate')

  if (!translateAssistant.model) {
    throw new Error('Translate assistant model is not defined')
  }

  const provider = await getAssistantProvider(translateAssistant)
  message = {
    ...message,
    role: 'user'
  }
  const llmMessages = await convertMessagesToSdkMessages([message], translateAssistant.model)

  const AI = new ModernAiProvider(translateAssistant.model || getDefaultModel(), provider)
  const { params: aiSdkParams, modelId } = await buildStreamTextParams(llmMessages, translateAssistant)

  const middlewareConfig: AiSdkMiddlewareConfig = {
    streamOutput: translateAssistant.settings?.streamOutput ?? true,
    onChunk: streamProcessorCallbacks,
    model: translateAssistant.model,
    provider: provider,
    enableReasoning: translateAssistant.settings?.reasoning_effort !== undefined
  }

  try {
    return (await AI.completions(modelId, aiSdkParams, middlewareConfig)).getText() || ''
  } catch (error: any) {
    console.error('Error during translation:', error)
    return ''
  }
}

export function checkApiProvider(provider: Provider): void {
  if (
    provider.id !== 'ollama' &&
    provider.id !== 'lmstudio' &&
    provider.type !== 'vertexai' &&
    provider.id !== 'copilot'
  ) {
    if (!provider.apiKey) {
      throw new Error(i18n.t('message.error.enter.api.key'))
    }
  }

  if (!provider.apiHost && provider.type !== 'vertexai') {
    throw new Error(i18n.t('message.error.enter.api.host'))
  }

  if (isEmpty(provider.models)) {
    throw new Error(i18n.t('message.error.enter.model'))
  }
}

export async function checkApi(provider: Provider, model: Model): Promise<void> {
  checkApiProvider(provider)

  const ai = new LegacyAiProvider(provider)

  const assistant = createBlankAssistant()
  assistant.model = model

  try {
    if (isEmbeddingModel(model)) {
      await ai.getEmbeddingDimensions(model)
    } else {
      const params: CompletionsParams = {
        callType: 'check',
        messages: 'hi',
        assistant,
        streamOutput: true,
        shouldThrow: true
      }

      // Try streaming check first
      const result = await ai.completions(params)

      if (!result.getText()) {
        throw new Error('No response received')
      }
    }
  } catch (error: any) {
    if (error.message.includes('stream')) {
      const params: CompletionsParams = {
        callType: 'check',
        messages: 'hi',
        assistant,
        streamOutput: false,
        shouldThrow: true
      }
      const result = await ai.completions(params)

      if (!result.getText()) {
        throw new Error('No response received')
      }
    } else {
      throw error
    }
  }
}

export async function fetchTopicNaming(topicId: string) {
  console.log('Fetching topic naming...')
  const topic = await getTopicById(topicId)

  if (!topic) {
    console.error(`[fetchTopicNaming] Topic with ID ${topicId} not found.`)
    return
  }

  if (topic.name !== t('topics.new_topic')) {
    return
  }

  let callbacks: StreamProcessorCallbacks = {}

  callbacks = {
    onTextComplete: async finalText => {
      await upsertTopics([
        {
          ...topic,
          name: finalText
        }
      ])
    }
  }
  const streamProcessorCallbacks = createStreamProcessor(callbacks)
  const topicNamingAssistant = await getAssistantById('topic_naming')

  if (!topicNamingAssistant.model) {
    throw new Error('Translate assistant model is not defined')
  }

  const provider = await getAssistantProvider(topicNamingAssistant)

  // 总结上下文总是取最后5条消息
  const contextMessages = takeRight(topic.messages, 5)

  // LLM对多条消息的总结有问题，用单条结构化的消息表示会话内容会更好
  const mainTextMessages = await filterMainTextMessages(contextMessages)

  const llmMessages = await convertMessagesToSdkMessages(mainTextMessages, topicNamingAssistant.model)

  const AI = new ModernAiProvider(topicNamingAssistant.model || getDefaultModel(), provider)
  const { params: aiSdkParams, modelId } = await buildStreamTextParams(llmMessages, topicNamingAssistant)

  const middlewareConfig: AiSdkMiddlewareConfig = {
    streamOutput: topicNamingAssistant.settings?.streamOutput ?? true,
    onChunk: streamProcessorCallbacks,
    model: topicNamingAssistant.model,
    provider: provider,
    enableReasoning: topicNamingAssistant.settings?.reasoning_effort !== undefined
  }

  try {
    return (await AI.completions(modelId, aiSdkParams, middlewareConfig)).getText() || ''
  } catch (error: any) {
    console.error('Error during translation:', error)
    return ''
  }
}
