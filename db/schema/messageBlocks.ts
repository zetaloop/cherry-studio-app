import { blob, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const messageBlocks = sqliteTable('message_blocks', {
  id: text('id').notNull().unique().primaryKey(),
  messageId: text('message_id').notNull(),
  type: text('type').notNull(), // MessageBlockType enum values
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at'),
  status: text('status').notNull(), // MessageBlockStatus enum values
  model: blob('model'), // Model object as JSON
  metadata: blob('metadata'), // Record<string, any> as JSON
  error: blob('error'), // Record<string, any> as JSON

  // Content fields - used by different block types
  content: text('content'), // Main content for text, code, thinking blocks
  language: text('language'), // For code blocks
  url: text('url'), // For image blocks
  file: blob('file'), // FileType object as JSON for image/file blocks

  // Tool block specific fields
  toolId: text('tool_id'), // For tool blocks
  toolName: text('tool_name'), // For tool blocks
  arguments: blob('arguments'), // Record<string, any> as JSON for tool blocks

  // Translation block specific fields
  sourceBlockId: text('source_block_id'), // For translation blocks
  sourceLanguage: text('source_language'), // For translation blocks
  targetLanguage: text('target_language'), // For translation blocks

  // Citation block specific fields
  response: blob('response'), // WebSearchResponse as JSON
  knowledge: blob('knowledge'), // KnowledgeReference[] as JSON

  // Thinking block specific fields
  thinkingMillsec: integer('thinking_millsec'), // For thinking blocks

  // Main text block specific fields
  knowledgeBaseIds: blob('knowledge_base_ids'), // string[] as JSON
  citationReferences: blob('citation_references') // Citation references as JSON
})
