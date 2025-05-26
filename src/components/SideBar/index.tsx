// components/Sidebar.tsx
import { Home, Info, Settings, User, X } from '@tamagui/lucide-icons'
import React from 'react'
import { Button, Separator, Sheet, Text, XStack, YStack } from 'tamagui'

interface SidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const Sidebar = ({ open, onOpenChange }: SidebarProps) => {
  return (
    <Sheet
      modal
      open={open}
      onOpenChange={onOpenChange}
      snapPoints={[40]} // 占屏幕85%宽度
      dismissOnSnapToBottom
      position={0}
      animation="quicker">
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame
        padding="$4"
        space="$4"
        backgroundColor="$background"
        borderTopRightRadius="$4"
        borderBottomRightRadius="$4">
        {/* Header */}
        <XStack justifyContent="space-between" alignItems="center" paddingBottom="$2">
          <Text fontSize="$6" fontWeight="bold">
            菜单
          </Text>
          <Button size="$3" circular icon={X} onPress={() => onOpenChange(false)} chromeless />
        </XStack>

        <Separator />

        {/* Menu Items */}
        <YStack gap="$2" flex={1}>
          <SidebarItem
            icon={<Home size={20} />}
            title="首页"
            onPress={() => {
              // 处理导航
              onOpenChange(false)
            }}
          />
          <SidebarItem
            icon={<User size={20} />}
            title="个人中心"
            onPress={() => {
              // 处理导航
              onOpenChange(false)
            }}
          />
          <SidebarItem
            icon={<Settings size={20} />}
            title="设置"
            onPress={() => {
              // 处理导航
              onOpenChange(false)
            }}
          />
          <SidebarItem
            icon={<Info size={20} />}
            title="关于"
            onPress={() => {
              // 处理导航
              onOpenChange(false)
            }}
          />
        </YStack>
      </Sheet.Frame>
    </Sheet>
  )
}

// Sidebar 菜单项组件
interface SidebarItemProps {
  icon: React.ReactNode
  title: string
  onPress: () => void
}

const SidebarItem = ({ icon, title, onPress }: SidebarItemProps) => {
  return (
    <Button
      size="$4"
      backgroundColor="transparent"
      borderWidth={0}
      justifyContent="flex-start"
      onPress={onPress}
      hoverStyle={{
        backgroundColor: '$backgroundHover'
      }}
      pressStyle={{
        backgroundColor: '$backgroundPress'
      }}>
      <XStack space="$3" alignItems="center">
        {icon}
        <Text fontSize="$4">{title}</Text>
      </XStack>
    </Button>
  )
}
