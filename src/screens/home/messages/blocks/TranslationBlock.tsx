import { FC } from 'react'
import React from 'react'
import { Separator, Spinner, View } from 'tamagui'

import { MessageBlockStatus, TranslationMessageBlock } from '@/types/message'

import ReactNativeMarkdown from '../../markdown/ReactNativeMarkdown'

interface Props {
  block: TranslationMessageBlock
}

const TranslationBlock: FC<Props> = ({ block }) => {
  return (
    <View>
      <Separator />
      {block.status === MessageBlockStatus.STREAMING ? <Spinner size="small" /> : <ReactNativeMarkdown block={block} />}
    </View>
  )
}

export default TranslationBlock
