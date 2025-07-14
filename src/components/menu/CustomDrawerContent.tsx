import { DrawerContentComponentProps, DrawerItemList } from '@react-navigation/drawer'
import { Settings } from '@tamagui/lucide-icons'
import { BlurView } from 'expo-blur'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { Avatar, Button, Tabs, Text, View, XStack, YStack } from 'tamagui'

import { AssistantList } from '@/components/assistant/AssistantList'
import { MenuTabContent } from '@/components/menu/MenuTabContent'
import { GroupedTopicList } from '@/components/topic/GroupTopicList'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useStarAssistants } from '@/hooks/useAssistant'
import { useTopics } from '@/hooks/useTopic'
import { useIsDark } from '@/utils'
import { getAssistantWithTopic } from '@/utils/assistants'

import { SearchInput } from '../ui/SearchInput'
import { MenuTab, TabItem } from './MenuTab'

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation()
  const isDark = useIsDark()
  const { topics, isLoading: isLoadingTopics } = useTopics()
  const { assistants, isLoading: isLoadingAssistants } = useStarAssistants()
  const [activeTab, setActiveTab] = useState<string>('topic')

  const menuTabs: TabItem[] = [
    { id: 'assistant', label: t('menu.assistant.title') },
    { id: 'topic', label: t('menu.topic.title') }
  ]

  const handleAssistantsSeeAll = () => {
    props.navigation.navigate('Main', { screen: 'AssistantScreen' })
  }

  const handleTopicSeeAll = () => {
    props.navigation.navigate('Main', { screen: 'TopicScreen' })
  }

  if (isLoadingTopics || isLoadingAssistants) {
    return (
      <SafeAreaContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </SafeAreaContainer>
    )
  }

  const assistantWithTopics = getAssistantWithTopic(assistants, topics)

  return (
    <YStack flex={1}>
      <BlurView style={{ flex: 1 }} intensity={60} tint="default">
        <YStack gap={10} flex={1} padding={20}>
          <YStack>
            <DrawerItemList {...props} />
          </YStack>

          <YStack backgroundColor="transparent" paddingTop={20} flex={1}>
            <MenuTab tabs={menuTabs} activeTab={activeTab} onTabChange={setActiveTab}>
              <Tabs.Content
                key="topic"
                value="topic"
                flex={1}
                animation="quick"
                enterStyle={{ opacity: 0, x: -20 }}
                exitStyle={{ opacity: 0, x: 20 }}>
                <SearchInput placeholder={t('common.search_placeholder')} />

                <MenuTabContent title={t('menu.topic.recent')} onSeeAllPress={handleTopicSeeAll}>
                  <View flex={1} minHeight={200}>
                    <GroupedTopicList topics={topics} />
                  </View>
                </MenuTabContent>
              </Tabs.Content>

              <Tabs.Content
                key="assistant"
                value="assistant"
                flex={1}
                animation="quick"
                enterStyle={{ opacity: 0, x: 20 }}
                exitStyle={{ opacity: 0, x: -20 }}>
                <SearchInput placeholder={t('common.search_placeholder')} />

                <MenuTabContent title={t('menu.assistant.recent')} onSeeAllPress={handleAssistantsSeeAll}>
                  <View flex={1} minHeight={200}>
                    <AssistantList assistants={assistantWithTopics} />
                  </View>
                </MenuTabContent>
              </Tabs.Content>
            </MenuTab>
          </YStack>
        </YStack>

        <XStack paddingHorizontal={20} paddingBottom={40} justifyContent="space-between" alignItems="center">
          <XStack gap={10} alignItems="center">
            <Avatar circular size={48}>
              <Avatar.Image accessibilityLabel="Cam" src={require('@/assets/images/favicon.png')} />
              <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
            </Avatar>
            <Text>{t('common.cherry_studio')}</Text>
          </XStack>
          <Button
            icon={<Settings size={24} />}
            chromeless
            onPress={() => {
              props.navigation.navigate('Main', { screen: 'SettingsScreen' })
              props.navigation.closeDrawer()
            }}
          />
        </XStack>
      </BlurView>
    </YStack>
  )
}
