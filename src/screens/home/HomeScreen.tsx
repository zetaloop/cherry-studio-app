import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native'

import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { getDefaultAssistant } from '@/services/AssistantService'
import { createNewTopic, getNewestTopic } from '@/services/TopicService'
import { NavigationProps } from '@/types/naviagate'
import { runAsyncFunction } from '@/utils'

// todo: 当侧边栏删除当前主页的topic会进入加载状态
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>()

  useEffect(() => {
    runAsyncFunction(async () => {
      try {
        const newestTopic = await getNewestTopic()

        if (newestTopic) {
          navigation.navigate('ChatScreen', { topicId: newestTopic.id })
        } else {
          const defaultAssistant = await getDefaultAssistant()
          const newTopic = await createNewTopic(defaultAssistant)
          navigation.navigate('ChatScreen', { topicId: newTopic.id })
        }
      } catch (error) {
        console.error('There is some errors in Home Screen', error)
      }
    })
  })

  return (
    <SafeAreaContainer style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </SafeAreaContainer>
  )
}

export default HomeScreen
