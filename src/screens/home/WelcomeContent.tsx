import { useNavigation } from '@react-navigation/native'
import { MotiView } from 'moti'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, styled, Text, XStack, YStack } from 'tamagui'

import AssistantItemCard from '@/components/assistant/AssistantItemCard'
import { useAssistants } from '@/hooks/useAssistant'
import { NavigationProps } from '@/types/naviagate'

const WelcomeContent = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProps>()
  const { assistants: systemAssistants } = useAssistants()

  const handleSeeAllPress = () => {
    navigation.navigate('AssistantMarketScreen')
  }

  return (
    <MotiView
      style={{ flex: 1 }}
      from={{ opacity: 0, translateY: 10 }}
      animate={{
        translateY: 0,
        opacity: 1
      }}
      exit={{ opacity: 1, translateY: -10 }}
      transition={{
        type: 'timing'
      }}>
      {/* assistant market(Temporary) */}
      <YStack gap={17} paddingHorizontal={20} paddingTop={40}>
        <XStack justifyContent="space-between">
          <Text>{t('assistants.market.popular')}</Text>
          <Text onPress={handleSeeAllPress}>{t('common.see_all')}</Text>
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
          <Text fontSize="$3" color="$color11" textAlign="center" maxWidth={300}>
            {t('chat.welcome')}
          </Text>
        </YStack>
      </ContentContainer>
    </MotiView>
  )
}

const ContentContainer = styled(YStack, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
})

export default WelcomeContent
