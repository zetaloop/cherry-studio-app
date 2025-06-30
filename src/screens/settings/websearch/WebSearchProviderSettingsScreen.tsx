import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Eye, EyeOff, ShieldCheck } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Button, Input, Spinner, Stack, useTheme, XStack, YStack } from 'tamagui'

import ExternalLink from '@/components/ExternalLink'
import { SettingContainer, SettingGroupTitle } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { WEB_SEARCH_PROVIDER_CONFIG } from '@/config/websearchProviders'
import { useWebsearchProvider } from '@/hooks/useWebsearchProviders'
import WebSearchService from '@/services/WebSearchService'
import { RootStackParamList } from '@/types/naviagate'

type WebsearchProviderSettingsRouteProp = RouteProp<RootStackParamList, 'WebSearchProviderSettingsScreen'>

export default function WebSearchProviderSettingsScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()

  const route = useRoute<WebsearchProviderSettingsRouteProp>()
  const { provider } = useWebsearchProvider(route.params.providerId)
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKey, setApiKey] = useState(provider.apiKey || '')
  const [apiHost, setApiHost] = useState(provider.apiHost || '')
  const [apiChecking, setApiChecking] = useState(false)
  const [apiValid, setApiValid] = useState(false)

  const webSearchProviderConfig = WEB_SEARCH_PROVIDER_CONFIG[provider.id]
  const apiKeyWebsite = webSearchProviderConfig?.websites?.apiKey

  const handleBackPress = () => {
    navigation.goBack()
  }

  const toggleApiKeyVisibility = () => {
    setShowApiKey(prevShowApiKey => !prevShowApiKey)
  }

  const handleApiKeyChange = (text: string) => {
    setApiKey(text)
  }

  const handleApiHostChange = (text: string) => {
    setApiHost(text)
  }

  async function checkSearch() {
    // TODO : 支持多个 API Key 检测
    // if (apiKey.includes(',')) {
    //   const keys = apiKey
    //     .split(',')
    //     .map(k => k.trim())
    //     .filter(k => k)
    //
    //   const result = await ApiCheckPopup.show({
    //     title: t('settings.provider.check_multiple_keys'),
    //     provider: { ...provider, apiHost },
    //     apiKeys: keys,
    //     type: 'websearch'
    //   })
    //
    //   if (result?.validKeys) {
    //     setApiKey(result.validKeys.join(','))
    //     updateProvider({ ...provider, apiKey: result.validKeys.join(',') })
    //   }
    //
    //   return
    // }

    try {
      setApiChecking(true)
      const { valid, error } = await WebSearchService.checkSearch(provider)
      const errorMessage = error && error?.message ? ' ' + error?.message : ''

      if (valid) {
        Alert.alert(t('settings.websearch.check_success'), t('settings.websearch.check_success_message'), [
          { text: t('common.ok'), style: 'cancel' }
        ])
      } else {
        Alert.alert(t('settings.websearch.check_fail'), errorMessage, [{ text: t('common.ok'), style: 'cancel' }])
      }

      setApiValid(valid)
    } catch (err) {
      setApiValid(false)
      Alert.alert(t('settings.websearch.check_error'), t('common.error_occurred'), [
        { text: t('common.ok'), style: 'cancel' }
      ])
    } finally {
      setApiChecking(false)
      setTimeout(() => setApiValid(false), 2500)
    }
  }

  return (
    <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={provider.name} onBackPress={handleBackPress} />

      <SettingContainer>
        {/* API Key 配置 */}
        {provider.type === 'api' && (
          <YStack gap={8}>
            <XStack paddingHorizontal={10} height={20} justifyContent="space-between" alignItems="center">
              <SettingGroupTitle>{t('settings.websearch.api_key')}</SettingGroupTitle>
              <Button
                size={16}
                icon={
                  apiChecking ? (
                    <Spinner size="small" color="$gray10" />
                  ) : (
                    <ShieldCheck size={16} color={apiValid ? '$green10' : undefined} />
                  )
                }
                backgroundColor="$colorTransparent"
                circular
                onPress={checkSearch}
                disabled={apiChecking}></Button>
            </XStack>

            <XStack paddingVertical={8} gap={8} position="relative">
              <Input
                flex={1}
                placeholder={t('settings.websearch.api_key.placeholder')}
                secureTextEntry={!showApiKey}
                paddingRight={48}
                value={apiKey}
                onChangeText={handleApiKeyChange}
              />
              <Stack
                position="absolute"
                right={10}
                top="50%"
                height={16}
                width={16}
                alignItems="center"
                justifyContent="center"
                zIndex={1}
                onPress={toggleApiKeyVisibility}
                cursor="pointer">
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </Stack>
            </XStack>

            <XStack justifyContent="space-between">
              <ExternalLink href={apiKeyWebsite} size={12}>
                {t('settings.websearch.api_key.get')}
              </ExternalLink>
            </XStack>
          </YStack>
        )}

        {/* API Host 配置 */}
        <YStack gap={8}>
          <XStack paddingHorizontal={10} height={20} alignItems="center" justifyContent="space-between">
            <SettingGroupTitle>{t('settings.websearch.api_host')}</SettingGroupTitle>
          </XStack>
          <Input
            placeholder={t('settings.websearch.api_host.placeholder')}
            value={apiHost}
            onChangeText={handleApiHostChange}
          />
        </YStack>
      </SettingContainer>
    </SafeAreaContainer>
  )
}
