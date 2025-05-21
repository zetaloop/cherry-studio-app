import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import HomeScreen from '@/app/(routes)/home'
import SettingsPage from '@/app/(routes)/settings'
import AboutSettingsPage from '@/app/(routes)/settings/about-settings'
import DataSettingsPage from '@/app/(routes)/settings/data'
import GeneralSettingsPage from '@/app/(routes)/settings/general-settings'
import ModelSettingsPage from '@/app/(routes)/settings/model'
import ProvidersSettingsPage from '@/app/(routes)/settings/providers'
import OpenAiSettingsPage from '@/app/(routes)/settings/providers/open-ai'
import WebSearchSettingsPage from '@/app/(routes)/settings/websearch-settings'
import WelcomePage from '@/app/(routes)/welcome'
import { useAppSelector } from '@/store'

const Stack = createNativeStackNavigator()

export const AppNavigation: React.FC = () => {
  const welcomeShown = useAppSelector(state => state.app.welcomeShown)

  return (
    <Stack.Navigator>
      {!welcomeShown && <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomePage} />}
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Settings" component={SettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="DataSettings" component={DataSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ModelSettings" component={ModelSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ProvidersSettings" component={ProvidersSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="OpenAiSettings" component={OpenAiSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="AboutSettings" component={AboutSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="GeneralSettings" component={GeneralSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="WebSearchSettings" component={WebSearchSettingsPage} />
    </Stack.Navigator>
  )
}
