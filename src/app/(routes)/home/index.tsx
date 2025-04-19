import { View } from 'tamagui'

import { MessageInput } from '@/components/message-input'

const HomeScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }} justifyContent="center" alignItems="center">
      <MessageInput />
    </View>
  )
}

export default HomeScreen
