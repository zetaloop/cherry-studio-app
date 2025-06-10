import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { FC } from 'react'
import { PersistGate } from 'redux-persist/integration/react'

import HomeScreen from '@/app/(routes)'
import SettingsPage from '@/app/(routes)/settings'
import AboutSettingsPage from '@/app/(routes)/settings/AboutPage'
import DataSettingsPage from '@/app/(routes)/settings/data'
import BasicDataSettingsPage from '@/app/(routes)/settings/data/BasicDataSettingsPage'
import NutstoreLogin from '@/app/(routes)/settings/data/NutstoreLogin'
import WebDavConfig from '@/app/(routes)/settings/data/WebDavConfig'
import WebDavPage from '@/app/(routes)/settings/data/WebDavPage'
import LanguageChangePage from '@/app/(routes)/settings/LanguageChangePage'
import ModelSettingsPage from '@/app/(routes)/settings/model'
import ProvidersPage from '@/app/(routes)/settings/providers'
import ApiServicePage from '@/app/(routes)/settings/providers/ApiServicePage'
import ManageModelsPage from '@/app/(routes)/settings/providers/ManageModelsPage'
import ProviderListPage from '@/app/(routes)/settings/providers/ProviderListPage'
import ProviderSettingsPage from '@/app/(routes)/settings/providers/ProviderSettingsPage'
import GeneralSettingsPage from '@/app/(routes)/settings/SettingsPage'
import ThemeSettingsPage from '@/app/(routes)/settings/ThemeSettingsPage'
import WebSearchSettingsPage from '@/app/(routes)/settings/websearch'
import WelcomePage from '@/app/(routes)/welcome'
import { persistor } from '@/store'
import { useAppSelector } from '@/store'
import { RootStackParamList } from '@/types/naviagate'

import AssistantPage from './assistant'
import AssistantDetailPage from './assistant/AssistantDetailPage'
import AssistantMarketPage from './assistant/AssistantMarketPage'
import WebSearchProviderSettingsPage from './settings/websearch/WebsearchProviderSettingsPage'
import TopicPage from './topic'

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppStackLayout: FC = () => {
  const welcomeShown = useAppSelector(state => state.app.welcomeShown)

  return (
    <Stack.Navigator>
      {!welcomeShown && <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomePage} />}
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Settings" component={SettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="DataSettings" component={DataSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="BasicDataSettings" component={BasicDataSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="WebDavPage" component={WebDavPage} />
      <Stack.Screen options={{ headerShown: false }} name="WebDavConfig" component={WebDavConfig} />
      <Stack.Screen options={{ headerShown: false }} name="NutstoreLogin" component={NutstoreLogin} />
      <Stack.Screen options={{ headerShown: false }} name="ModelSettings" component={ModelSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ProvidersPage" component={ProvidersPage} />
      <Stack.Screen options={{ headerShown: false }} name="AboutSettings" component={AboutSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="GeneralSettings" component={GeneralSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ThemeSettingsPage" component={ThemeSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="LanguageChangePage" component={LanguageChangePage} />
      <Stack.Screen options={{ headerShown: false }} name="WebSearchSettings" component={WebSearchSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ProviderListPage" component={ProviderListPage} />
      <Stack.Screen options={{ headerShown: false }} name="ProviderSettingsPage" component={ProviderSettingsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ManageModelsPage" component={ManageModelsPage} />
      <Stack.Screen options={{ headerShown: false }} name="ApiServicePage" component={ApiServicePage} />
      <Stack.Screen options={{ headerShown: false }} name="TopicPage" component={TopicPage} />
      <Stack.Screen options={{ headerShown: false }} name="AssistantPage" component={AssistantPage} />
      <Stack.Screen options={{ headerShown: false }} name="AssistantDetailPage" component={AssistantDetailPage} />
      <Stack.Screen options={{ headerShown: false }} name="AssistantMarketPage" component={AssistantMarketPage} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="WebsearchProviderSettingsPage"
        component={WebSearchProviderSettingsPage}
      />
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
