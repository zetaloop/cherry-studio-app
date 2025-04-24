import { List, Search, X } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Platform } from 'react-native'
import { Button, XStack, YStack, AnimatePresence, Overlay, Input } from 'tamagui'

import { useLeftSectionController } from '../hooks/useLeftSectionController'
import { TopicsList } from './topics-list'

// 使用简单的侧边栏自定义实现，避免嵌套NavigationContainer问题
export const LeftSection: React.FC = () => {
  // const theme = useTheme() // 未使用，暂时注释
  const { t } = useTranslation()
  const {
    isTopicsListOpen,
    toggleTopicsList,
    closeTopicsList,
    searchQuery,
    setSearchQuery
  } = useLeftSectionController()

  const [showSearchInput, setShowSearchInput] = useState(false)
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  // 计算侧边栏样式
  const getLeftOffset = () => {
    // 为不同平台返回不同的偏移值  根据平台进行调整
    if (Platform.OS === 'ios') {
      return -18; // iOS设备偏移量
    } else if (Platform.OS === 'android') {
      return -16; // Android设备偏移量（可能需要调整）
    } else {
      return -18; // Web平台偏移量
    }
  }

  // 计算安全的偏移值
  const leftOffset = getLeftOffset();

  // 调整侧边栏位置
  const sidebarTop = 0
  const sidebarHeight = screenHeight + 10 // 确保覆盖底部

  const handleToggleSearch = () => {
    // 只切换搜索框的显示状态，不清空搜索查询
    setShowSearchInput(!showSearchInput)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
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

      {/* 侧边栏 - 使用Tamagui的YStack但应用平台特定偏移 */}
      <AnimatePresence>
        {isTopicsListOpen && (
          <YStack
            position="absolute"
            left={leftOffset} // 使用计算的平台特定偏移
            top={sidebarTop}
            width={sidebarWidth}
            height={sidebarHeight}
            backgroundColor="$background"
            borderRightWidth={1}
            borderColor="$borderColor"
            borderTopWidth={0}
            borderTopLeftRadius={0}
            borderTopRightRadius={8}
            borderBottomRightRadius={8}
            padding={0}
            paddingRight="$3"
            paddingTop="$3"
            paddingBottom="$3"
            margin={0}
            zIndex={100000}
            animation="quick"
            enterStyle={{ x: -sidebarWidth }}
            exitStyle={{ x: -sidebarWidth }}
            shadowColor="$shadowColor"
            shadowOffset={{ width: 2, height: 0 }}
            shadowOpacity={0.1}
            shadowRadius={10}
            elevation={5}
          >
            <YStack flex={1} width="100%" paddingLeft="$3" gap="$2">
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
                    onPress={handleToggleSearch}
                    pressStyle={{ opacity: 0.7 }}
                    icon={<Search size={18} color={showSearchInput ? "$blue9" : "$gray10"} />}
                  />
                </XStack>
              </XStack>

              {/* 搜索输入框 - 直接集成在主题列表页面中 */}
              <AnimatePresence>
                {showSearchInput && (
                  <XStack
                    width="100%"
                    alignItems="center"
                    gap="$2"
                    animation="quick"
                    enterStyle={{ opacity: 0, y: -10 }}
                    exitStyle={{ opacity: 0, y: -10 }}
                  >
                    <Input
                      flex={1}
                      size="$3"
                      placeholder={t('history.search.placeholder')}
                      value={searchQuery}
                      onChangeText={(text) => {
                        console.log('搜索输入框文字变化:', text)
                        // 设置搜索查询
                        setSearchQuery(text)
                        // 添加延时检查搜索查询是否生效
                        setTimeout(() => {
                          console.log('延时检查搜索查询:', searchQuery)
                        }, 100)
                      }}
                      autoFocus
                    />
                    {searchQuery ? (
                      <Button
                        size="$1"
                        circular
                        backgroundColor="transparent"
                        hoverStyle={{ backgroundColor: '$backgroundHover' }}
                        onPress={handleClearSearch}
                        icon={<X size={16} />}
                      />
                    ) : null}
                  </XStack>
                )}
              </AnimatePresence>

              {/* 将搜索查询传递给TopicsList组件 */}
              <TopicsList searchQuery={searchQuery} />
            </YStack>
          </YStack>
        )}
      </AnimatePresence>
    </XStack>
  )
}
