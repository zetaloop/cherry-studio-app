import { useRouter } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, useTheme, YStack } from 'tamagui'

import { HeaderBar } from '@/components/settings/headerBar'

export default function WebDavConfig() {
  const theme = useTheme()
  const router = useRouter()
  const { t } = useTranslation()

  const fieldProps = {
    style: {
      height: 48,
      borderWidth: 1,
      borderColor: theme.borderColor.val,
      borderRadius: 8,
      paddingHorizontal: 12,
      color: theme.color.val
    },
    placeholderTextColor: theme.color.val + '80'
  } as const

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={t('settings.webdav.config.title')} onBackPress={() => router.back()} />
      <ScrollView flex={1} contentContainerStyle={{ padding: 16, backgroundColor: theme.background.val }}>
        <YStack gap={24}>
          <Text fontSize="$5" mb={4}>
            {t('settings.webdav.config.host')}
          </Text>
          <TextInput placeholder={t('settings.webdav.config.host_placeholder')} {...fieldProps} />

          <Text fontSize="$5" mb={4}>
            {t('settings.webdav.config.user')}
          </Text>
          <TextInput placeholder={t('settings.webdav.config.user_placeholder')} {...fieldProps} />

          <Text fontSize="$5" mb={4}>
            {t('settings.webdav.config.password')}
          </Text>
          <TextInput placeholder={t('settings.webdav.config.password_placeholder')} secureTextEntry {...fieldProps} />
          <Text fontSize="$3" color="$blue9" mb={8}>
            {t('settings.webdav.config.password_hint')}
          </Text>

          <Text fontSize="$5" mb={4}>
            {t('settings.webdav.config.path')}
          </Text>
          <TextInput placeholder={t('settings.webdav.config.path_placeholder')} {...fieldProps} />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
