import { Assistant, Model, Topic, Usage } from '@/types/assistant'
import { FileType, FileTypes } from '@/types/file'
import { Message, MessageBlock, MessageBlockStatus } from '@/types/message'
import { uuid } from '@/utils'
import {
  createAssistantMessage,
  createFileBlock,
  createImageBlock,
  createMainTextBlock,
  createMessage
} from '@/utils/messageUtils/create'

import { upsertManyBlocks } from '../../db/queries/messageBlocks.queries'
import { upsertOneMessage } from '../../db/queries/messages.queries'
import { getTopicById, updateTopicMessages } from '../../db/queries/topics.queries'
import { getDefaultModel } from './AssistantService'

export {
  filterContextMessages,
  filterEmptyMessages,
  filterMessages,
  filterUsefulMessages,
  filterUserRoleStartMessages,
  getGroupedMessages
} from '@/utils/messageUtils/filters'

/**
 * Creates a user message object and associated blocks based on input.
 * This is a pure function and does not dispatch to the store.
 *
 * @param params - The parameters for creating the message.
 * @returns An object containing the created message and its blocks.
 */
export function getUserMessage({
  assistant,
  topic,
  type,
  content,
  files,
  // Keep other potential params if needed by createMessage
  mentions,
  usage
}: {
  assistant: Assistant
  topic: Topic
  type?: Message['type']
  content?: string
  files?: FileType[]
  mentions?: Model[]
  usage?: Usage
}): { message: Message; blocks: MessageBlock[] } {
  const defaultModel = getDefaultModel()
  const model = assistant.model || defaultModel
  const messageId = uuid() // Generate ID here
  const blocks: MessageBlock[] = []
  const blockIds: string[] = []

  // 内容为空也应该创建空文本块
  if (content !== undefined) {
    // Pass messageId when creating blocks
    const textBlock = createMainTextBlock(messageId, content, {
      status: MessageBlockStatus.SUCCESS
    })
    blocks.push(textBlock)
    blockIds.push(textBlock.id)
  }

  if (files?.length) {
    files.forEach(file => {
      if (file.type === FileTypes.IMAGE) {
        const imgBlock = createImageBlock(messageId, { file, status: MessageBlockStatus.SUCCESS })
        blocks.push(imgBlock)
        blockIds.push(imgBlock.id)
      } else {
        const fileBlock = createFileBlock(messageId, file, { status: MessageBlockStatus.SUCCESS })
        blocks.push(fileBlock)
        blockIds.push(fileBlock.id)
      }
    })
  }

  // 直接在createMessage中传入id
  const message = createMessage(
    'user',
    topic.id, // topic.id已经是string类型
    assistant.id,
    {
      id: messageId, // 直接传入ID，避免冲突
      modelId: model?.id,
      model: model,
      blocks: blockIds,
      mentions,
      type,
      usage
    }
  )

  // 不再需要手动合并ID
  return { message, blocks }
}

/**
 * 发送消息并处理助手回复
 * @param userMessage 已创建的用户消息
 * @param userMessageBlocks 用户消息关联的消息块
 * @param assistant 助手对象
 * @param topicId 主题ID
 */
export async function sendMessage(
  userMessage: Message,
  userMessageBlocks: MessageBlock[],
  assistant: Assistant,
  topicId: Topic['id']
) {
  console.log('[MessagesService] sendMessage')
  console.log('userMessage:', userMessage)
  console.log('userMessageBlocks:', userMessageBlocks)

  try {
    if (userMessage.blocks.length === 0) {
      console.warn('sendMessage: No blocks in the provided message.')
      return
    }

    // add message to database
    await saveMessageAndBlocksToDB(userMessage, userMessageBlocks)
    await upsertOneMessage(userMessage)

    const assistantMessage = createAssistantMessage(assistant.id, topicId, {
      askId: userMessage.id,
      model: assistant.model
    })
    await saveMessageAndBlocksToDB(assistantMessage, [])
    await upsertOneMessage(assistantMessage)
    // await fetchAndProcessAssistantResponseImpl(topicId, assistant, assistantMessage)
  } catch (error) {
    console.error('Error in sendMessage:', error)
  }
}

export const saveMessageAndBlocksToDB = async (message: Message, blocks: MessageBlock[], messageIndex: number = -1) => {
  try {
    if (blocks.length > 0) {
      await upsertManyBlocks(blocks)
    }

    // get topic from database
    const topic = await getTopicById(message.topicId)
    console.log('saveMessageAndBlocksToDB topic:', topic)

    if (topic) {
      const _messageIndex = topic.messages.findIndex(m => m.id === message.id)
      const updatedMessages = [...topic.messages]

      if (_messageIndex !== -1) {
        updatedMessages[_messageIndex] = message
      } else {
        if (messageIndex !== -1) {
          updatedMessages.splice(messageIndex, 0, message)
        } else {
          updatedMessages.push(message)
        }
      }

      await updateTopicMessages(topic.id, updatedMessages)
    } else {
      console.error(`[saveMessageAndBlocksToDB] Topic ${message.topicId} not found.`)
    }
  } catch (error) {
    console.error('Error saving message blocks:', error)
  }
}
