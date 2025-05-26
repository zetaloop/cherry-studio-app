// components/TopEntry.tsx
import React, { useState } from 'react'
import { XStack } from 'tamagui'

import { Sidebar } from '../SideBar'
import { LeftSection } from './left-section'
import { MiddleSection } from './middle-section'
import { RightSection } from './right-section'

export const TopEntry = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleMenuPress = () => {
    setSidebarOpen(true)
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

      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />
    </>
  )
}
