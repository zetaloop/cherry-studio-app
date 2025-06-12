import React from 'react'
import { Button, Text, YStack } from 'tamagui'

interface AvatarEditButtonProps {
  /** 头像内容 - 可以是 emoji 字符串或 React 节点（如图标） */
  content: string | React.ReactNode
  /** 编辑按钮图标 */
  editIcon: React.ReactNode
  /** 编辑按钮点击事件 */
  onEditPress?: () => void
  /** 头像按钮点击事件（可选） */
  onAvatarPress?: () => void
  /** 头像大小，默认 120 */
  size?: number
  /** 编辑按钮大小，默认 40 */
  editButtonSize?: number
}

export function AvatarEditButton({
  content,
  editIcon,
  onEditPress,
  onAvatarPress,
  size = 120,
  editButtonSize = 40
}: AvatarEditButtonProps) {
  const isEmoji = typeof content === 'string'

  return (
    <YStack position="relative">
      <Button
        size={size}
        circular
        borderColor="#00B96B"
        borderWidth={5}
        overflow="hidden"
        onPress={onAvatarPress}
        // 如果是图标，需要调整内边距
        {...(!isEmoji && {
          paddingTop: 12,
          paddingLeft: 19
        })}>
        {isEmoji ? <Text fontSize={size * 0.58}>{content}</Text> : content}
      </Button>

      <Button
        size={editButtonSize}
        circular
        position="absolute"
        bottom={0}
        right={0}
        backgroundColor="#00B96B"
        zIndex={10}
        onPress={onEditPress}>
        {editIcon}
      </Button>
    </YStack>
  )
}
