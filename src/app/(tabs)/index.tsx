import { Link, useRouter } from 'expo-router'
import { Avatar, AvatarImage, ListItem, View, XStack, YGroup } from 'tamagui'

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
    <View style={{ flex: 1 }}>
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
      <XStack>
        <Link href={'/welcome'}>welcome</Link>
      </XStack>
    </View>
  )
}

export default HomeScreen
