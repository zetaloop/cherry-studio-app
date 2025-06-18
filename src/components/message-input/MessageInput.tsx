import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextArea, XStack, YStack } from 'tamagui'

import { AddFileButton } from './AddFileButton'
import { MentionButton } from './MentionButton'
import { SendButton } from './SendButton'
import { ThinkButton } from './ThinkButton'
import { VoiceButton } from './VoiceButton'
import { WebsearchButton } from './WebsearchButton'
interface MessageInputProps {
  onSend: (message: string) => void
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  const handleSend = () => {
    const trimmedValue = value.trim()

    if (trimmedValue) {
      onSend(trimmedValue)
      setValue('')
    }
  }

  return (
    <YStack gap={10}>
      {/* message */}
      <XStack>
        <TextArea
          placeholder={t('inputs.placeholder')}
          borderWidth={0}
          backgroundColor="$colorTransparent"
          flex={1}
          value={value}
          onChangeText={setValue}
        />
      </XStack>
      {/* button */}
      <XStack justifyContent="space-between" alignItems="center">
        <XStack gap={5} alignItems="center">
          <AddFileButton />
          <WebsearchButton />
          <ThinkButton />
        </XStack>
        <XStack gap={5} alignItems="center">
          <MentionButton />
          <VoiceButton />
          <SendButton onSend={handleSend} />
        </XStack>
      </XStack>
    </YStack>
  )
}
