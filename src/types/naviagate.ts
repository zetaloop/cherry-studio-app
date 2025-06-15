import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  WelcomeScreen: undefined
  HomeScreen: undefined
  SettingsScreen: undefined
  DataSettingsScreen: undefined
  BasicDataSettingsScreen: undefined
  WebDavScreen: undefined
  WebDavConfigScreen: undefined
  NutstoreLoginScreen: undefined
  ModelSettingsScreen: undefined
  ProvidersScreen: undefined
  AboutScreen: undefined
  GeneralSettingsScreen: undefined
  ThemeSettingsScreen: undefined
  LanguageChangeScreen: undefined
  WebSearchSettingsScreen: undefined
  ProviderListScreen: undefined
  ProviderSettingsScreen: { providerId: string }
  ManageModelsScreen: { providerId: string }
  ApiServiceScreen: { providerId: string }
  TopicScreen: undefined
  AssistantScreen: undefined
  AssistantDetailScreen: { assistantId?: string; mode: 'create' | 'edit' }
  AssistantMarketScreen: undefined
  WebSearchProviderSettingsScreen: { providerId: string }
}
export type NavigationProps = StackNavigationProp<RootStackParamList>
