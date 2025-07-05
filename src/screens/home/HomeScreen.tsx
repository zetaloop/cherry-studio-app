import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { styled, View, YStack } from 'tamagui'

import { HeaderBar } from '@/components/header-bar'
import { MessageInput } from '@/components/message-input/MessageInput'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useAssistants } from '@/hooks/useAssistant'
import { getDefaultAssistant } from '@/services/AssistantService'
import { createNewTopic, getNewestTopic, getTopicById } from '@/services/TopicService'
import { Assistant, Model, ReasoningEffortOptions, Topic } from '@/types/assistant'
import { FileType } from '@/types/file'
import { NavigationProps, RootStackParamList } from '@/types/naviagate'
import { runAsyncFunction } from '@/utils'

import ChatContent from './ChatContent'
import SheetView, { SheetType } from './sheets'
import WelcomeContent from './WelcomeContent'
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>()
  const [assistant, setAssistant] = useState<Assistant | null>(null)
  const [topic, setTopic] = useState<Topic | null>(null)
  const { assistants: systemAssistants } = useAssistants()
  const [hasMessages, setHasMessages] = useState(false)
  const route = useRoute<HomeScreenRouteProp>()

  // mention sheet
  const [activeSheet, setActiveSheet] = useState<SheetType | null>(null)
  const [mentions, setMentions] = useState<Model[]>([])
  const [files, setFiles] = useState<FileType[]>([])
  const [reasoningEffort, setReasoningEffort] = useState<ReasoningEffortOptions | null>(null)

  const { topicId } = route.params || {}

  useEffect(() => {
    const loadData = async () => {
      const defaultAssistant = await getDefaultAssistant()
      setAssistant(defaultAssistant)

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

  const handleSeeAllAssistants = () => {
    navigation.navigate('AssistantMarketScreen')
  }

  const handleAssistantSelect = async (selectedAssistant: Assistant) => {
    runAsyncFunction(async () => {
      const newTopic = await createNewTopic(selectedAssistant)
      setAssistant(selectedAssistant)
      setTopic(newTopic)
      setHasMessages(false)
    })
  }

  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <YStack paddingHorizontal={12} backgroundColor="$background" flex={1} onPress={Keyboard.dismiss}>
          {assistant && <HeaderBar assistant={assistant} />}

          {hasMessages && assistant && topic ? (
            <ChatContent assistant={assistant} topic={topic} />
          ) : (
            <WelcomeContent
              systemAssistants={systemAssistants}
              onSeeAllPress={handleSeeAllAssistants}
              onAssistantPress={handleAssistantSelect}
            />
          )}

          <InputContainer>
            {assistant && topic && (
              <MessageInput
                assistant={assistant}
                topic={topic}
                setHasMessages={setHasMessages}
                setActiveSheet={setActiveSheet}
                mentions={mentions}
                files={files}
                setFiles={setFiles}
                reasoningEffort={reasoningEffort}
              />
            )}
          </InputContainer>
        </YStack>
      </KeyboardAvoidingView>
      <SheetView
        activeSheet={activeSheet}
        setActiveSheet={setActiveSheet}
        mentions={mentions}
        setMentions={setMentions}
        files={files}
        setFiles={setFiles}
        reasoningEffort={reasoningEffort}
        setReasoningEffort={setReasoningEffort}
      />
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
