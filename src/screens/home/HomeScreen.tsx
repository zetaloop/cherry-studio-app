import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView, styled, View, YStack } from 'tamagui'

import { HeaderBar } from '@/components/header-bar'
import { MessageInput } from '@/components/message-input/MessageInput'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { getSystemAssistants, MOCK_TOPIC } from '@/mock'
import { getDefaultAssistant } from '@/services/AssistantService'
import { Assistant } from '@/types/assistant'
import { NavigationProps } from '@/types/naviagate'

import Messages from './messages/Messages'

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>()
  const [assistant, setAssistant] = useState<Assistant | null>(null)
  const systemAssistants = useMemo(() => getSystemAssistants(), [])

  useEffect(() => {
    const fetchAssistant = async () => {
      const data = await getDefaultAssistant()
      setAssistant(data)
    }

    fetchAssistant()
  }, [])

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
            {assistant && <Messages assistant={assistant} topic={MOCK_TOPIC} />}
          </ScrollView>
          <InputContainer>{assistant && <MessageInput assistant={assistant} topic={MOCK_TOPIC} />}</InputContainer>
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
