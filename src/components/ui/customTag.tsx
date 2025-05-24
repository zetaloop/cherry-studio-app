import React from 'react'
import { Text, XStack } from 'tamagui'

interface CustomTagProps {
  size?: number
  color?: string
  icon?: React.ReactNode
  tooltip?: string
  children?: React.ReactNode
}

export const CustomTag: React.FC<CustomTagProps> = ({ size = 12, color = '#1677ff', icon, children }) => {
  const fontSize = Math.max(size - 2, 10)
  const padding = Math.max(size / 3, 4)

  // 将颜色转换为背景色（20%透明度）
  const getBackgroundColor = (color: string) => {
    if (color.startsWith('rgba')) {
      return color.replace(/,\s*1\)$/, ', 0.2)')
    }

    return `${color}20`
  }

  return (
    <XStack
      alignItems="center"
      backgroundColor={getBackgroundColor(color)}
      borderRadius={size / 2}
      paddingHorizontal={padding}
      paddingVertical={2}
      gap={2}>
      {icon}
      {children && (
        <Text color={color} fontSize={fontSize} fontWeight="500" numberOfLines={1}>
          {children}
        </Text>
      )}
    </XStack>
  )
}
