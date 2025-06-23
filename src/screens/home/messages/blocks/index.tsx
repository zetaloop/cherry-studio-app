import { eq } from 'drizzle-orm'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import React from 'react'
import { View, XStack } from 'tamagui'

import {
  ImageMessageBlock,
  MainTextMessageBlock,
  Message,
  MessageBlock,
  MessageBlockStatus,
  MessageBlockType
} from '@/types/message'

import { db } from '../../../../../db'
import { transformDbToMessageBlock } from '../../../../../db/queries/messageBlocks.queries'
import { messageBlocks as messageBlocksSchema } from '../../../../../db/schema'
import ImageBlock from './ImageBlock'
import MainTextBlock from './MainTextBlock'
import PlaceholderBlock from './PlaceholderBlock'

interface MessageBlockRendererProps {
  message: Message
}

const filterImageBlockGroups = (blocks: MessageBlock[]): (MessageBlock[] | MessageBlock)[] => {
  return blocks.reduce((acc: (MessageBlock[] | MessageBlock)[], currentBlock) => {
    if (currentBlock.type === MessageBlockType.IMAGE) {
      const prevGroup = acc[acc.length - 1]

      if (Array.isArray(prevGroup) && prevGroup[0].type === MessageBlockType.IMAGE) {
        prevGroup.push(currentBlock)
      } else {
        acc.push([currentBlock])
      }
    } else {
      acc.push(currentBlock)
    }

    return acc
  }, [])
}

const MessageBlockRenderer: FC<MessageBlockRendererProps> = ({ message }) => {
  const { data: rawBlocks } = useLiveQuery(
    db.select().from(messageBlocksSchema).where(eq(messageBlocksSchema.messageId, message.id))
  )

  const [renderedBlocks, setRenderedBlocks] = useState<MessageBlock[]>([])

  useEffect(() => {
    if (rawBlocks === undefined) {
      return
    }

    let isMounted = true

    const processMessages = async () => {
      const blocks = await Promise.all(
        rawBlocks.map(async rawblock => {
          const block = transformDbToMessageBlock(rawblock)
          return block
        })
      )

      if (isMounted) {
        setRenderedBlocks(blocks)
      }
    }

    processMessages()

    return () => {
      isMounted = false
    }
  }, [rawBlocks])
  const groupedBlocks = useMemo(() => filterImageBlockGroups(renderedBlocks), [renderedBlocks])

  return (
    <View>
      {groupedBlocks.map(block => {
        if (Array.isArray(block)) {
          const groupKey = block.map(imageBlock => imageBlock.id).join('-')
          return (
            <View key={groupKey}>
              <XStack>
                {block.map(imageBlock => (
                  <ImageBlock key={imageBlock.id} block={imageBlock as ImageMessageBlock} />
                ))}
              </XStack>
            </View>
          )
        }

        let blockComponent: React.ReactNode = null

        switch (block.type) {
          case MessageBlockType.UNKNOWN:
            if (block.status === MessageBlockStatus.PROCESSING) {
              blockComponent = <PlaceholderBlock key={block.id} block={block} />
            }

            break
          case MessageBlockType.MAIN_TEXT:

          case MessageBlockType.CODE: {
            const mainTextBlock = block as MainTextMessageBlock
            const citationBlockId = mainTextBlock.citationReferences?.[0]?.citationBlockId
            blockComponent = (
              <MainTextBlock
                key={block.id}
                block={mainTextBlock}
                // Pass only the ID string
                citationBlockId={citationBlockId}
              />
            )
            break
          }

          case MessageBlockType.IMAGE:
            blockComponent = <ImageBlock key={block.id} block={block} />
            break
          default:
            console.warn('Unsupported block type in MessageBlockRenderer:', (block as any).type, block)
            break
        }

        return <View key={block.type === MessageBlockType.UNKNOWN ? 'placeholder' : block.id}>{blockComponent}</View>
      })}
    </View>
  )
}

export default memo(MessageBlockRenderer)
