import { isEmpty } from 'lodash'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextArea, View, XStack, YStack } from 'tamagui'

import { SheetType } from '@/screens/home/sheets'
import { sendMessage as _sendMessage } from '@/services/MessagesService'
import { getUserMessage } from '@/services/MessagesService'
import { Assistant, Model, ReasoningEffortOptions, Topic } from '@/types/assistant'
import { FileType } from '@/types/file'
import { MessageInputBaseParams } from '@/types/message'

import { AddFileButton } from './AddFileButton'
import FilePreview from './FilePreview'
import { MentionButton } from './MentionButton'
import { SendButton } from './SendButton'
import { ThinkButton } from './ThinkButton'
import { VoiceButton } from './VoiceButton'
import { WebsearchButton } from './WebsearchButton'
interface MessageInputProps {
  assistant: Assistant
  topic: Topic
  setHasMessages: (hasMessages: boolean) => void
  setActiveSheet: (sheet: SheetType | null) => void
  mentions: Model[]
  files: FileType[]
  setFiles: (files: FileType[]) => void
  reasoningEffort: ReasoningEffortOptions | null
}

export const MessageInput: React.FC<MessageInputProps> = ({
  assistant,
  topic,
  setHasMessages,
  setActiveSheet,
  mentions,
  files,
  setFiles,
  reasoningEffort
}) => {
  const { t } = useTranslation()
  const [text, setText] = useState('')

  const sendMessage = async () => {
    if (isEmpty(text.trim())) {
      return
    }

    setText('')
    setFiles([])
    setHasMessages(true)

    try {
      const baseUserMessage: MessageInputBaseParams = { assistant, topic, content: text }

      if (files.length > 0) {
        baseUserMessage.files = files
      }

      const { message, blocks } = getUserMessage(baseUserMessage)

      if (mentions.length > 0) {
        message.mentions = mentions
      }

      await _sendMessage(message, blocks, assistant, topic.id)
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <View>
      <YStack gap={10}>
        {files.length > 0 && <FilePreview files={files} setFiles={setFiles} />}
        {/* message */}
        <XStack>
          <TextArea
            placeholder={t('inputs.placeholder')}
            borderWidth={0}
            backgroundColor="$colorTransparent"
            flex={1}
            value={text}
            onChangeText={setText}
          />
        </XStack>
        {/* button */}
        <XStack justifyContent="space-between" alignItems="center">
          <XStack gap={5} alignItems="center">
            <MentionButton mentions={mentions} setActiveSheet={setActiveSheet} />
            <AddFileButton setActiveSheet={setActiveSheet} />
            <WebsearchButton />
            <ThinkButton reasoningEffort={reasoningEffort} setActiveSheet={setActiveSheet} />
          </XStack>
          <XStack gap={5} alignItems="center">
            <VoiceButton />
            <SendButton onSend={sendMessage} />
          </XStack>
        </XStack>
      </YStack>
    </View>
  )
}
