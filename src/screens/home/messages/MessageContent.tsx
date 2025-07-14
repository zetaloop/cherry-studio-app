import { LinearGradient } from '@tamagui/linear-gradient'
import React from 'react'
import { StyleSheet, useColorScheme } from 'react-native'
import { View } from 'tamagui'

import { useMessageBlocks } from '@/hooks/useMessageBlocks'
import { Message, MessageBlockType } from '@/types/message'

import MessageBlockRenderer from './blocks'

interface Props {
  message: Message
}

const MessageContent: React.FC<Props> = ({ message }) => {
  const theme = useColorScheme()
  const isDark = theme === 'dark'

  const isUser = message.role === 'user'
  const { processedBlocks } = useMessageBlocks(message.id)

  const mediaBlocks = processedBlocks.filter(
    block => block.type === MessageBlockType.IMAGE || block.type === MessageBlockType.FILE
  )
  const contentBlocks = processedBlocks.filter(
    block => block.type !== MessageBlockType.IMAGE && block.type !== MessageBlockType.FILE
  )

  const gradientColors = isDark ? ['#acf3a633', '#acf3a6ff'] : ['#8de59e4d', '#81df94ff']

  return (
    <View style={isUser ? styles.userContainer : styles.assistantContainer}>
      {mediaBlocks.length > 0 && <MessageBlockRenderer blocks={mediaBlocks} />}
      {contentBlocks.length > 0 && (
        <LinearGradient
          colors={isUser ? gradientColors : ['transparent', 'transparent']}
          start={[1, 0]}
          end={[1, 1]}
          style={[
            styles.contentWrapper,
            isUser ? styles.userMessageContent : styles.assistantMessageContent,
            mediaBlocks.length > 0 && { marginTop: 8 }
          ]}>
          <MessageBlockRenderer blocks={contentBlocks} />
        </LinearGradient>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  userContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end'
  },
  assistantContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  contentWrapper: {
    borderTopRightRadius: 8,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  userMessageContent: {
    flex: 1,
    paddingHorizontal: 20
  },
  assistantMessageContent: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10
  }
})

export default React.memo(MessageContent)
