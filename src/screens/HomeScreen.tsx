import { useNavigation } from '@react-navigation/native'
import { t } from 'i18next'
import React, { useMemo, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Image, styled, Text, View, XStack, YStack } from 'tamagui'

import AssistantItemCard from '@/components/assistant/AssistantItemCard'
import { MessageInput } from '@/components/message-input/MessageInput'
import { TopEntry } from '@/components/top-entry'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { getSystemAssistants, MOCK_ASSISTANTS } from '@/mock'
import { fetchChatCompletion } from '@/services/ApiService'
import { createStreamProcessor } from '@/services/StreamProcessingService'
import { NavigationProps } from '@/types/naviagate'

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>()
  const systemAssistants = useMemo(() => getSystemAssistants(), [])
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])

  const handlePress = () => {
    navigation.navigate('AssistantMarketScreen')
  }

  const handleAiCoreSend = async (userInput: string) => {
    setMessages(prev => [...prev, { role: 'user', content: userInput }])

    let aiReply = ''

    const callbacks = {
      onTextChunk: (text: string) => {
        aiReply += text
        setMessages(prev => {
          const lastMessage = prev[prev.length - 1]

          if (lastMessage && lastMessage.role === 'assistant') {
            return [...prev.slice(0, -1), { ...lastMessage, content: aiReply }]
          }

          return [...prev, { role: 'assistant', content: aiReply }]
        })
      }
    }

    const streamProcessorCallbacks = createStreamProcessor(callbacks)
    await fetchChatCompletion({
      messages: [],
      assistant: MOCK_ASSISTANTS[0],
      onChunkReceived: streamProcessorCallbacks
    })
  }

  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <YStack backgroundColor="$background" flex={1} onPress={Keyboard.dismiss}>
          <TopEntry />

          {messages.length > 0 ? (
            <YStack paddingHorizontal={20} paddingTop={40} flex={1}>
              {messages.map((message, index) => (
                <Text key={index} fontSize={18}>
                  {message.role}: {message.content}
                </Text>
              ))}
            </YStack>
          ) : (
            <>
              {/* assistant market(Temporary) */}
              <YStack gap={17} paddingHorizontal={20} paddingTop={40}>
                <XStack justifyContent="space-between">
                  <Text>{t('assistants.market.popular')}</Text>
                  <Text onPress={handlePress}>{t('common.see_all')}</Text>
                </XStack>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <XStack gap={20}>
                    {systemAssistants.slice(0, 3).map(assistant => (
                      <AssistantItemCard
                        key={assistant.id}
                        assistant={assistant}
                        setIsBottomSheetOpen={() => {}}
                        onAssistantPress={() => {}}
                      />
                    ))}
                  </XStack>
                </ScrollView>
              </YStack>

              {/* 主要内容区域 */}
              <ContentContainer>
                <Image
                  source={require('@/assets/images/adaptive-icon.png')}
                  width={100}
                  height={100}
                  resizeMode="contain"
                  borderRadius={50}
                  overflow="hidden"
                />

                <YStack alignItems="center" space="$2">
                  <Text fontSize="$6" fontWeight="bold" color="$color12">
                    {t('chat.title')}
                  </Text>
                  <Text fontSize="$3" color="$color11" textAlign="center" maxWidth={300}>
                    {t('chat.welcome')}
                  </Text>
                </YStack>
              </ContentContainer>
            </>
          )}

          <InputContainer>
            <MessageInput onSend={handleAiCoreSend} />
          </InputContainer>
        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaContainer>
  )
}

const ContentContainer = styled(YStack, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
})

const InputContainer = styled(View, {
  marginHorizontal: '$3',
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: '$gray2',
  borderRadius: 9
})

export default HomeScreen
