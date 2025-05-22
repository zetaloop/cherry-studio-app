import { Dexie, type EntityTable } from 'dexie'

import { FileType } from '@/types/file'
import { Message, MessageBlock } from '@/types/message'

export const db = new Dexie('CherryStudio') as Dexie & {
  files: EntityTable<FileType, 'id'>
  topics: EntityTable<{ id: string; messages: Message[] }, 'id'>
  settings: EntityTable<{ id: string; value: any }, 'id'>
  message_blocks: EntityTable<MessageBlock, 'id'>
}

db.version(1).stores({
  files: 'id, name, origin_name, path, size, ext, type, created_at, count',
  topics: '&id',
  settings: '&id, value',
  message_blocks: 'id, messageId, file.id'
})

export default db
