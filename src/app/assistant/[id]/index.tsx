import { ArrowLeft } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, AvatarImage, Button, ListItem, SizableText, XStack, YGroup } from 'tamagui'

const mockTopics = [
  {
    id: '1',
    name: 'Topic 1',
    description: 'lorem1...',
    avatar: 'https://picsum.photos/200'
  },
  {
    id: '2',
    name: 'Topic 2',
    description: 'lorem2...',
    avatar: 'https://picsum.photos/200'
  },
  {
    id: '3',
    name: 'Topic 3',
    description: 'lorem3...',
    avatar: 'https://picsum.photos/200'
  }
]

export default function AssistantPage() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()

  return (
    <SafeAreaView>
      <XStack justifyContent="space-between" alignItems="center">
        <Button onPress={() => router.push('/')} icon={ArrowLeft} />
        <SizableText fontSize={20}>{id}</SizableText>
      </XStack>
      <YGroup>
        {mockTopics.map(item => (
          <YGroup.Item key={item.name}>
            <ListItem
              onPress={() => router.push(`/assistant/${id}/${item.name}`)}
              hoverTheme
              icon={
                <Avatar circular size="$4">
                  <AvatarImage src={item.avatar} />
                </Avatar>
              }
              title={item.name}
              subTitle={item.description}
            />
          </YGroup.Item>
        ))}
      </YGroup>
    </SafeAreaView>
  )
}
