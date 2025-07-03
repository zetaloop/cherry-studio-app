import { StreamTextParams } from '@cherrystudio/ai-core'

import ModernAiProvider from '@/aiCore/index_new'
import { AiSdkMiddlewareConfig } from '@/aiCore/middleware/aisdk/AiSdkMiddlewareBuilder'
import { buildStreamTextParams, convertMessagesToSdkMessages } from '@/aiCore/transformParameters'
import { Assistant, Provider } from '@/types/assistant'
import { Chunk, ChunkType } from '@/types/chunk'
import { AssistantMessageStatus, Message, MessageBlock, MessageBlockStatus } from '@/types/message'
import { SdkModel } from '@/types/sdk'
import { createTranslationBlock } from '@/utils/messageUtils/create'

import { updateOneBlock, upsertBlocks } from '../../db/queries/messageBlocks.queries'
import { getMessageById, upsertMessages } from '../../db/queries/messages.queries'
import { getAssistantById, getAssistantProvider } from './AssistantService'
import { createStreamProcessor, StreamProcessorCallbacks } from './StreamProcessingService'

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

export async function fetchModels(provider: Provider): Promise<SdkModel[]> {
  const AI = new ModernAiProvider(provider)

  try {
    return await AI.models()
  } catch (error) {
    return []
  }
}

export async function fetchTranslate({
  assistantMessageId,
  messages
}: {
  assistantMessageId: string
  messages: Message[]
}) {
  console.log('Fetching translation for messages:', messages)

  let accumulatedContent = ''
  let translationBlockId: string | null = null
  let callbacks: StreamProcessorCallbacks = {}
  callbacks = {
    onTextChunk: async text => {
      accumulatedContent += text

      if (translationBlockId) {
        const blockChanges: Partial<MessageBlock> = {
          content: accumulatedContent,
          status: MessageBlockStatus.STREAMING
        }
        await updateOneBlock({ id: translationBlockId, changes: blockChanges })
      } else {
        const newBlock = createTranslationBlock(assistantMessageId, accumulatedContent, {
          status: MessageBlockStatus.STREAMING
        })
        translationBlockId = newBlock.id // 立即设置ID，防止竞态条件
        // add new block to database
        await upsertBlocks(newBlock)
        // change message status
        const toBeUpdatedMessage = await getMessageById(newBlock.messageId)

        if (!toBeUpdatedMessage) {
          console.error(`[upsertBlockReference] Message ${newBlock.messageId} not found.`)
          return
        }

        // Update Message Status based on Block Status
        if (newBlock.status === MessageBlockStatus.ERROR) {
          toBeUpdatedMessage.status = AssistantMessageStatus.ERROR
        } else if (
          newBlock.status === MessageBlockStatus.SUCCESS &&
          toBeUpdatedMessage.status !== AssistantMessageStatus.PROCESSING &&
          toBeUpdatedMessage.status !== AssistantMessageStatus.SUCCESS &&
          toBeUpdatedMessage.status !== AssistantMessageStatus.ERROR
        ) {
          toBeUpdatedMessage.status = AssistantMessageStatus.SUCCESS
        } else if (
          newBlock.status === MessageBlockStatus.PROCESSING ||
          newBlock.status === MessageBlockStatus.STREAMING
        ) {
          toBeUpdatedMessage.status = AssistantMessageStatus.PROCESSING
        }

        const updatedMessage = await upsertMessages(toBeUpdatedMessage)

        if (!updatedMessage) {
          console.error(`[handleBlockTransition] Failed to update message ${toBeUpdatedMessage.id} in state.`)
          return
        }
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
  const llmMessages = await convertMessagesToSdkMessages(messages, translateAssistant.model)

  console.log('LLM Messages for Translation:', llmMessages)

  const AI = new ModernAiProvider(provider)
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
