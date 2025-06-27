import React from 'react'
import { ScrollView } from 'tamagui'

import { Assistant, Topic } from '@/types/assistant'

import Messages from './messages/Messages'

interface ChatContentProps {
  assistant: Assistant
  topic: Topic
}

const ChatContent = ({ assistant, topic }: ChatContentProps) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Messages key={topic.id} assistant={assistant} topic={topic} />
    </ScrollView>
  )
}

export default ChatContent
