import { DrawerContentComponentProps, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer'
import { FlashList } from '@shopify/flash-list'
import { Settings } from '@tamagui/lucide-icons'
import { BlurView } from 'expo-blur'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Button, Text, View, XStack, YStack } from 'tamagui'

import { MenuTabContent } from '@/components/menu/MenuTabContent'
import { deleteAssistantById, getRecentAssistants, getStarredAssistants } from '@/services/AssistantService'
import { deleteTopicById, getTopics } from '@/services/TopicService'
import { Assistant, Topic } from '@/types/assistant'
import { runAsyncFunction, useIsDark } from '@/utils'
import { getTextColor } from '@/utils/color'

import AssistantItem from '../assistant/AssistantItem'
import TopicItem from '../topic/TopicItem'
import { SearchInput } from '../ui/SearchInput'
import { MenuTab, TabItem } from './MenuTab'

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation()
  const isDark = useIsDark()
  const [topics, setTopics] = useState<Topic[]>([])
  const [assistants, setAssistants] = useState<Assistant[]>([])
  const [activeTab, setActiveTab] = useState<string>('topic')
  const isDrawerOpen = useDrawerStatus() === 'open'

  const menuTabs: TabItem[] = [
    { id: 'assistant', label: t('menu.assistant.title') },
    { id: 'topic', label: t('menu.topic.title') }
  ]

  const refreshTopics = async () => {
    try {
      const topicsData = await getTopics()
      setTopics(topicsData)
    } catch (error) {
      console.error('Failed to fetch topics:', error)
    }
  }

  const refreshAssistants = async () => {
    try {
      const assistantsData = await getStarredAssistants()
      setAssistants(assistantsData)
    } catch (error) {
      console.error('Failed to fetch assistants:', error)
    }
  }

  const handleAssistantsSeeAll = () => {
    props.navigation.navigate('Main', { screen: 'AssistantScreen' })
    console.log('Navigate to all assistants')
  }

  const handleTopicSeeAll = () => {
    props.navigation.navigate('Main', { screen: 'TopicScreen' })
    console.log('Navigate to all topics')
  }

  const handleDeleteTopic = async (topicId: string) => {
    setTopics(prevTopics => prevTopics.filter(topic => topic.id !== topicId))

    try {
      await deleteTopicById(topicId)
    } catch (error) {
      console.error('Failed to delete topic in background:', error)
      await refreshTopics()
    }
  }

  const handleDeleteAssistant = async (assistantId: string) => {
    setAssistants(prevAssistants => prevAssistants.filter(assistant => assistant.id !== assistantId))

    try {
      await deleteAssistantById(assistantId)
    } catch (error) {
      console.error('Failed to delete assistant in background:', error)
      await refreshAssistants()
    }
  }

  const renderTopicItem = ({ item }: { item: Topic }) => <TopicItem topic={item} onDelete={handleDeleteTopic} />

  const renderAssistantItem = ({ item }: { item: Assistant }) => (
    <AssistantItem assistant={item} onDelete={handleDeleteAssistant} />
  )

  useEffect(() => {
    if (isDrawerOpen) {
      runAsyncFunction(async () => {
        try {
          const topicsData = await getTopics()
          setTopics(topicsData)
          const assistantData = await getRecentAssistants()
          setAssistants(assistantData)
        } catch (error) {
          console.error('Failed to fetch topics:', error)
        }
      })
    }
  }, [isDrawerOpen])

  return (
    <YStack flex={1}>
      <BlurView style={{ flex: 1 }} intensity={60} tint="default">
        <YStack gap={10} flex={1} padding={20}>
          <YStack>
            <DrawerItemList {...props} />
          </YStack>

          <YStack backgroundColor="transparent" paddingTop={20} flex={1}>
            <MenuTab
              tabs={menuTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              inactiveTextColor={getTextColor(isDark)}
            />

            <SearchInput placeholder={t('common.search_placeholder')} />

            <MenuTabContent
              title={activeTab === 'topic' ? t('menu.topic.recent') : t('menu.assistant.recent')}
              onSeeAllPress={handleTopicSeeAll}>
              {activeTab === 'topic' ? (
                <View style={{ flex: 1, minHeight: 200 }}>
                  <FlashList
                    ItemSeparatorComponent={() => <YStack height={20} />}
                    data={topics}
                    renderItem={renderTopicItem}
                    estimatedItemSize={50}
                  />
                </View>
              ) : (
                <View style={{ flex: 1, minHeight: 200 }}>
                  <FlashList
                    ItemSeparatorComponent={() => <YStack height={20} />}
                    data={assistants}
                    renderItem={renderAssistantItem}
                    estimatedItemSize={50}
                  />
                </View>
              )}
            </MenuTabContent>
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
