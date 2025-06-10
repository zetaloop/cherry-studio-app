// components/TopEntry.tsx
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerActions, ParamListBase, useNavigation } from '@react-navigation/native'
import React from 'react'
import { XStack } from 'tamagui'

import { LeftSection } from './LeftSection'
import HeaderDropDown from './MiddleSection/DropDownMenu'
import { RightSection } from './RightSection'

export const TopEntry = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>()

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  return (
    <>
      <XStack paddingHorizontal="$4" alignItems="center" height={44} justifyContent="space-between">
        <XStack alignItems="center" minWidth={40}>
          <LeftSection onMenuPress={handleMenuPress} />
        </XStack>
        <XStack flex={1} justifyContent="center" alignItems="center">
          {/* <MiddleSection /> */}
          <HeaderDropDown
            title="Cherry Assistant"
            items={[
              { key: '3.5', title: 'GPT-3.5' },
              { key: '4', title: 'GPT-4' }
            ]}
            onSelect={() => {}}
          />
        </XStack>
        <XStack alignItems="center" minWidth={40} justifyContent="flex-end">
          <RightSection />
        </XStack>
      </XStack>
    </>
  )
}
