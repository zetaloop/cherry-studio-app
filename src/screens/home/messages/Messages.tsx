import { FlashList } from '@shopify/flash-list'
import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { FC, useEffect, useMemo, useState } from 'react'
import React from 'react'
import { View } from 'tamagui'

import { Assistant, Topic } from '@/types/assistant'
import { Message } from '@/types/message'

import { db } from '../../../../db'
import { getBlocksIdByMessageId } from '../../../../db/queries/messageBlocks.queries'
import { transformDbToMessage } from '../../../../db/queries/messages.queries'
import { messages as messagesSchema } from '../../../../db/schema/messages'
import MessageItem from './Message'

interface MessagesProps {
  assistant: Assistant
  topic: Topic
  setActiveTopic?: (topic: Topic) => void
  onComponentUpdate?(): void
  onFirstUpdate?(): void
}

const Messages: FC<MessagesProps> = ({ assistant, topic, setActiveTopic, onComponentUpdate, onFirstUpdate }) => {
  const query = useMemo(
    () =>
      db.select().from(messagesSchema).where(eq(messagesSchema.topicId, topic.id)).orderBy(messagesSchema.createdAt),
    [topic.id]
  )
  const { data: rawMessages } = useLiveQuery(query)

  const [processedMessages, setProcessedMessages] = useState<Message[]>([])

  useEffect(() => {
    if (rawMessages === undefined) {
      return
    }

    let isMounted = true

    const processMessages = async () => {
      const messagesWithBlocks = await Promise.all(
        rawMessages.map(async rawMsg => {
          const message = transformDbToMessage(rawMsg)
          message.blocks = await getBlocksIdByMessageId(message.id)
          return message
        })
      )

      if (isMounted) {
        setProcessedMessages(messagesWithBlocks)
      }
    }

    processMessages()

    return () => {
      isMounted = false
    }
  }, [rawMessages])

  const renderMessage = ({ item }: { item: Message }) => {
    return <MessageItem assistant={assistant} message={item} />
  }

  return (
    <View flex={1}>
      <FlashList data={processedMessages} renderItem={renderMessage} keyExtractor={item => item.id} />
    </View>
  )
}

export default Messages
