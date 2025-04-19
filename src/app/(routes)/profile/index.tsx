import { Settings } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { StackProps, TabLayout, TabsTabProps } from 'tamagui'
import {
  AnimatePresence,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  H4,
  ScrollView,
  styled,
  Tabs,
  Text,
  XStack,
  YStack
} from 'tamagui'

type TabType = 'agents' | 'knowledge' | 'files'

export default function ProfilePage() {
  const { t } = useTranslation()

  const tabs: TabType[] = ['agents', 'knowledge', 'files']

  const [tabState, setTabState] = useState<{
    currentTab: TabType
    intentAt: TabLayout | null
    activeAt: TabLayout | null
    prevActiveAt: TabLayout | null
  }>({
    activeAt: null,
    currentTab: 'agents',
    intentAt: null,
    prevActiveAt: null
  })

  const setCurrentTab = (value: string) => {
    const currentTab = value as TabType
    setTabState({ ...tabState, currentTab })
  }

  const setIntentIndicator = (intentAt: TabLayout | null) => setTabState({ ...tabState, intentAt })
  const setActiveIndicator = (activeAt: TabLayout | null) =>
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt })

  const { activeAt, intentAt, prevActiveAt, currentTab } = tabState

  // 计算动画方向: 1 = 右, 0 = 无方向, -1 = 左
  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0
    }

    return activeAt.x > prevActiveAt.x ? -1 : 1
  })()

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setActiveIndicator(layout)
    } else {
      setIntentIndicator(layout)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <XStack justifyContent="flex-end" padding="$2">
        <Link href="/settings" asChild>
          <Button size="$3" circular icon={<Settings size={20} />} backgroundColor="$colorTransparent" color="$gray9" />
        </Link>
      </XStack>

      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack padding="$4" gap={16} alignItems="center">
          {/* 用户头像 */}
          <Avatar circular size="$12">
            <AvatarFallback backgroundColor="$blue5" />
            <AvatarImage source={{ uri: 'https://picsum.photos/200/200?mountain=1' }} alt={t('profile.avatar')} />
          </Avatar>

          {/* 用户名 */}
          <YStack alignItems="center" gap={4}>
            <H4>{'username'}</H4>
          </YStack>

          {/* 编辑个人资料按钮 */}
          <Button
            size="$3"
            backgroundColor="$colorTransparent"
            borderColor="$gray5"
            borderWidth={1}
            borderRadius="$4"
            paddingHorizontal="$6">
            {t('profile.editProfile')}
          </Button>

          {/* 使用带动画效果的 Tabs 组件 */}
          <Tabs
            value={currentTab}
            onValueChange={setCurrentTab}
            orientation="horizontal"
            flexDirection="column"
            width="100%"
            activationMode="manual">
            <YStack width="100%" position="relative">
              {/* 悬停指示器动画 */}
              <AnimatePresence>
                {intentAt && (
                  <TabsRovingIndicator
                    borderRadius="$4"
                    width={intentAt.width}
                    height={intentAt.height}
                    x={intentAt.x}
                    y={intentAt.y}
                  />
                )}
              </AnimatePresence>

              {/* 选中指示器动画 */}
              <AnimatePresence>
                {activeAt && (
                  <TabsRovingIndicator
                    borderRadius="$4"
                    theme="gray"
                    width={activeAt.width}
                    height={activeAt.height}
                    x={activeAt.x}
                    y={activeAt.y}
                  />
                )}
              </AnimatePresence>

              <Tabs.List
                loop={false}
                width="100%"
                justifyContent="space-between"
                backgroundColor="transparent"
                borderBottomWidth="$0.5"
                borderColor="$gray5">
                {tabs.map(tab => (
                  <Tabs.Tab
                    key={tab}
                    flex={1}
                    value={tab}
                    unstyled
                    paddingVertical="$2"
                    paddingHorizontal="$3"
                    onInteraction={handleOnInteraction}
                    alignItems="center">
                    <Text
                      color={currentTab === tab ? 'black' : '$gray9'}
                      fontWeight={currentTab === tab ? 'bold' : 'normal'}>
                      {t(`${tab}.title`)}
                    </Text>
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </YStack>

            {/* 内容区域带动画效果 */}
            <AnimatePresence exitBeforeEnter custom={{ direction }} initial={false}>
              <AnimatedYStack key={currentTab}>
                <Tabs.Content value={currentTab} forceMount width="100%">
                  {currentTab === 'agents' ? (
                    <YStack alignItems="center" paddingVertical="$8" gap={12} width="100%">
                      <Text fontSize="$6" color="$yellow10">
                        😜
                      </Text>
                      <Text color="$gray8">{t('profile.createFirstAgent')}</Text>
                      <Button backgroundColor="$blue9" color="white" borderRadius="$4" paddingHorizontal="$6">
                        {t('profile.create')}
                      </Button>
                    </YStack>
                  ) : (
                    <YStack alignItems="center" paddingVertical="$8" width="100%">
                      <Text color="$gray8">{t('profile.noContent', { type: t(`${currentTab}.title`) })}</Text>
                    </YStack>
                  )}
                </Tabs.Content>
              </AnimatedYStack>
            </AnimatePresence>
          </Tabs>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

// 标签指示器组件
const TabsRovingIndicator = ({ active, ...props }: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position="absolute"
      backgroundColor="$color5"
      opacity={0.7}
      animation="100ms"
      enterStyle={{
        opacity: 0
      }}
      exitStyle={{
        opacity: 0
      }}
      {...(active && {
        backgroundColor: '$color8',
        opacity: 0.6
      })}
      {...props}
    />
  )
}

// 带动画效果的内容容器
const AnimatedYStack = styled(YStack, {
  width: '100%',
  x: 0,
  opacity: 1,
  animation: '200ms',
  variants: {
    direction: {
      ':number': direction => ({
        enterStyle: {
          x: direction > 0 ? -15 : 15,
          opacity: 0
        },
        exitStyle: {
          zIndex: 0,
          x: direction < 0 ? -15 : 15,
          opacity: 0
        }
      })
    }
  } as const
})
