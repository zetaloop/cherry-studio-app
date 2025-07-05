import { RouteProp, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { styled, View, YStack } from 'tamagui'

import { HeaderBar } from '@/components/header-bar'
import { MessageInput } from '@/components/message-input/MessageInput'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useAssistant } from '@/hooks/useAssistant'
import { getDefaultAssistant } from '@/services/AssistantService'
import { createNewTopic, getNewestTopic, getTopicById } from '@/services/TopicService'
import { Assistant, Topic } from '@/types/assistant'
import { RootStackParamList } from '@/types/naviagate'
import { runAsyncFunction } from '@/utils'

import ChatContent from './ChatContent'
import WelcomeContent from './WelcomeContent'
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>

const HomeScreen = () => {
  const { updateAssistant } = useAssistant('default')
  const [topic, setTopic] = useState<Topic | null>(null)
  const [hasMessages, setHasMessages] = useState(false)
  const route = useRoute<HomeScreenRouteProp>()

  const { topicId } = route.params || {}

  useEffect(() => {
    const loadData = async () => {
      const defaultAssistant = await getDefaultAssistant()

      if (topicId) {
        const topicData = await getTopicById(topicId)

        if (topicData) {
          setTopic(topicData)
          setHasMessages(topicData.messages.length > 0)
        } else {
          console.warn(`Topic with ID ${topicId} not found.`)
          const newTopic = await createNewTopic(defaultAssistant)
          setTopic(newTopic)
          setHasMessages(false)
        }
      } else {
        let currentTopic = await getNewestTopic()

        if (!currentTopic) {
          currentTopic = await createNewTopic(defaultAssistant)
        }

        setTopic(currentTopic)
        setHasMessages(currentTopic.messages.length > 0)
      }
    }

    runAsyncFunction(loadData)
  }, [topicId])

  const handleAssistantSelect = async (selectedAssistant: Assistant) => {
    runAsyncFunction(async () => {
      const newTopic = await createNewTopic(selectedAssistant)
      setTopic(newTopic)
      setHasMessages(false)
    })
  }

  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <YStack paddingHorizontal={12} backgroundColor="$background" flex={1} onPress={Keyboard.dismiss}>
          {topic && <HeaderBar topic={topic} />}

          {hasMessages && topic ? (
            <ChatContent topic={topic} />
          ) : (
            <WelcomeContent onAssistantSelect={handleAssistantSelect} />
          )}
          <InputContainer>
            {topic && <MessageInput topic={topic} setHasMessages={setHasMessages} updateAssistant={updateAssistant} />}
          </InputContainer>
        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  )
}

const InputContainer = styled(View, {
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: '$gray2',
  borderRadius: 12
})

export default HomeScreen
