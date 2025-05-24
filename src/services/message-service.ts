import FileManager from '@/services/file-service'
import { messageBlocksSelectors } from '@/store/message-block'
import { FileType } from '@/types/file'
import { Message, MessageBlockType } from '@/types/message'

export function deleteMessageFiles(message: Message) {
  const state = store.getState()
  message.blocks?.forEach(blockId => {
    const block = messageBlocksSelectors.selectById(state, blockId)

    if (block && (block.type === MessageBlockType.IMAGE || block.type === MessageBlockType.FILE)) {
      const fileData = (block as any).file as FileType | undefined

      if (fileData) {
        FileManager.deleteFiles([fileData])
      }
    }
  })
}
