import { Search } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, SizableText, XStack, YStack } from 'tamagui'

import { Assistant } from '@/components/Assitant'
import { NavBar } from '@/components/NavBar'

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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar itemsPosition={['center', 'right']}>
        <SizableText fontSize={20}>Assistant</SizableText>
        <XStack>
          <Button icon={Search} />
        </XStack>
      </NavBar>
      <YStack width={'100%'}>
        {assistants.map(item => (
          <Assistant width={'100%'} key={item.name} {...item} />
        ))}
      </YStack>
    </SafeAreaView>
  )
}

export default HomeScreen
