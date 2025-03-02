import { TextArea, YStack } from 'tamagui'

import { InputBarItems } from './InputBarItems'

export const InputBar: React.FC = () => {
  return (
    <YStack>
      <InputBarItems />
      <TextArea placeholder="Type your message here..." />
    </YStack>
  )
}
