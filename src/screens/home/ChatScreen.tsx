import { RouteProp, useRoute } from '@react-navigation/native'
import { LinearGradient } from '@tamagui/linear-gradient'
import React from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { styled, YStack } from 'tamagui'

import { HeaderBar } from '@/components/header-bar'
import { MessageInput } from '@/components/message-input/MessageInput'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useAssistant } from '@/hooks/useAssistant'
import { useTopic } from '@/hooks/useTopic'
import { RootStackParamList } from '@/types/naviagate'
import { useIsDark } from '@/utils'

import ChatContent from './ChatContent'
import WelcomeContent from './WelcomeContent'

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>

const ChatScreen = () => {
  const route = useRoute<ChatScreenRouteProp>()
  const { topicId } = route.params
  console.log('topicId', topicId)
  const isDark = useIsDark()
  const { updateAssistant } = useAssistant('default')
  const { topic, isLoading } = useTopic(topicId)
  console.log('useTopic', topic?.id)

  if (!topic || isLoading) {
    return (
      <SafeAreaContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </SafeAreaContainer>
    )
  }

  const hasMessages = topic.messages.length > 0

  // 动态颜色配置
  const gradientColors = isDark ? ['#acf3a633', '#acf3a6ff', '#acf3a633'] : ['#8de59e4d', '#81df94ff', '#8de59e4d']

  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <YStack paddingHorizontal={12} backgroundColor="$background" flex={1} onPress={Keyboard.dismiss}>
          <HeaderBar topic={topic} />

          {hasMessages ? <ChatContent topic={topic} /> : <WelcomeContent />}
          <LinearGradient padding={1} borderRadius={12} colors={gradientColors} start={[0, 0]} end={[1, 1]}>
            <InputContent>
              <MessageInput topic={topic} updateAssistant={updateAssistant} />
            </InputContent>
          </LinearGradient>
        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  )
}

const InputContent = styled(YStack, {
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 12,
  backgroundColor: '$background'
})

export default ChatScreen
