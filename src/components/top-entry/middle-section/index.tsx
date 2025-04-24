import { ChevronDown, Edit3, Plus, ArrowDownUp } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, AvatarFallback, AvatarImage, Button, Popover, Text, XStack, YStack } from 'tamagui'

import { useMiddleSectionController } from '../hooks/useMiddleSectionController'
import { AssistantEditor } from './assistant-editor'
import { AssistantsList } from './assistants-list'
import { SortOptions } from './sort-options'

export const MiddleSection: React.FC = () => {
  const { t } = useTranslation()
  const {
    currentAssistant,
    isAssistantsListOpen,
    toggleAssistantsList,
    closeAssistantsList,
    startEditAssistant,
    startCreateAssistant,
    setSortType
  } = useMiddleSectionController()

  const [showSortOptions, setShowSortOptions] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  // 处理排序选项
  const handleOpenSortOptions = () => {
    setShowSortOptions(true)
  }

  const handleCloseSortOptions = () => {
    setShowSortOptions(false)
  }

  // 处理编辑
  const handleOpenEditor = () => {
    if (currentAssistant) {
      startEditAssistant(currentAssistant)
      setShowEditor(true)
    }
  }

  const handleCreateNew = () => {
    startCreateAssistant()
    setShowEditor(true)
  }

  const handleCloseEditor = () => {
    setShowEditor(false)
  }

  return (
    <XStack alignItems="center" justifyContent="center" gap="$2">
      <Popover
        open={isAssistantsListOpen}
        onOpenChange={toggleAssistantsList}
        placement="bottom"
        size="$5">
        <Popover.Trigger asChild>
          <XStack
            alignItems="center"
            justifyContent="center"
            gap="$1.5"
            pressStyle={{ opacity: 0.7 }}
            cursor="pointer">
            {currentAssistant && (
              <>
                {/* <Avatar circular size="$3">
                  <AvatarFallback backgroundColor="$blue5" />
                  <AvatarImage src={currentAssistant.avatar} />
                </Avatar> */}
                <Text
                  fontSize="$5"
                  fontWeight="500"
                  color="$gray12">
                  {currentAssistant.name}
                </Text>
                <ChevronDown size={16} color="$gray10" />
              </>
            )}
          </XStack>
        </Popover.Trigger>

        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          padding="$3"
          minWidth={280}
          width="auto"
          elevate>
          <YStack gap="$2" width="100%">
            <XStack gap="$2" justifyContent="flex-end">
              <Button
                size="$2"
                backgroundColor="transparent"
                icon={<ArrowDownUp size={16} />}
                onPress={handleOpenSortOptions}
                pressStyle={{ opacity: 0.7 }}
              />
              <Button
                size="$2"
                backgroundColor="transparent"
                icon={<Edit3 size={16} />}
                onPress={handleOpenEditor}
                pressStyle={{ opacity: 0.7 }}
              />
              <Button
                size="$2"
                backgroundColor="transparent"
                icon={<Plus size={16} />}
                onPress={handleCreateNew}
                pressStyle={{ opacity: 0.7 }}
              />
            </XStack>

            <AssistantsList onClose={closeAssistantsList} />
          </YStack>
        </Popover.Content>
      </Popover>

      {/* 排序选项弹窗 */}
      <Popover
        open={showSortOptions}
        onOpenChange={setShowSortOptions}
        placement="right"
        size="$5">
        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          padding="$3"
          width={280}
          elevate>
          <SortOptions onClose={handleCloseSortOptions} />
        </Popover.Content>
      </Popover>

      {/* 编辑助手弹窗 */}
      <Popover
        open={showEditor}
        onOpenChange={setShowEditor}
        placement="right"
        size="$5">
        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          padding="$3"
          width={320}
          elevate>
          <AssistantEditor onClose={handleCloseEditor} />
        </Popover.Content>
      </Popover>
    </XStack>
  )
}
