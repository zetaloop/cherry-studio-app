import { ArrowLeft } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, View, XStack, YStack } from 'tamagui'

import { MessageInput } from '@/components/message-input'

export default function TopicPage() {
  const { id, topic } = useLocalSearchParams<{
    id: string
    topic: string
  }>()
  const router = useRouter()

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}>
      <XStack justifyContent="space-between" alignItems="center" padding="$2">
        <Button icon={ArrowLeft} onPress={() => router.back()} />
        <Text>
          {id}-{topic}
        </Text>
      </XStack>
      <YStack></YStack>
      <View position="absolute" bottom={0} left={0} right={0}>
        <MessageInput />
      </View>
    </SafeAreaView>
  )
}
