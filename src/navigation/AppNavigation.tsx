import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import HomeScreen from '@/app/(routes)/home'
import SettingsPage from '@/app/(routes)/settings'
import AboutSettingsPage from '@/app/(routes)/settings/about-settings'
import DataSettingsPage from '@/app/(routes)/settings/data'
import GeneralSettingsPage from '@/app/(routes)/settings/general-settings'
import ModelSettingsPage from '@/app/(routes)/settings/model'
import ProvidersPage from '@/app/(routes)/settings/providers'
import ApiServicePage from '@/app/(routes)/settings/providers/api-service'
import ManageModelsPage from '@/app/(routes)/settings/providers/manage-models'
import ProviderListPage from '@/app/(routes)/settings/providers/provider-list'
import ProviderSettingsPage from '@/app/(routes)/settings/providers/provider-settings'
import WebSearchSettingsPage from '@/app/(routes)/settings/websearch'
import WelcomePage from '@/app/(routes)/welcome'
import { useAppSelector } from '@/store'
import { RootStackParamList } from '@/types/naviagate'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppNavigation: React.FC = () => {
  const welcomeShown = useAppSelector(state => state.app.welcomeShown)

  return (
    <Stack.Navigator>
      {!welcomeShown && <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomePage} />}
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Settings" component={SettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="DataSettings" component={DataSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ModelSettings" component={ModelSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ProvidersPage" component={ProvidersPage} />
      <Stack.Screen options={{ headerShown: false }} name="AboutSettings" component={AboutSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="GeneralSettings" component={GeneralSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="WebSearchSettings" component={WebSearchSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ProviderListPage" component={ProviderListPage} />
      <Stack.Screen options={{ headerShown: false }} name="ProviderSettingsPage" component={ProviderSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ManageModelsPage" component={ManageModelsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ApiServicePage" component={ApiServicePage} />
    </Stack.Navigator>
  )
}
