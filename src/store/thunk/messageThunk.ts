import { Assistant, Topic } from '@/types/assistant'
import { Message, MessageBlock } from '@/types/message'

import { AppDispatch, RootState } from '..'

/**
 * 发送消息并处理助手回复
 * @param userMessage 已创建的用户消息
 * @param userMessageBlocks 用户消息关联的消息块
 * @param assistant 助手对象
 * @param topicId 主题ID
 */
export const sendMessage =
  (userMessage: Message, userMessageBlocks: MessageBlock[], assistant: Assistant, topicId: Topic['id']) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    console.log('Sending message:', userMessage, userMessageBlocks, assistant, topicId)

    try {
      if (userMessage.blocks.length === 0) {
        console.warn('sendMessage: No blocks in the provided message.')
        return
      }
      // add message to database
    } catch (error) {
      console.error('Error in sendMessage thunk:', error)
    }
  }
