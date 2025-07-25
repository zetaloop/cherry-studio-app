import { ChevronDown } from '@tamagui/lucide-icons'
import { AnimatePresence, MotiScrollView, MotiView } from 'moti'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, NativeScrollEvent, ScrollView, StyleSheet, View } from 'react-native'
import { Button } from 'tamagui'

import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useAssistant } from '@/hooks/useAssistant'
import { useMessages } from '@/hooks/useMessages'
import { Topic } from '@/types/assistant'
import { AssistantMessageStatus } from '@/types/message'

import Messages from './messages/Messages'

interface ChatContentProps {
  topic: Topic
}

const ChatContent = ({ topic }: ChatContentProps) => {
  const { assistant, isLoading } = useAssistant(topic.assistantId)
  const { messages } = useMessages(topic.id)
  const scrollViewRef = useRef<ScrollView>(null)

  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false)

  if (isLoading || !assistant) {
    return (
      <SafeAreaContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </SafeAreaContainer>
    )
  }

  const scrollToBottom = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }

  const handleContentSizeChange = () => {
    scrollToBottom()
  }

  const handleScroll = (event: NativeScrollEvent) => {
    const { layoutMeasurement, contentOffset, contentSize } = event

    const paddingToBottom = 20

    const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom

    if (isAtBottom) {
      if (showScrollToBottomButton) {
        setShowScrollToBottomButton(false)
      }
    } else {
      if (!showScrollToBottomButton) {
        setShowScrollToBottomButton(true)
      }
    }
  }

  const lastMessage = messages[messages.length - 1]
  const isLastMessageSuccessful = lastMessage?.status === AssistantMessageStatus.SUCCESS
  const shouldShowScrollButton = showScrollToBottomButton && isLastMessageSuccessful

  return (
    <View style={styles.container}>
      <MotiScrollView
        ref={scrollViewRef}
        from={{ opacity: 0, translateY: 10 }}
        animate={{
          translateY: 0,
          opacity: 1
        }}
        exit={{ opacity: 1, translateY: -10 }}
        transition={{
          type: 'timing'
        }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={handleContentSizeChange}
        onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
        scrollEventThrottle={16}>
        <Messages key={topic.id} assistant={assistant} topic={topic} />
      </MotiScrollView>

      <AnimatePresence>
        {shouldShowScrollButton && (
          <MotiView
            key="scroll-to-bottom-button"
            style={styles.fab}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'timing' }}>
            <Button
              circular
              borderWidth={2}
              borderColor="$gray20"
              icon={<ChevronDown size={24} color="$gray80" />}
              onPress={scrollToBottom}
            />
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ChatContent
