import { useNavigation } from '@react-navigation/native'
import { Trash2 } from '@tamagui/lucide-icons'
import { MotiView } from 'moti'
import { FC, useEffect, useRef, useState } from 'react'
import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable'
import { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { Stack, Text, XStack, YStack } from 'tamagui'

import { Assistant, Topic } from '@/types/assistant'
import { NavigationProps } from '@/types/naviagate'
import { runAsyncFunction, useIsDark } from '@/utils'

import { getAssistantById } from '../../../db/queries/assistants.queries'

interface TopicItemProps {
  topic: Topic
  onDelete: (topicId: string) => Promise<void>
}

interface RenderRightActionsProps {
  progress: SharedValue<number>
  topic: Topic
  onDelete: (topicId: string) => Promise<void>
  swipeableRef: React.RefObject<SwipeableMethods | null>
}

const RenderRightActions: FC<RenderRightActionsProps> = ({ progress, topic, onDelete, swipeableRef }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [50, 0])

    return {
      transform: [{ translateX }]
    }
  })

  const handleDelete = () => {
    swipeableRef.current?.close()
    onDelete(topic.id)
  }

  return (
    <MotiView style={[{ width: 80 }, animatedStyle]}>
      <RectButton
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={handleDelete}>
        <Trash2 color="$textDelete" size={20} />
      </RectButton>
    </MotiView>
  )
}

const TopicItem: FC<TopicItemProps> = ({ topic, onDelete }) => {
  const isDark = useIsDark()
  const swipeableRef = useRef<SwipeableMethods>(null)
  const navigation = useNavigation<NavigationProps>()
  const [assistant, setAssistant] = useState<Assistant | null>(null)

  const renderRightActions = (progress: SharedValue<number>, _: SharedValue<number>) => {
    return <RenderRightActions progress={progress} topic={topic} onDelete={onDelete} swipeableRef={swipeableRef} />
  }

  const openTopic = () => {
    navigation.navigate('HomeScreen', { topicId: topic.id })
  }

  const updateTime = new Date(topic.updatedAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })

  useEffect(() => {
    runAsyncFunction(async () => {
      try {
        const assistantData = await getAssistantById(topic.assistantId)
        setAssistant(assistantData)
      } catch (error) {
        console.error('Failed to fetch assistant:', error)
      }
    })
  }, [topic.assistantId])

  return (
    <ReanimatedSwipeable ref={swipeableRef} renderRightActions={renderRightActions} friction={1} rightThreshold={40}>
      <XStack
        borderRadius={30}
        backgroundColor={isDark ? '$uiCardDark' : '$uiCardLight'}
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={3}
        paddingHorizontal={20}
        onPress={openTopic}>
        <XStack gap={14} maxWidth="70%">
          <Text fontSize={35}>{assistant?.emoji}</Text>
          <YStack gap={2} flex={1}>
            <Text fontSize={16} numberOfLines={1} ellipsizeMode="tail" fontWeight="500">
              {topic.name}
            </Text>
            <Text fontSize={12} color="$gray10">
              {updateTime}
            </Text>
          </YStack>
        </XStack>
        <Stack
          borderRadius={24}
          borderWidth={0.5}
          padding={3}
          gap={2}
          justifyContent="center"
          alignItems="center"
          borderColor={isDark ? '$green20Dark' : '$green20Light'}
          backgroundColor={isDark ? '$green10Dark' : '$green10Light'}
          minWidth={20}
          minHeight={20}>
          <Text fontSize={10} textAlign="center" color={isDark ? '$green100Light' : '$green100Dark'}>
            {topic.messages.length}
          </Text>
        </Stack>
      </XStack>
    </ReanimatedSwipeable>
  )
}

export default TopicItem
