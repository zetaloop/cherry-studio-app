import { t } from 'i18next'

import { Assistant, Topic } from '@/types/assistant'
import { uuid } from '@/utils'

import { getTopics, upsertOneTopic } from '../../db/queries/topics.queries'

export async function createNewTopic(assistant: Assistant): Promise<Topic> {
  const newTopic: Topic = {
    id: uuid(),
    assistantId: assistant.id,
    name: t('new_topic'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: []
  }
  await upsertOneTopic(newTopic)
  return newTopic
}

export async function getNewestTopic(): Promise<Topic | null> {
  const topics = await getTopics()

  if (topics.length === 0) {
    return null
  }

  return topics[0]
}
