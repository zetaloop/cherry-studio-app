import { MessageBlock, MessageBlockStatus, MessageBlockType } from '@/types/message'

import {
  getBlocksByMessageId,
  removeAllBlocks,
  upsertManyBlocks,
  upsertOneBlock
} from '../queries/messageBlocks.queries'

export async function testMessageBlocks() {
  const mockBlock1: MessageBlock = {
    id: '1',
    messageId: '1',
    type: MessageBlockType.MAIN_TEXT,
    status: MessageBlockStatus.SUCCESS,
    content: 'This is a test message block',
    createdAt: new Date().toISOString()
  }

  const mockBlock2: MessageBlock = {
    id: '2',
    messageId: '1',
    type: MessageBlockType.THINKING,
    status: MessageBlockStatus.SUCCESS,
    content: 'https://example.com/image.png',
    createdAt: new Date().toISOString()
  }

  console.log('[ UpsertOneBlock ]:', [mockBlock1].length)
  await upsertOneBlock(mockBlock1)
  const block = await getBlocksByMessageId('1')
  console.log(
    '[ UpsertOneBlock Query ]:',
    block.map(b => b.id)
  )

  console.log('[ UpsertManyBlocks ]:', [mockBlock1, mockBlock2].length)
  await upsertManyBlocks([mockBlock1, mockBlock2])
  const blocks = await getBlocksByMessageId('1')
  console.log(
    '[ UpsertManyBlocks Query ]:',
    blocks.map(b => b.id)
  )

  await removeAllBlocks()
}
