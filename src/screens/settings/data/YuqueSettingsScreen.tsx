import BottomSheet from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { Eye, EyeOff, ShieldCheck } from '@tamagui/lucide-icons'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Alert } from 'react-native'
import { Button, Input, Stack, Text, useTheme, XStack, YStack } from 'tamagui'

import ExternalLink from '@/components/ExternalLink'
import { SettingContainer, SettingGroupTitle } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { ApiCheckSheet } from '@/components/settings/websearch/ApiCheckSheet'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useDataBackupProvider } from '@/hooks/useDataBackup'

export default function YuqueSettingsScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()

  const [showApiKey, setShowApiKey] = useState(false)
  const [checkLoading, setCheckLoading] = useState(false)
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const { provider, isLoading, updateProvider } = useDataBackupProvider('yuque')

  if (isLoading) {
    return (
      <SafeAreaContainer>
        <ActivityIndicator />
      </SafeAreaContainer>
    )
  }

  if (!provider) {
    return (
      <SafeAreaContainer>
        <HeaderBar title={t('settings.provider.not_found')} onBackPress={() => navigation.goBack()} />
        <SettingContainer>
          <Text textAlign="center" color="$gray10" paddingVertical={24}>
            {t('settings.provider.not_found_message')}
          </Text>
        </SettingContainer>
      </SafeAreaContainer>
    )
  }

  const handleBackPress = () => {
    navigation.goBack()
  }

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand()
    setIsBottomSheetOpen(true)
  }

  const handleBottomSheetClose = () => {
    setIsBottomSheetOpen(false)
  }

  const toggleApiKeyVisibility = () => {
    setShowApiKey(prevShowApiKey => !prevShowApiKey)
  }

  const handleProviderConfigChange = async (key: string, value: any) => {
    try {
      if (!provider) return

      const updatedProvider = {
        ...provider,
        [key]: value
      }

      await updateProvider(updatedProvider)
      console.log('Provider config updated:', key, value)
    } catch (error) {
      console.error('Error updating provider config:', error)
      Alert.alert(t('settings.yuque.update.fail'))
    }
  }

  async function checkConnection() {
    setCheckLoading(true)

    try {
      console.log('Checking Yuque connection...')
      Alert.alert(t('settings.yuque.check.success'))
    } catch (error) {
      Alert.alert(t('settings.yuque.check.fail'))
      throw error
    } finally {
      setCheckLoading(false)
    }
  }

  return (
    <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={t('settings.yuque.title')} onBackPress={handleBackPress} />
      <SettingContainer>
        <YStack gap={8}>
          <XStack paddingHorizontal={10} height={20} alignItems="center">
            <SettingGroupTitle>{t('settings.yuque.repo_url')}</SettingGroupTitle>
          </XStack>
          <Input
            placeholder={t('settings.yuque.repo_url_placeholder')}
            value={provider.yuqueUrl || ''}
            onChangeText={text => handleProviderConfigChange('yuqueUrl', text)}
          />
        </YStack>

        <YStack gap={8}>
          <XStack paddingHorizontal={10} height={20} justifyContent="space-between" alignItems="center">
            <SettingGroupTitle>{t('settings.yuque.token')}</SettingGroupTitle>
            <Button
              size={16}
              icon={<ShieldCheck size={16} />}
              backgroundColor="$colorTransparent"
              circular
              onPress={handleOpenBottomSheet}
            />
          </XStack>

          <XStack paddingVertical={8} gap={8} position="relative">
            <Input
              flex={1}
              placeholder={t('settings.yuque.token_placeholder')}
              secureTextEntry={!showApiKey}
              paddingRight={48}
              value={provider.yuqueToken || ''}
              onChangeText={text => handleProviderConfigChange('yuqueToken', text)}
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
            <ExternalLink href="https://www.yuque.com/settings/tokens" size={12}>
              {t('settings.yuque.help')}
            </ExternalLink>
          </XStack>
        </YStack>
      </SettingContainer>
      <ApiCheckSheet
        bottomSheetRef={bottomSheetRef}
        isOpen={isBottomSheetOpen}
        onClose={handleBottomSheetClose}
        apiKey={''}
        onStartModelCheck={checkConnection}
        loading={checkLoading}
      />
    </SafeAreaContainer>
  )
}
