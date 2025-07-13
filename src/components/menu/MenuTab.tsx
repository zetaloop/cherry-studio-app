import React from 'react'
import { FC } from 'react'
import { ColorTokens, StackProps, Text, View, XStack, YStack } from 'tamagui'

import { useIsDark } from '@/utils'
import { getGreenColor } from '@/utils/color'

export type TabItem = {
  id: string
  label: string
}

interface MenuTabProps extends StackProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (id: string) => void
  inactiveTextColor: ColorTokens
}

export const MenuTab: FC<MenuTabProps> = ({ tabs, activeTab, onTabChange, inactiveTextColor, ...stackProps }) => {
  const isDark = useIsDark()
  return (
    <XStack width="100%" paddingTop={4} paddingHorizontal={5} paddingBottom={20} {...stackProps}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id
        return (
          <YStack key={tab.id} flex={1} gap={10} alignItems="center" onPress={() => onTabChange(tab.id)}>
            <Text lineHeight={17} color={isActive ? getGreenColor(isDark, 100) : inactiveTextColor}>
              {tab.label}
            </Text>
            <View
              width="100%"
              height={4}
              backgroundColor={isActive ? getGreenColor(isDark, 100) : 'transparent'}
              borderRadius={100}
            />
          </YStack>
        )
      })}
    </XStack>
  )
}
