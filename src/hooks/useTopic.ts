import { desc, eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'

import { Topic } from '@/types/assistant'

import { db } from '../../db'
import { transformDbToTopic, upsertTopics } from '../../db/queries/topics.queries'
import { topics as topicSchema } from '../../db/schema'

export function useTopic(topicId: string) {
  const query = db.select().from(topicSchema).where(eq(topicSchema.id, topicId))

  // add deps https://stackoverflow.com/questions/79258085/drizzle-orm-uselivequery-doesnt-detect-parameters-change
  const { data: rawTopic, updatedAt } = useLiveQuery(query, [topicId])

  const updateTopic = async (topic: Topic) => {
    await upsertTopics([topic])
  }

  if (!updatedAt) {
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
  const query = db.select().from(topicSchema).orderBy(desc(topicSchema.created_at))
  const { data: rawTopics, updatedAt } = useLiveQuery(query)

  if (!updatedAt) {
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

export function useNewestTopic(): { topic: Topic | null; isLoading: boolean } {
  const query = db.select().from(topicSchema).orderBy(desc(topicSchema.created_at)).limit(1)

  const { data: rawTopics, updatedAt } = useLiveQuery(query)

  if (!updatedAt) {
    return {
      topic: null,
      isLoading: true
    }
  }

  const newestRawTopic = rawTopics[0]

  const processedTopic = transformDbToTopic(newestRawTopic)

  return {
    topic: processedTopic,
    isLoading: false
  }
}
