import { eq, inArray, sql } from 'drizzle-orm'

import { db } from '@/App'
import { MessageBlock, MessageBlockStatus, MessageBlockType } from '@/types/message'

// import { db } from '..'
import { messageBlocks } from '../schema'

type KeysOfUnion<T> = T extends T ? keyof T : never

// 数据库记录转换为 MessageBlock 类型
function transformDbToMessageBlock(dbRecord: any): MessageBlock {
  const base = {
    id: dbRecord.id,
    messageId: dbRecord.messageId,
    type: dbRecord.type as MessageBlockType,
    createdAt: dbRecord.createdAt,
    updatedAt: dbRecord.updatedAt,
    status: dbRecord.status as MessageBlockStatus,
    model: dbRecord.model ? JSON.parse(dbRecord.model) : undefined,
    metadata: dbRecord.metadata ? JSON.parse(dbRecord.metadata) : undefined,
    error: dbRecord.error ? JSON.parse(dbRecord.error) : undefined
  }

  // 根据类型添加特定字段并返回正确的类型
  switch (base.type) {
    case MessageBlockType.MAIN_TEXT:
      return {
        ...base,
        type: MessageBlockType.MAIN_TEXT,
        content: dbRecord.content || '',
        knowledgeBaseIds: dbRecord.knowledgeBaseIds ? JSON.parse(dbRecord.knowledgeBaseIds) : undefined,
        citationReferences: dbRecord.citationReferences ? JSON.parse(dbRecord.citationReferences) : undefined
      }

    case MessageBlockType.THINKING:
      return {
        ...base,
        type: MessageBlockType.THINKING,
        content: dbRecord.content || '',
        thinking_millsec: dbRecord.thinkingMillsec || undefined
      }

    case MessageBlockType.CODE:
      return {
        ...base,
        type: MessageBlockType.CODE,
        content: dbRecord.content || '',
        language: dbRecord.language || 'text'
      }

    case MessageBlockType.IMAGE:
      return {
        ...base,
        type: MessageBlockType.IMAGE,
        url: dbRecord.url || undefined,
        file: dbRecord.file ? JSON.parse(dbRecord.file) : undefined
      }

    case MessageBlockType.TOOL:
      return {
        ...base,
        type: MessageBlockType.TOOL,
        toolId: dbRecord.toolId || '',
        toolName: dbRecord.toolName || undefined,
        arguments: dbRecord.arguments ? JSON.parse(dbRecord.arguments) : undefined,
        content: dbRecord.content
          ? // 尝试解析为对象，如果失败则保持为字符串
            (() => {
              try {
                return JSON.parse(dbRecord.content)
              } catch {
                return dbRecord.content
              }
            })()
          : undefined
      }

    case MessageBlockType.TRANSLATION:
      return {
        ...base,
        type: MessageBlockType.TRANSLATION,
        content: dbRecord.content || '',
        sourceBlockId: dbRecord.sourceBlockId || undefined,
        sourceLanguage: dbRecord.sourceLanguage || undefined,
        targetLanguage: dbRecord.targetLanguage || ''
      }

    case MessageBlockType.CITATION:
      return {
        ...base,
        type: MessageBlockType.CITATION,
        response: dbRecord.response ? JSON.parse(dbRecord.response) : undefined,
        knowledge: dbRecord.knowledge ? JSON.parse(dbRecord.knowledge) : undefined
      }

    case MessageBlockType.FILE:
      return {
        ...base,
        type: MessageBlockType.FILE,
        file: dbRecord.file ? JSON.parse(dbRecord.file) : { id: '', name: '', path: '', size: 0, type: '', ext: '' }
      }

    case MessageBlockType.ERROR:
      return {
        ...base,
        type: MessageBlockType.ERROR
      }

    case MessageBlockType.UNKNOWN:
    default:
      return {
        ...base,
        type: MessageBlockType.UNKNOWN
      }
  }
}

// MessageBlock 转换为数据库记录
function transformMessageBlockToDb(messageBlock: MessageBlock): any {
  const base = {
    id: messageBlock.id,
    messageId: messageBlock.messageId,
    type: messageBlock.type,
    createdAt: messageBlock.createdAt,
    updatedAt: messageBlock.updatedAt,
    status: messageBlock.status,
    model: messageBlock.model ? JSON.stringify(messageBlock.model) : null,
    metadata: messageBlock.metadata ? JSON.stringify(messageBlock.metadata) : null,
    error: messageBlock.error ? JSON.stringify(messageBlock.error) : null
  }

  // 根据类型添加特定字段
  switch (messageBlock.type) {
    case MessageBlockType.MAIN_TEXT:
      return {
        ...base,
        content: messageBlock.content,
        knowledgeBaseIds: messageBlock.knowledgeBaseIds ? JSON.stringify(messageBlock.knowledgeBaseIds) : null,
        citationReferences: messageBlock.citationReferences ? JSON.stringify(messageBlock.citationReferences) : null
      }

    case MessageBlockType.THINKING:
      return {
        ...base,
        content: messageBlock.content,
        thinkingMillsec: messageBlock.thinking_millsec || null
      }

    case MessageBlockType.CODE:
      return {
        ...base,
        content: messageBlock.content,
        language: messageBlock.language
      }

    case MessageBlockType.IMAGE:
      return {
        ...base,
        url: messageBlock.url || null,
        file: messageBlock.file ? JSON.stringify(messageBlock.file) : null
      }

    case MessageBlockType.TOOL:
      return {
        ...base,
        toolId: messageBlock.toolId,
        toolName: messageBlock.toolName || null,
        arguments: messageBlock.arguments ? JSON.stringify(messageBlock.arguments) : null,
        content: typeof messageBlock.content === 'object' ? JSON.stringify(messageBlock.content) : messageBlock.content
      }

    case MessageBlockType.TRANSLATION:
      return {
        ...base,
        content: messageBlock.content,
        sourceBlockId: messageBlock.sourceBlockId || null,
        sourceLanguage: messageBlock.sourceLanguage || null,
        targetLanguage: messageBlock.targetLanguage
      }

    case MessageBlockType.CITATION:
      return {
        ...base,
        response: messageBlock.response ? JSON.stringify(messageBlock.response) : null,
        knowledge: messageBlock.knowledge ? JSON.stringify(messageBlock.knowledge) : null
      }

    case MessageBlockType.FILE:
      return {
        ...base,
        file: JSON.stringify(messageBlock.file)
      }

    default:
      return base
  }
}

/**
 * 添加或更新单个块 (Upsert)。
 * @param block - 要更新或插入的 MessageBlock 对象。
 */
export async function upsertOneBlock(block: MessageBlock) {
  const dbRecord = transformMessageBlockToDb(block)
  await db.insert(messageBlocks).values(dbRecord).onConflictDoUpdate({
    target: messageBlocks.id,
    set: dbRecord // 更新除主键外的所有字段
  })
}

/**
 * 添加或更新多个块。
 * @param blocks - 要更新或插入的 MessageBlock 对象数组。
 */
export async function upsertManyBlocks(blocks: MessageBlock[]) {
  if (blocks.length === 0) return

  const dbRecords = blocks.map(transformMessageBlockToDb)
  // 使用 onConflictDoUpdate 和 `excluded` 进行高效的批量 upsert
  await db
    .insert(messageBlocks)
    .values(dbRecords)
    .onConflictDoUpdate({
      target: messageBlocks.id,
      set: {
        messageId: sql.raw(`excluded.message_id`),
        type: sql.raw(`excluded.type`),
        updatedAt: sql.raw(`excluded.updated_at`),
        status: sql.raw(`excluded.status`),
        model: sql.raw(`excluded.model`),
        metadata: sql.raw(`excluded.metadata`),
        error: sql.raw(`excluded.error`),
        content: sql.raw(`excluded.content`),
        language: sql.raw(`excluded.language`),
        url: sql.raw(`excluded.url`),
        file: sql.raw(`excluded.file`),
        toolId: sql.raw(`excluded.tool_id`),
        toolName: sql.raw(`excluded.tool_name`),
        arguments: sql.raw(`excluded.arguments`),
        sourceBlockId: sql.raw(`excluded.source_block_id`),
        sourceLanguage: sql.raw(`excluded.source_language`),
        targetLanguage: sql.raw(`excluded.target_language`),
        response: sql.raw(`excluded.response`),
        knowledge: sql.raw(`excluded.knowledge`),
        thinkingMillsec: sql.raw(`excluded.thinking_millsec`),
        knowledgeBaseIds: sql.raw(`excluded.knowledge_base_ids`),
        citationReferences: sql.raw(`excluded.citation_references`)
      }
    })
}

/**
 * 更新单个现有块。
 * @param update - 包含块 ID 和要应用的更改的对象。
 */
export async function updateOneBlock(update: { id: string; changes: Partial<MessageBlock> }) {
  const { id, changes } = update
  const dbChanges: { [key: string]: any } = {}

  // 使用 KeysOfUnion 辅助类型来正确地类型化键数组。
  // 这会创建一个包含任何块类型中所有可能键的联合类型。
  const jsonFields: KeysOfUnion<MessageBlock>[] = [
    'model',
    'metadata',
    'error',
    'file',
    'arguments',
    'response',
    'knowledge',
    'knowledgeBaseIds',
    'citationReferences'
  ]

  for (const key in changes) {
    // 我们必须将 `changes` 转换为 `any` 来动态访问其属性，
    // 因为 TypeScript 无法保证给定的 `key` 存在于 `MessageBlock` 联合类型中的每一种类型上。
    const value = (changes as any)[key]
    if (value === undefined) continue

    // 为了类型兼容性，对 `includes` 方法使用字符串数组断言。
    if ((jsonFields as string[]).includes(key)) {
      dbChanges[key] = JSON.stringify(value)
    } else if (key === 'thinking_millsec') {
      dbChanges.thinkingMillsec = value // 映射到数据库列名
    } else if (key === 'content' && typeof value === 'object') {
      dbChanges.content = JSON.stringify(value)
    } else {
      dbChanges[key] = value
    }
  }

  if (Object.keys(dbChanges).length > 0) {
    await db.update(messageBlocks).set(dbChanges).where(eq(messageBlocks.id, id))
  }
}

/**
 * 根据 ID 移除单个块。
 * @param blockId - 要移除的块的 ID。
 */
export async function removeOneBlock(blockId: string) {
  await db.delete(messageBlocks).where(eq(messageBlocks.id, blockId))
}

/**
 * 根据 ID 列表移除多个块。
 * @param blockIds - 要移除的块的 ID 数组。
 */
export async function removeManyBlocks(blockIds: string[]) {
  if (blockIds.length === 0) return
  await db.delete(messageBlocks).where(inArray(messageBlocks.id, blockIds))
}

/**
 * 移除所有块。
 */
export async function removeAllBlocks() {
  await db.delete(messageBlocks)
}

// --- 查询函数 ---

/**
 * 根据消息 ID 获取所有消息块。
 * @param messageId - 消息的 ID。
 * @returns MessageBlock 对象数组。
 */
export async function getBlocksByMessageId(messageId: string): Promise<MessageBlock[]> {
  const dbRecords = await db.select().from(messageBlocks).where(eq(messageBlocks.messageId, messageId))
  return dbRecords.map(transformDbToMessageBlock)
}
