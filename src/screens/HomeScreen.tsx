import { useNavigation } from '@react-navigation/native'
import { t } from 'i18next'
import OpenAI from 'openai'
import React, { useMemo } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Image, styled, Text, View, XStack, YStack } from 'tamagui'

import AiProvider from '@/aiCore'
import { CompletionsParams } from '@/aiCore/middleware/schemas'
import AssistantItemCard from '@/components/assistant/AssistantItemCard'
import { MessageInput } from '@/components/message-input/MessageInput'
import { TopEntry } from '@/components/top-entry'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { getSystemAssistants, INITIAL_PROVIDERS, MOCK_ASSISTANTS } from '@/mock'
import { checkApiProvider } from '@/services/ApiService'
import { NavigationProps } from '@/types/naviagate'

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>()
  const systemAssistants = useMemo(() => getSystemAssistants(), [])

  const handlePress = () => {
    navigation.navigate('AssistantMarketScreen')
  }

  const handleOpenAISend = async () => {
    const client = new OpenAI({
      baseURL: INITIAL_PROVIDERS[0].apiHost,
      apiKey: INITIAL_PROVIDERS[0].apiKey
    })
    const stream = await client.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-V3',
      messages: [
        {
          role: 'user',
          content: 'hi'
        }
      ],
      // stream: true,
      stream: false
    })

    // for await (const chunk of stream) {
    //   console.log(chunk.choices[0]?.delta?.content || '')
    // }
    console.log(stream.choices[0]?.message?.content || '')
  }

  const handleAiCoreSend = async () => {
    try {
      checkApiProvider(INITIAL_PROVIDERS[0])

      const ai = new AiProvider(INITIAL_PROVIDERS[0])
      const params: CompletionsParams = {
        callType: 'check',
        messages: 'hi',
        assistant: MOCK_ASSISTANTS[0],
        streamOutput: false
        // streamOutput: true
      }

      const result = await ai.completions(params)
      console.log(result.getText())
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <YStack backgroundColor="$background" flex={1} onPress={Keyboard.dismiss}>
          <TopEntry />

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
