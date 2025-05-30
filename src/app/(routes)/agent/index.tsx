import { useNavigation } from '@react-navigation/native'
import { PenSquare } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ScrollView, useTheme, XStack, YStack } from 'tamagui'

import AgentItem from '@/components/agent/agentItem'
import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { SearchInput } from '@/components/ui/searchInput'
import { MOCK_AGENTS } from '@/mock'
import { NavigationProps } from '@/types/naviagate'

export default function AgentPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()

  // 筛选状态
  const [showTags, setShowTags] = useState(false)
  const [showSaved, setShowSaved] = useState(false)
  const [showRecents, setShowRecents] = useState(false)

  const onAddAgent = () => {
    navigation.navigate('AgentDetailPage', { agentId: undefined, mode: 'create' })
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
        title={t('agents.title.recent')}
        onBackPress={() => navigation.goBack()}
        rightButton={{
          icon: <PenSquare size={24} />,
          onPress: onAddAgent
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
            {MOCK_AGENTS.map(agent => (
              <AgentItem key={agent.id} agent={agent} />
            ))}
          </YStack>
        </ScrollView>
      </SettingContainer>
    </SafeAreaView>
  )
}
