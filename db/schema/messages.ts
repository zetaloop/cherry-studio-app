import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { assistants } from './assistants'
import { topics } from './topics'

export const messages = sqliteTable(
  'messages',
  {
    id: text('id').notNull().unique().primaryKey(),
    role: text('role').notNull(),
    assistantId: text('assistant_id')
      .notNull()
      .references(() => assistants.id),
    topicId: text('topic_id')
      .notNull()
      .references(() => topics.id),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at'),
    status: text('status').notNull(),
    modelId: text('model_id'),
    model: text('model'),
    type: text('type'),
    useful: integer('useful', { mode: 'boolean' }),
    askId: text('ask_id'),
    mentions: text('mentions'),
    usage: text('usage'),
    metrics: text('metrics'),
    multiModelMessageStyle: text('multi_model_message_style'),
    foldSelected: integer('fold_selected', { mode: 'boolean' })
  },
  table => [index('idx_messages_topic_id').on(table.topicId), index('idx_messages_assistant_id').on(table.assistantId)]
)
