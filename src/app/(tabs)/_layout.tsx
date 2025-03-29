import { MessageCircleMore, Plus, Search, User } from '@tamagui/lucide-icons'
import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { Button, XStack } from 'tamagui'

export default function TabLayout() {
  const { t } = useTranslation()
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'pink' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('assistants.title'),
          headerRight: () => (
            <XStack gap={4} paddingRight={10}>
              <Button size="$3" backgroundColor="transparent" icon={Search} />
              <Button size="$3" backgroundColor="transparent" icon={Plus} />
            </XStack>
          ),
          tabBarIcon: ({ color }) => <MessageCircleMore size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile.title'),
          headerShown: false,
          tabBarIcon: ({ color }) => <User size={28} color={color} />
        }}
      />
    </Tabs>
  )
}
