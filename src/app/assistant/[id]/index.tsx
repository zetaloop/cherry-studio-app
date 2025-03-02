import { ArrowLeft } from '@tamagui/lucide-icons'
import { Link, useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, YStack } from 'tamagui'

export default function AssistantPage() {
  const { id } = useLocalSearchParams()

  return (
    <SafeAreaView>
      <Link href={'/'} asChild>
        <Button icon={ArrowLeft} />
      </Link>
      <Text>{id}</Text>
      <YStack>
        <Link
          href={{
            pathname: '/assistant/[id]/[topic]',
            params: {
              id: id,
              topic: 'topic 1'
            }
          }}>
          <Button>topic 1</Button>
        </Link>
      </YStack>
    </SafeAreaView>
  )
}
