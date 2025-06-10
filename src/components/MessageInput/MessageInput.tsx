import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextArea, XStack, YStack } from 'tamagui'

import { AddFileButton } from './AddFileButton'
import { MentionButton } from './MentionButton'
import { ThinkButton } from './ThinkButton'
import { VoiceButton } from './VoiceButton'
import { WebsearchButton } from './WebsearchButton'

export const MessageInput: React.FC = () => {
  const { t } = useTranslation()

  return (
    <YStack gap={10}>
      {/* message */}
      <XStack>
        <TextArea placeholder={t('inputs.placeholder')} borderWidth={0} backgroundColor="$colorTransparent" flex={1} />
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
        </XStack>
      </XStack>
    </YStack>
  )
}
