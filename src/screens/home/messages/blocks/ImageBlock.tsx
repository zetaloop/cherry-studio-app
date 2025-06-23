import React, { memo } from 'react'
import { View } from 'tamagui'

import { ImageMessageBlock } from '@/types/message'

interface Props {
  block: ImageMessageBlock
}

const ImageBlock: React.FC<Props> = ({ block }) => {
  return <View></View>
}

export default memo(ImageBlock)
