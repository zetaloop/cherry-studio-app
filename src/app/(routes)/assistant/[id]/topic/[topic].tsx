import { ArrowLeft } from '@tamagui/lucide-icons'
import { Link, useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'tamagui'

export default function TopicPage() {
  const { id, topic } = useLocalSearchParams<{
    id: string
    topic: string
  }>()

  return (
    <SafeAreaView>
      <Link
        href={{
          pathname: `/assistant/[id]`,
          params: { id }
        }}
        asChild>
        <Button icon={ArrowLeft} />
      </Link>
      <Text>
        assistant - {id}/topic - {topic}
      </Text>
    </SafeAreaView>
  )
}
