import { RouteProp, useRoute } from '@react-navigation/native'
import { LinearGradient } from '@tamagui/linear-gradient'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { styled, YStack } from 'tamagui'

import { HeaderBar } from '@/components/header-bar'
import { MessageInput } from '@/components/message-input/MessageInput'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useAssistant } from '@/hooks/useAssistant'
import { useTopic } from '@/hooks/useTopic'
import { getDefaultAssistant } from '@/services/AssistantService'
import { createNewTopic, getNewestTopic, getTopicById } from '@/services/TopicService'
import { Topic } from '@/types/assistant'
import { RootStackParamList } from '@/types/naviagate'
import { runAsyncFunction, useIsDark } from '@/utils'

import ChatContent from './ChatContent'
import WelcomeContent from './WelcomeContent'

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>

const HomeChat = ({ initialTopic }: { initialTopic: Topic }) => {
  const isDark = useIsDark()
  const { updateAssistant } = useAssistant('default')
  const { topic, isLoading } = useTopic(initialTopic.id)

  if (!topic || isLoading) {
    return (
      <SafeAreaContainer>
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

// todo: 当侧边栏删除当前主页的topic会进入加载状态
const HomeScreen = () => {
  const [topic, setTopic] = useState<Topic | null>(null)
  const route = useRoute<HomeScreenRouteProp>()
  const { topicId } = route.params || {}

  useEffect(() => {
    const loadData = async () => {
      const defaultAssistant = await getDefaultAssistant()
      let currentTopic: Topic | null = null

      if (topicId) {
        currentTopic = await getTopicById(topicId)

        if (!currentTopic) {
          console.warn(`Topic with ID ${topicId} not found.`)
          currentTopic = await createNewTopic(defaultAssistant)
        }
      } else {
        currentTopic = await getNewestTopic()

        if (!currentTopic) {
          currentTopic = await createNewTopic(defaultAssistant)
        }
      }

      setTopic(currentTopic)
    }

    runAsyncFunction(loadData)
  }, [topicId])

  if (!topic) {
    return (
      <SafeAreaContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </SafeAreaContainer>
    )
  }

  return <HomeChat key={topic.id} initialTopic={topic} />
}

const InputContent = styled(YStack, {
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 12,
  backgroundColor: '$background'
})

export default HomeScreen
