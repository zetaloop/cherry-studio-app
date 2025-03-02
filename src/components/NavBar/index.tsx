import { PanelLeftOpen } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Button, Text, View, XStack } from 'tamagui'

import { useSafeArea } from '@/hooks/useSafeArea'

import SideBar from '../SideBar'

export const NavBar: React.FC = () => {
  const insets = useSafeArea()
  const [open, setOpen] = useState(false)
  return (
    <View position="absolute" top={0} left={0} paddingTop={insets.top}>
      <XStack alignItems="center">
        <Button onPress={() => setOpen(true)} icon={PanelLeftOpen} />
        <SideBar isOpen={open} onClose={() => setOpen(false)} />
        <Text>话题名称</Text>
      </XStack>
    </View>
  )
}
