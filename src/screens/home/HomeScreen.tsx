import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView, styled, View, YStack } from 'tamagui'

import { HeaderBar } from '@/components/header-bar'
import { MessageInput } from '@/components/message-input/MessageInput'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { getSystemAssistants } from '@/mock'
import { createNewTopic, getDefaultAssistant } from '@/services/AssistantService'
import { Assistant, Topic } from '@/types/assistant'
import { NavigationProps, RootStackParamList } from '@/types/naviagate'
import { runAsyncFunction } from '@/utils'

import { getTopicById } from '../../../db/queries/topics.queries'
import Messages from './messages/Messages'
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>

const HomeScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProps>()
  const [assistant, setAssistant] = useState<Assistant | null>(null)
  const [topic, setTopic] = useState<Topic | null>(null)
  const systemAssistants = useMemo(() => getSystemAssistants(), [])
  const route = useRoute<HomeScreenRouteProp>()

  const { topicId } = route.params || {}

  useEffect(() => {
    runAsyncFunction(async () => {
      const assistantData = await getDefaultAssistant()
      setAssistant(assistantData)

      if (!topicId) {
        const newTopic = await createNewTopic(assistantData)
        setTopic(newTopic)
        console.log('Created new topic:', newTopic)
        return
      }

      const topicData = await getTopicById(topicId)

      if (topicData) {
        setTopic(topicData)
      } else {
        console.warn(`Topic with ID ${topicId} not found.`)
      }
    })
  }, [topicId])

  const handlePress = () => {
    navigation.navigate('AssistantMarketScreen')
  }

  const handleTestDatabase = async () => {
    // await upsertOneTopic(MOCK_TOPIC)
    // await testMessageBlocks()
    //   const assistants = getSystemAssistants()
    //   await upsertAssistants(assistants)
  }

  return (
    <SafeAreaContainer>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <YStack paddingHorizontal={12} backgroundColor="$background" flex={1} onPress={Keyboard.dismiss}>
          {assistant && <HeaderBar assistant={assistant} />}

          {/* assistant market(Temporary) */}
          {/* <YStack gap={17} paddingHorizontal={20} paddingTop={40}>
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
          </YStack> */}

          {/* 主要内容区域 */}
          {/* <ContentContainer>
            <Image
              source={require('@/assets/images/adaptive-icon.png')}
              width={100}
              height={100}
              resizeMode="contain"
              borderRadius={50}
              overflow="hidden"
            />

            <YStack alignItems="center" space="$2">
              <Text fontSize="$3" color="$color11" textAlign="center" maxWidth={300}>
                {t('chat.welcome')}
              </Text>
              <Button width={80} onPress={handleTestDatabase}>
                test
              </Button>
            </YStack>
          </ContentContainer> */}

          <ScrollView showsVerticalScrollIndicator={false}>
            {assistant && topic && <Messages key={topic.id} assistant={assistant} topic={topic} />}
          </ScrollView>

          <InputContainer>{assistant && topic && <MessageInput assistant={assistant} topic={topic} />}</InputContainer>
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
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: '$gray2',
  borderRadius: 12
})

export default HomeScreen
