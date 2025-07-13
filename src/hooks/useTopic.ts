import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'

import { Topic } from '@/types/assistant'

import { db } from '../../db'
import { transformDbToTopic, upsertTopics } from '../../db/queries/topics.queries'
import { topics as topicSchema } from '../../db/schema'

export function useTopic(topicId: string) {
  const query = db.select().from(topicSchema).where(eq(topicSchema.id, topicId))

  const { data: rawTopic, updatedAt } = useLiveQuery(query)

  const updateTopic = async (topic: Topic) => {
    await upsertTopics([topic])
  }

  if (!updatedAt || !rawTopic || rawTopic.length === 0) {
    return {
      topic: null,
      isLoading: true,
      updateTopic
    }
  }

  const processedTopic = transformDbToTopic(rawTopic[0])

  return {
    topic: processedTopic,
    isLoading: false,
    updateTopic
  }
}

export function useTopics() {
  const query = db.select().from(topicSchema)
  const { data: rawTopics, updatedAt } = useLiveQuery(query)

  if (!updatedAt || !rawTopics || rawTopics.length === 0) {
    return {
      topics: [],
      isLoading: true
    }
  }

  const processedTopics = rawTopics.map(transformDbToTopic)

  return {
    topics: processedTopics,
    isLoading: false
  }
}
