import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui'
import { Text } from 'tamagui'

import { useWidth } from '@/hooks/use-width'

// TODO Large screen adapt
export default function Layout() {
  const isLarge = useWidth(768) && false
  return (
    <Tabs>
      <TabList style={{ display: isLarge ? 'flex' : 'none' }}>
        <TabTrigger style={{ display: 'none' }} name="home" href="/settings/providers">
          <Text>Home</Text>
        </TabTrigger>
        <TabTrigger name="article" href="/settings/providers/open-ai">
          <Text>open-ai</Text>
        </TabTrigger>
      </TabList>
      <TabSlot />
    </Tabs>
  )
}
