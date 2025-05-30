import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { PersistGate } from 'redux-persist/integration/react'

import HomeScreen from '@/app/(routes)'
import SettingsPage from '@/app/(routes)/settings'
import AboutSettingsPage from '@/app/(routes)/settings/about-settings'
import DataSettingsPage from '@/app/(routes)/settings/data'
import BasicDataSettingsPage from '@/app/(routes)/settings/data/basic-data'
import GeneralSettingsPage from '@/app/(routes)/settings/general-settings'
import ModelSettingsPage from '@/app/(routes)/settings/model'
import ProvidersPage from '@/app/(routes)/settings/providers'
import ApiServicePage from '@/app/(routes)/settings/providers/api-service'
import ManageModelsPage from '@/app/(routes)/settings/providers/manage-models'
import ProviderListPage from '@/app/(routes)/settings/providers/provider-list'
import ProviderSettingsPage from '@/app/(routes)/settings/providers/provider-settings'
import WebSearchSettingsPage from '@/app/(routes)/settings/websearch'
import WelcomePage from '@/app/(routes)/welcome'
import { persistor } from '@/store'
import { useAppSelector } from '@/store'
import { RootStackParamList } from '@/types/naviagate'

import AgentPage from './agent'
import AgentDetailPage from './agent/agentDetail'
import TopicPage from './topic'

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppStackLayout: FC = () => {
  const welcomeShown = useAppSelector(state => state.app.welcomeShown)

  return (
    <Stack.Navigator initialRouteName="AgentPage">
      {!welcomeShown && <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomePage} />}
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Settings" component={SettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="DataSettings" component={DataSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="BasicDataSettings" component={BasicDataSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ModelSettings" component={ModelSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ProvidersPage" component={ProvidersPage} />
      <Stack.Screen options={{ headerShown: false }} name="AboutSettings" component={AboutSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="GeneralSettings" component={GeneralSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="WebSearchSettings" component={WebSearchSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ProviderListPage" component={ProviderListPage} />
      <Stack.Screen options={{ headerShown: false }} name="ProviderSettingsPage" component={ProviderSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ManageModelsPage" component={ManageModelsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ApiServicePage" component={ApiServicePage} />
      <Stack.Screen options={{ headerShown: false }} name="TopicPage" component={TopicPage} />
      <Stack.Screen options={{ headerShown: false }} name="AgentPage" component={AgentPage} />
      <Stack.Screen options={{ headerShown: false }} name="AgentDetailPage" component={AgentDetailPage} />
    </Stack.Navigator>
  )
}

export default function AppStackWithPersist() {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <AppStackLayout />
    </PersistGate>
  )
}
