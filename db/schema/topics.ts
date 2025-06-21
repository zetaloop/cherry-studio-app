import { blob, index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { assistants } from './assistants'

export const topics = sqliteTable(
  'topics',
  {
    id: text('id').notNull().unique().primaryKey(),
    assistantId: text('assistant_id')
      .notNull()
      .references(() => assistants.id),
    name: text('name').notNull(),
    createdAt: text('created_at').notNull(),
    updatedAt: text('updated_at').notNull(),
    messages: blob('messages').notNull().default('[]'),
    pinned: integer({ mode: 'boolean' }),
    prompt: text('prompt'),
    isNameManuallyEdited: integer({ mode: 'boolean' })
  },
  table => [index('idx_topics_assistant_id').on(table.assistantId)]
)
