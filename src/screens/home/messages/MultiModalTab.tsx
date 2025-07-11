import { AnimatePresence } from 'moti'
import { FC } from 'react'
import React from 'react'
import { ScrollView, Tabs, Text, View, XStack } from 'tamagui'

import { MultiModalIcon } from '@/components/icons/MultiModelIcon'
import { Assistant } from '@/types/assistant'
import { GroupedMessage } from '@/types/message'

import MessageItem from './Message'
import MessageFooter from './MessageFooter'

interface MultiModalTabProps {
  assistant: Assistant
  messages: GroupedMessage[]
}

const MultiModalTab: FC<MultiModalTabProps> = ({ assistant, messages }) => {
  if (!messages || messages.length === 0) {
    return null
  }

  return (
    <View>
      <Tabs defaultValue={'0'} orientation="horizontal" flexDirection="column" flex={1} gap={10}>
        <Tabs.List>
          <XStack flex={1} gap={8}>
            <MultiModalIcon size={18} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {messages.map((_message, index) => (
                // todo: change tab style
                <Tabs.Tab
                  paddingHorizontal={5}
                  paddingVertical={1}
                  borderRadius={48}
                  justifyContent="center"
                  alignItems="center"
                  height={20}
                  key={index}
                  value={index.toString()}>
                  <Text fontSize={10} lineHeight={20}>
                    @{_message.model?.name}({_message.model?.provider})
                  </Text>
                </Tabs.Tab>
              ))}
            </ScrollView>
          </XStack>
        </Tabs.List>

        <AnimatePresence exitBeforeEnter>
          {messages.map((message, index) => (
            <Tabs.Content
              key={index}
              value={index.toString()}
              animation="quick"
              enterStyle={{
                opacity: 0,
                y: 10
              }}
              exitStyle={{
                opacity: 0,
                y: -10
              }}>
              <MessageItem message={message} />
              <MessageFooter assistant={assistant} message={message} />
            </Tabs.Content>
          ))}
        </AnimatePresence>
      </Tabs>
    </View>
  )
}

export default MultiModalTab
