import { MotiScrollView } from 'moti'
import React, { useRef } from 'react'
import { ScrollView } from 'react-native'

import { useAssistant } from '@/hooks/useAssistant'
import { Topic } from '@/types/assistant'

import Messages from './messages/Messages'

interface ChatContentProps {
  topic: Topic
}

const ChatContent = ({ topic }: ChatContentProps) => {
  const { assistant, isLoading } = useAssistant(topic.assistantId)
  const scrollViewRef = useRef<ScrollView>(null)

  if (isLoading || !assistant) {
    return null
  }

  const handleContentSizeChange = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }

  return (
    <MotiScrollView
      ref={scrollViewRef}
      from={{ opacity: 0, translateY: 10 }}
      animate={{
        translateY: 0,
        opacity: 1
      }}
      exit={{ opacity: 1, translateY: -10 }}
      transition={{
        type: 'timing'
      }}
      showsVerticalScrollIndicator={false}
      onContentSizeChange={handleContentSizeChange}>
      <Messages key={topic.id} assistant={assistant} topic={topic} />
    </MotiScrollView>
  )
}

export default ChatContent
