import { MotiScrollView } from 'moti'
import React from 'react'

import { useAssistant } from '@/hooks/useAssistant'
import { Topic } from '@/types/assistant'

import Messages from './messages/Messages'

interface ChatContentProps {
  topic: Topic
}

const ChatContent = ({ topic }: ChatContentProps) => {
  const { assistant, isLoading } = useAssistant(topic.assistantId)

  if (isLoading || !assistant) {
    return null
  }

  return (
    <MotiScrollView
      from={{ opacity: 0, translateY: 10 }}
      animate={{
        translateY: 0,
        opacity: 1
      }}
      exit={{ opacity: 1, translateY: -10 }}
      transition={{
        type: 'timing'
      }}
      showsVerticalScrollIndicator={false}>
      <Messages key={topic.id} assistant={assistant} topic={topic} />
    </MotiScrollView>
  )
}

export default ChatContent
