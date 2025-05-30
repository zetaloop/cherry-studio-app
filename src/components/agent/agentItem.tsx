import { useNavigation } from '@react-navigation/native'
import { Trash2 } from '@tamagui/lucide-icons'
import { FC, useRef } from 'react' // Added useRef
import React from 'react'
import { Animated } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import ReanimatedSwipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable'
import { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { Button, Text, XStack, YStack } from 'tamagui'

import { Agent } from '@/types/agent'
import { NavigationProps } from '@/types/naviagate'

interface AgentItemProps {
  agent: Agent
}

function RenderRightActions(progress: SharedValue<number>, swipeableMethods: SwipeableMethods, agent: Agent) {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [80, 0])

    return {
      transform: [{ translateX }]
    }
  })

  const handleDelete = () => {
    console.log('Delete agent:', agent.name)
    swipeableMethods.close()
  }

  return (
    <Animated.View style={[{ width: 80 }, animatedStyle]}>
      <RectButton
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={handleDelete}>
        <Trash2 color="#C94040" size={20} />
      </RectButton>
    </Animated.View>
  )
}

const AgentItem: FC<AgentItemProps> = ({ agent }) => {
  const swipeableRef = useRef(null)
  const navigation = useNavigation<NavigationProps>()

  const renderRightActions = (
    progress: SharedValue<number>,
    _: SharedValue<number>,
    swipeableMethods: SwipeableMethods
  ) => {
    return RenderRightActions(progress, swipeableMethods, agent)
  }

  const editAgent = () => {
    navigation.navigate('AgentDetailPage', { agentId: agent.id, mode: 'edit' })
  }

  return (
    <ReanimatedSwipeable ref={swipeableRef} renderRightActions={renderRightActions} friction={2} rightThreshold={40}>
      <XStack
        borderRadius={30}
        backgroundColor="$gray2"
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={3}
        paddingHorizontal={20}
        onPress={editAgent}>
        <XStack gap={14} flex={1} width="60%">
          <Text fontSize={22}>{agent.emoji}</Text>
          <YStack gap={2} flex={1}>
            <Text width="90%" numberOfLines={1} ellipsizeMode="tail">
              {agent.name}
            </Text>
            <Text fontSize={12}>{agent.type}</Text>
          </YStack>
        </XStack>
        <Button disabled circular backgroundColor="$gray8" size={20}>
          <Text>{agent.topics.length}</Text>
        </Button>
      </XStack>
    </ReanimatedSwipeable>
  )
}

export default AgentItem
