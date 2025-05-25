import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  Welcome: undefined
  Home: undefined
  Settings: undefined
  DataSettings: undefined
  ModelSettings: undefined
  ProvidersPage: undefined
  AboutSettings: undefined
  GeneralSettings: undefined
  WebSearchSettings: undefined
  ProviderListPage: undefined
  ProviderSettingsPage: { providerId: string }
  ManageModelsPage: { providerId: string }
  ApiServicePage: { providerId: string }
}
export type NavigationProps = StackNavigationProp<RootStackParamList>
