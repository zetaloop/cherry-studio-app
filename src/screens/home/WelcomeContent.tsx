import React from 'react'
import { useTranslation } from 'react-i18next'
import { Image, ScrollView, styled, Text, XStack, YStack } from 'tamagui'

import AssistantItemCard from '@/components/assistant/AssistantItemCard'
import { Assistant } from '@/types/assistant'

interface WelcomeContentProps {
  systemAssistants: Assistant[]
  onSeeAllPress: () => void
  onAssistantPress: (assistant: Assistant) => void
}

const WelcomeContent = ({ systemAssistants, onSeeAllPress, onAssistantPress }: WelcomeContentProps) => {
  const { t } = useTranslation()

  return (
    <>
      {/* assistant market(Temporary) */}
      <YStack gap={17} paddingHorizontal={20} paddingTop={40}>
        <XStack justifyContent="space-between">
          <Text>{t('assistants.market.popular')}</Text>
          <Text onPress={onSeeAllPress}>{t('common.see_all')}</Text>
        </XStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap={20}>
            {systemAssistants.slice(0, 3).map(assistant => (
              <AssistantItemCard
                key={assistant.id}
                assistant={assistant}
                setIsBottomSheetOpen={() => {}}
                onAssistantPress={() => onAssistantPress(assistant)}
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
    </>
  )
}

const ContentContainer = styled(YStack, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
})

export default WelcomeContent
