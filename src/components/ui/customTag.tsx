import React from 'react'
import { Text, XStack } from 'tamagui'

interface CustomTagProps {
  size?: number
  color?: string
  icon?: React.ReactNode
  tooltip?: string
  children?: React.ReactNode
}

export const CustomTag: React.FC<CustomTagProps> = ({ size = 12, color = '$background', icon, children }) => {
  const fontSize = Math.max(size - 2, 10)
  const padding = Math.max(size / 3, 4)

  const getBackgroundColor = (color: string) => {
    return color.includes('foreground') ? color.replace('foreground', 'background') : color
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
