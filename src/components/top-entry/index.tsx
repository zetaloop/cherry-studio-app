// components/TopEntry.tsx
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerActions, ParamListBase, useNavigation } from '@react-navigation/native'
import React from 'react'
import { XStack } from 'tamagui'

import { LeftSection } from './left-section'
import { MiddleSection } from './middle-section'
import { RightSection } from './right-section'

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
          <MiddleSection />
        </XStack>
        <XStack alignItems="center" minWidth={40} justifyContent="flex-end">
          <RightSection />
        </XStack>
      </XStack>
    </>
  )
}
