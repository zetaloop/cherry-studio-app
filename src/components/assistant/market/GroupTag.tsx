import React from 'react'
import { Text, TextProps } from 'tamagui'

interface GroupTagProps extends Omit<TextProps, 'children' | 'group'> {
  group: string
}

const GroupTag: React.FC<GroupTagProps> = ({ group, ...textProps }) => {
  return (
    <Text borderRadius={20} paddingVertical={2} paddingHorizontal={4} {...textProps}>
      {group.charAt(0).toUpperCase() + group.slice(1)}
    </Text>
  )
}

export default GroupTag
