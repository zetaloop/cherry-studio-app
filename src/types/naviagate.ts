import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  Welcome: undefined
  Home: undefined
  Settings: undefined
  DataSettings: undefined
  BasicDataSettings: undefined
  WebDavPage: undefined
  WebDavConfig: undefined
  ModelSettings: undefined
  ProvidersPage: undefined
  AboutSettings: undefined
  GeneralSettings: undefined
  ThemeSettingsPage: undefined
  LanguageChangePage: undefined
  WebSearchSettings: undefined
  ProviderListPage: undefined
  ProviderSettingsPage: { providerId: string }
  ManageModelsPage: { providerId: string }
  ApiServicePage: { providerId: string }
  TopicPage: undefined
  AssistantPage: undefined
  AssistantDetailPage: { assistantId?: string; mode: 'create' | 'edit' }
  AssistantMarketPage: undefined
  WebsearchProviderSettingsPage: { providerId: string }
}
export type NavigationProps = StackNavigationProp<RootStackParamList>
