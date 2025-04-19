import { ArrowLeft } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Stack, Text, View, XStack, YStack } from 'tamagui'

import { MessageInput } from '@/components/message-input'
import { topics } from '@/config/mock/messages'

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
      <YStack>
        {topics[topic]!.map(item => (
          <Stack key={item.key} marginLeft={item.send ? 'auto' : ''}>
            <Text>{item.message}</Text>
          </Stack>
        ))}
      </YStack>
      <View position="absolute" bottom={0} left={0} right={0}>
        <MessageInput />
      </View>
    </SafeAreaView>
  )
}
