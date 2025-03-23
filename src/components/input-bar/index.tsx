import { ComponentProps } from 'react'
import { TextArea, YStack } from 'tamagui'

import { InputBarItems } from './input-bar-items'

export const InputBar: React.FC<ComponentProps<typeof YStack>> = props => {
  return (
    <YStack {...props}>
      <InputBarItems />
      <TextArea placeholder="Type your message here..." />
    </YStack>
  )
}
