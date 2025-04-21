import { List, Search, X } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Platform } from 'react-native'
import { Button, Sheet, XStack, YStack, AnimatePresence, useTheme, Overlay } from 'tamagui'

import { useLeftSectionController } from '../hooks/useLeftSectionController'
import { TopicsList } from './topics-list'
import { TopicsSearch } from './topics-search'

export const LeftSection: React.FC = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const {
    isTopicsListOpen,
    toggleTopicsList,
    closeTopicsList
  } = useLeftSectionController()

  const [showSearch, setShowSearch] = useState(false)
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  const handleOpenSearch = () => {
    setShowSearch(true)
  }

  const handleCloseSearch = () => {
    setShowSearch(false)
  }

  // 侧边栏宽度占屏幕的40%，但最大不超过350px
  const sidebarWidth = Math.min(screenWidth * 0.5, 350)

  return (
    <XStack alignItems="center" gap="$2" zIndex={100}>
      {/* 主题列表按钮 */}
      <Button
        size="$3"
        backgroundColor="transparent"
        borderRadius="$4"
        paddingHorizontal="$2"
        onPress={toggleTopicsList}>
        <List size={20} color="$blue9" />
      </Button>

      {/* 侧边栏覆盖层 */}
      <AnimatePresence>
        {isTopicsListOpen && (
          <Overlay
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
            onPress={closeTopicsList}
          />
        )}
      </AnimatePresence>

      {/* 侧边栏 - 使用fixed位置而不是Sheet组件 */}
      <AnimatePresence>
        {isTopicsListOpen && (
          <YStack
            position="absolute"
            left={0}
            top={0}
            width={sidebarWidth}
            height={screenHeight}
            backgroundColor="$background"
            borderRightWidth={1}
            borderColor="$borderColor"
            padding="$3"
            zIndex={100000}
            animation="quick"
            enterStyle={{ x: -sidebarWidth }}
            exitStyle={{ x: -sidebarWidth }}
          >
            <YStack gap="$2" width="100%" height="100%">
              <XStack justifyContent="space-between" alignItems="center">
                <XStack gap="$2" alignItems="center">
                  <Button
                    size="$2"
                    circular
                    backgroundColor="transparent"
                    onPress={closeTopicsList}
                    icon={<X size={18} color="$gray10" />}
                  />
                  <Button
                    size="$2"
                    backgroundColor="transparent"
                    onPress={handleOpenSearch}
                    pressStyle={{ opacity: 0.7 }}
                    icon={<Search size={18} color="$gray10" />}
                  />
                </XStack>
              </XStack>

              <TopicsList />
            </YStack>
          </YStack>
        )}
      </AnimatePresence>

      {/* 搜索弹窗 */}
      <Sheet
        modal={true}
        open={showSearch}
        onOpenChange={setShowSearch}
        snapPoints={[80]}
        position={showSearch ? 80 : 0}
        dismissOnSnapToBottom={true}
        zIndex={100001}>
        <Sheet.Frame
          padding="$3"
          borderWidth={1}
          borderColor="$borderColor"
          borderTopLeftRadius="$4"
          borderTopRightRadius="$4"
          backgroundColor="$background">
          <TopicsSearch onClose={handleCloseSearch} />
        </Sheet.Frame>
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
      </Sheet>
    </XStack>
  )
}
