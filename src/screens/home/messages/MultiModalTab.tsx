import { AnimatePresence } from 'moti'
// 1. 从 React 中导入 useState
import React, { FC, useState } from 'react'
import { ScrollView, styled, Tabs, Text, View, XStack } from 'tamagui'

import { MultiModalIcon } from '@/components/icons/MultiModelIcon'
import { Assistant } from '@/types/assistant'
import { GroupedMessage } from '@/types/message'
import { useIsDark } from '@/utils'
import { getTextColor } from '@/utils/color'

import MessageItem from './Message'
import MessageFooter from './MessageFooter'

interface MultiModalTabProps {
  assistant: Assistant
  messages: GroupedMessage[]
}

const MultiModalTab: FC<MultiModalTabProps> = ({ assistant, messages }) => {
  const isDark = useIsDark()
  const [currentTab, setCurrentTab] = useState('0')

  if (!messages || messages.length === 0) {
    return null
  }

  return (
    <View>
      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        orientation="horizontal"
        flexDirection="column"
        flex={1}
        gap={10}>
        <Tabs.List>
          <XStack flex={1} gap={8}>
            <MultiModalIcon size={18} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {messages.map((_message, index) => {
                const tabValue = index.toString()
                console.log('current', currentTab, tabValue)
                return (
                  <StyledTab
                    key={tabValue}
                    value={tabValue}
                    paddingHorizontal={10}
                    paddingVertical={3}
                    borderRadius={48}
                    justifyContent="center"
                    alignItems="center"
                    height={26}
                    active={currentTab === tabValue}>
                    <Text
                      fontSize={12}
                      lineHeight={17}
                      color={currentTab === tabValue ? '$green100' : getTextColor(isDark)}>
                      @{_message.model?.name}({_message.model?.provider})
                    </Text>
                  </StyledTab>
                )
              })}
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

const StyledTab = styled(Tabs.Tab, {
  variants: {
    active: {
      // todo active tab background not work
      true: {
        backgroundColor: '$green10',
        borderWidth: 1,
        borderColor: '$green20'
      },
      false: {
        borderColor: '$gray20',
        borderWidth: 1,
        backgroundColor: '$gray20'
      }
    }
  }
})

export default MultiModalTab
