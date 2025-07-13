import { useNavigation } from '@react-navigation/native'
import { Trash2 } from '@tamagui/lucide-icons'
import { MotiView } from 'moti'
import { FC, useRef } from 'react'
import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable'
import { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { Stack, Text, XStack, YStack } from 'tamagui'

import { Assistant } from '@/types/assistant'
import { NavigationProps } from '@/types/naviagate'
import { useIsDark } from '@/utils'

interface AssistantItemProps {
  assistant: Assistant
  onDelete: (assistantId: string) => Promise<void>
}

interface RenderRightActionsProps {
  progress: SharedValue<number>
  assistant: Assistant
  onDelete: (assistantId: string) => Promise<void>
  swipeableRef: React.RefObject<SwipeableMethods | null>
}

const RenderRightActions: FC<RenderRightActionsProps> = ({ progress, assistant, onDelete, swipeableRef }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [50, 0])

    return {
      transform: [{ translateX }]
    }
  })

  const handleDelete = () => {
    swipeableRef.current?.close()
    onDelete(assistant.id)
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

const AssistantItem: FC<AssistantItemProps> = ({ assistant, onDelete }) => {
  const isDark = useIsDark()
  const swipeableRef = useRef<SwipeableMethods>(null)
  const navigation = useNavigation<NavigationProps>()

  const renderRightActions = (progress: SharedValue<number>, _: SharedValue<number>) => {
    return (
      <RenderRightActions progress={progress} assistant={assistant} onDelete={onDelete} swipeableRef={swipeableRef} />
    )
  }

  const editAssistant = () => {
    navigation.navigate('AssistantDetailScreen', { assistantId: assistant.id })
  }

  // get the newest update time from assistant's topics
  const updateTime = new Date(
    assistant.topics?.reduce((latest, topic) => {
      console.log('topic.updatedAt', topic)
      const topicUpdateTime = new Date(topic.updatedAt).getTime()
      return topicUpdateTime > latest ? topicUpdateTime : latest
    }, 0) ?? Date.now()
  ).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <ReanimatedSwipeable ref={swipeableRef} renderRightActions={renderRightActions} friction={1} rightThreshold={40}>
      <XStack
        borderRadius={30}
        backgroundColor={isDark ? '$uiCardDark' : '$uiCardLight'}
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={3}
        paddingHorizontal={20}
        onPress={editAssistant}>
        <XStack gap={14} maxWidth="70%">
          <Text fontSize={35}>{assistant.emoji}</Text>
          <YStack gap={2} flex={1}>
            <Text fontSize={16} numberOfLines={1} ellipsizeMode="tail" fontWeight="500">
              {assistant.name}
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
            {assistant.topics?.length ?? 0}
          </Text>
        </Stack>
      </XStack>
    </ReanimatedSwipeable>
  )
}

export default AssistantItem
