import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const assistants = sqliteTable('assistants', {
  id: text('id').notNull().unique().primaryKey(),
  name: text('name').notNull(),
  prompt: text('prompt').notNull(),
  // knowledgeIds: text('knowledge_ids'),
  // todo add foreign key
  // .references(() => knowledges.id),
  type: text('type').notNull().default('assistant'),
  emoji: text('emoji'),
  description: text('description'),
  model: blob('model'),
  defaultModel: blob('default_model'),
  settings: blob('settings'),
  enableWebSearch: integer('enable_web_search', { mode: 'boolean' }),
  // websearchProviderId: text('websearch_provider_id'),
  // todo add foreign key
  // .references(() => websearchProviders.id),
  enableGenerateImage: integer('enable_generate_image', { mode: 'boolean' }),
  // mcpServers: blob('mcp_servers'),
  knowledgeRecognition: text('knowledge_recognition'),
  tags: text('tags'),
  group: text('group')
})
