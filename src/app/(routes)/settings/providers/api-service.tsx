import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { Eye, EyeOff, ShieldCheck } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Input, Stack, Text, useTheme, XStack, YStack } from 'tamagui'

import ExternalLink from '@/components/external-link'
import { HeaderBar } from '@/components/settings/headerBar'
import { useProvider } from '@/hooks/use-providers'
import { NavigationProps, RootStackParamList } from '@/types/naviagate'

type ProviderSettingsRouteProp = RouteProp<RootStackParamList, 'ApiServicePage'>

export default function ApiServicePage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const route = useRoute<ProviderSettingsRouteProp>()
  const [showApiKey, setShowApiKey] = useState(false)

  const { providerId } = route.params
  const { provider } = useProvider(providerId)

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.val
      }}>
      <YStack backgroundColor="$background" flex={1} gap={24} padding="$4 " onPress={Keyboard.dismiss}>
        <HeaderBar title={t('settings.provider.api_service')} onBackPress={() => navigation.goBack()} />

        <YStack gap={8}>
          <XStack paddingHorizontal={10} height={20} justifyContent="space-between" alignItems="center">
            <Text>{t('settings.provider.api_key')}</Text>
            <Button size={16} icon={<ShieldCheck size={16} />} backgroundColor="$colorTransparent" circular />
          </XStack>

          <XStack paddingVertical={8} gap={8} position="relative">
            <Input
              flex={1}
              placeholder={t('settings.provider.api_key.placeholder')}
              secureTextEntry={!showApiKey}
              paddingRight={48}
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
              onPress={() => setShowApiKey(!showApiKey)}
              cursor="pointer">
              {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </Stack>
          </XStack>
          <XStack justifyContent="space-between">
            <Text fontSize={12}>{t('settings.provider.api_key.tip')}</Text>
            <ExternalLink href="https://github.com/kangfenmao/cherry-studio" size={12}>
              {t('settings.provider.api_key.get')}
            </ExternalLink>
          </XStack>
        </YStack>

        <YStack gap={8}>
          <XStack paddingHorizontal={10} height={20} alignItems="center">
            <Text>{t('settings.provider.api_host')}</Text>
          </XStack>
          <Input placeholder={t('settings.provider.api_host')} />
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
