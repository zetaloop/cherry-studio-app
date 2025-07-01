import { Copy, Download, ExternalLink, Languages, RefreshCw } from '@tamagui/lucide-icons'
import * as Clipboard from 'expo-clipboard'
import React from 'react'
import { Button, View, XStack } from 'tamagui'

import { regenerateAssistantMessage } from '@/services/MessagesService'
import { Assistant } from '@/types/assistant'
import { Message } from '@/types/message'
import { filterMessages } from '@/utils/messageUtils/filters'
import { getMainTextContent } from '@/utils/messageUtils/find'

interface MessageFooterProps {
  assistant: Assistant
  message: Message
}

const MessageFooter = ({ message, assistant }: MessageFooterProps) => {
  const onCopy = async () => {
    const filteredMessages = await filterMessages([message])
    const mainContent = await getMainTextContent(filteredMessages[0])
    await Clipboard.setStringAsync(mainContent)
  }

  const onRegenerate = async () => {
    await regenerateAssistantMessage(message, assistant)
  }

  return (
    <View>
      <XStack gap={20}>
        <Button chromeless circular size={24} icon={<Copy size={18} />} onPress={onCopy}></Button>
        <Button chromeless circular size={24} icon={<Languages size={18} />}></Button>
        <Button chromeless circular size={24} icon={<RefreshCw size={18} />} onPress={onRegenerate}></Button>
        <Button chromeless circular size={24} icon={<Download size={18} />}></Button>
        <Button chromeless circular size={24} icon={<ExternalLink size={18} />}></Button>
      </XStack>
    </View>
  )
}

export default MessageFooter
