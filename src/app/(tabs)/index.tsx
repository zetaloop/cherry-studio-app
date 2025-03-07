import { Search } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, AvatarImage, Button, ListItem, SizableText, XStack, YGroup } from 'tamagui'

const assistants = [
  {
    name: 'Assistant 1',
    avatar: 'https://picsum.photos/200',
    message: 'lorem1...'
  },
  {
    name: 'Assistant 2',
    avatar: 'https://picsum.photos/200',
    message: 'lorem2...'
  },
  {
    name: 'Assistant 3',
    avatar: 'https://picsum.photos/200',
    message: 'lorem3...'
  }
]

const HomeScreen: React.FC = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <XStack justifyContent="space-between" alignItems="center">
        <SizableText fontSize={20}>Assistant</SizableText>
        <Button icon={Search} />
      </XStack>
      <YGroup width={'100%'}>
        {assistants.map(item => (
          <YGroup.Item key={item.name}>
            <ListItem
              hoverTheme
              onPress={() => router.push(`/assistant/${item.name}`)}
              icon={
                <Avatar circular size="$4">
                  <AvatarImage src={item.avatar} />
                </Avatar>
              }
              title={item.name}
              subTitle={item.message}
            />
          </YGroup.Item>
        ))}
      </YGroup>
    </SafeAreaView>
  )
}

export default HomeScreen
