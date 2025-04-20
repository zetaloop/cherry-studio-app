import { Link } from '@react-navigation/native'
import { Stack, View } from 'tamagui'
import { Text } from 'tamagui'

import { MessageInput } from '@/components/message-input'

const HomeScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }} justifyContent="center" alignItems="center">
      <MessageInput />
      <Link screen="Settings">
        <Stack>
          <Text>Go to Settings</Text>
        </Stack>
      </Link>
    </View>
  )
}

export default HomeScreen
