import { MessageCircleMore, User } from '@tamagui/lucide-icons'
import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function TabLayout() {
  const { t } = useTranslation()
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'pink' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t('home.title'),
          headerShown: false,
          tabBarIcon: ({ color }) => <MessageCircleMore size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: t('profile.title'),
          headerShown: false,
          tabBarIcon: ({ color }) => <User size={28} color={color} />
        }}
      />
    </Tabs>
  )
}
