import { useNavigation } from '@react-navigation/native'
import { PenSquare } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ScrollView, useTheme, XStack, YStack } from 'tamagui'

import AssistantItem from '@/components/assistant/AssistantItem'
import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { SearchInput } from '@/components/ui/SearchInput'
import { MOCK_ASSISTANTS } from '@/mock'
import { NavigationProps } from '@/types/naviagate'

export default function AssistantScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()

  // 筛选状态
  const [showTags, setShowTags] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [showRecents, setShowRecents] = useState(false)

  const onAddAssistant = () => {
    navigation.navigate('AssistantDetail', { assistantId: undefined, mode: 'create' })
  }

  const handleRecentFilter = () => {
    setShowRecents(!showRecents)
    // 在这里处理筛选逻辑
    console.log('Filter by recents:', !showRecents)
  }

  const handleSavedFilter = () => {
    setShowSaved(!showSaved)
    // 在这里处理筛选逻辑
    console.log('Filter by saved:', !showSaved)
  }

  const handleTagsFilter = () => {
    setShowTags(!showTags)
    // 在这里处理筛选逻辑
    console.log('Filter by tags:', !showTags)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar
        title={t('assistants.title.recent')}
        onBackPress={() => navigation.goBack()}
        rightButton={{
          icon: <PenSquare size={24} />,
          onPress: onAddAssistant
        }}
      />
      <SettingContainer>
        <SearchInput placeholder={t('common.search_placeholder')} />
        <XStack gap={6}>
          {/* 多选框 */}
          <Button
            height={30}
            borderRadius={20}
            backgroundColor={showTags ? '$backgroundGreen' : undefined}
            color={showTags ? '$foregroundGreen' : undefined}
            onPress={handleTagsFilter}>
            Tags
          </Button>
          <Button
            fontSize={12}
            height={30}
            borderRadius={20}
            backgroundColor={showSaved ? '$backgroundGreen' : undefined}
            color={showSaved ? '$foregroundGreen' : undefined}
            onPress={handleSavedFilter}>
            {t('button.save')}
          </Button>
          <Button
            fontSize={12}
            height={30}
            borderRadius={20}
            backgroundColor={showRecents ? '$backgroundGreen' : undefined}
            color={showRecents ? '$foregroundGreen' : undefined}
            onPress={handleRecentFilter}>
            {t('button.recents')}
          </Button>
        </XStack>
        <ScrollView flex={1} gap={20}>
          <YStack gap={24}>
            {MOCK_ASSISTANTS.map(assistant => (
              <AssistantItem key={assistant.id} assistant={assistant} />
            ))}
          </YStack>
        </ScrollView>
      </SettingContainer>
    </SafeAreaView>
  )
}
