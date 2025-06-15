import { useNavigation } from '@react-navigation/native'
import { t } from 'i18next'
import React, { useMemo } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, styled, Text, useTheme, View, XStack, YStack } from 'tamagui'

import AssistantItemCard from '@/components/assistant/AssistantItemCard'
import { MessageInput } from '@/components/message-input/MessageInput'
import { TopEntry } from '@/components/top-entry'
import { getSystemAssistants } from '@/mock'
import { NavigationProps } from '@/types/naviagate'

const HomeScreen = () => {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const systemAssistants = useMemo(() => getSystemAssistants(), [])

  const handlePress = () => {
    navigation.navigate('AssistantMarketScreen')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
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
            <MessageInput />
          </InputContainer>
        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
