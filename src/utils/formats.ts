import { Message } from '@/types/message'

import { findImageBlocks } from './messageUtils/find'

export function addImageFileToContents(messages: Message[]) {
  const lastAssistantMessage = messages.findLast(m => m.role === 'assistant')
  if (!lastAssistantMessage) return messages
  const blocks = findImageBlocks(lastAssistantMessage)
  if (!blocks || blocks.length === 0) return messages

  if (blocks.every(v => !v.metadata?.generateImage)) {
    return messages
  }

  const imageFiles = blocks.map(v => v.metadata?.generateImage?.images).flat()
  const updatedAssistantMessage = {
    ...lastAssistantMessage,
    images: imageFiles
  }

  return messages.map(message => (message.id === lastAssistantMessage.id ? updatedAssistantMessage : message))
}
