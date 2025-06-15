import { FileType } from './file'

export type KnowledgeReference = {
  id: number
  content: string
  sourceUrl: string
  type: KnowledgeItemType
  file?: FileType
}

export type KnowledgeItemType = 'file' | 'url' | 'note' | 'sitemap' | 'directory'
