import { useNavigation } from '@react-navigation/native'
import { ChevronRight, CloudUpload, HardDriveDownload, HardDriveUpload } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, useTheme, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { CustomSwitch } from '@/components/ui/switch'
import { NavigationProps } from '@/types/naviagate'

export default function WebDavPage() {
  const theme = useTheme()
  const router = useRouter()
  const navigation = useNavigation<NavigationProps>()
  const { t } = useTranslation()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={t('settings.webdav.title')} onBackPress={() => router.back()} />
      <ScrollView flex={1} backgroundColor="$background">
        <SettingContainer>
          <YStack gap={24} flex={1} paddingHorizontal="$4" />

          {/* WebDAV Config entry */}
          <YStack gap={24} flex={1}>
            <SettingGroupTitle>{t('settings.webdav.config.title')}</SettingGroupTitle>
            <SettingGroup>
              <SettingRow onPress={() => navigation.navigate('WebDavConfig')}>
                <XStack alignItems="center" gap={12}>
                  <CloudUpload size={24} />
                  <Text fontSize="$5">{t('settings.webdav.config.title')}</Text>
                </XStack>
                <ChevronRight size={24} color="$colorFocus" />
              </SettingRow>
            </SettingGroup>
          </YStack>

          {/* Backup Settings */}
          <YStack gap={24} flex={1}>
            <SettingGroupTitle>{t('settings.webdav.backup.title')}</SettingGroupTitle>
            <SettingGroup>
              <SettingRow>
                <XStack alignItems="center" gap={12}>
                  <HardDriveUpload size={24} />
                  <Text fontSize="$5">{t('settings.webdav.backup.to_webdav')}</Text>
                </XStack>
              </SettingRow>
              <SettingRow>
                <XStack alignItems="center" gap={12}>
                  <HardDriveDownload size={24} />
                  <Text fontSize="$5">{t('settings.webdav.backup.from_webdav')}</Text>
                </XStack>
              </SettingRow>
              <SettingRow>
                <XStack alignItems="center" gap={12}>
                  <Text fontSize="$5">{t('settings.webdav.backup.auto_backup')}</Text>
                </XStack>
                <CustomSwitch />
              </SettingRow>
              <SettingRow>
                <XStack alignItems="center" gap={12}>
                  <Text fontSize="$5">{t('settings.webdav.backup.slim_backup')}</Text>
                </XStack>
                <CustomSwitch />
              </SettingRow>
              <SettingRow>
                <XStack alignItems="center" gap={12}>
                  <Text fontSize="$5">{t('settings.webdav.backup.max_backups')}</Text>
                </XStack>
                <XStack alignItems="center" gap={12}>
                  <Text fontSize="$5">{t('settings.webdav.backup.unlimited')}</Text>
                  <ChevronRight size={24} color="$colorFocus" />
                </XStack>
              </SettingRow>
            </SettingGroup>
          </YStack>
        </SettingContainer>
      </ScrollView>
    </SafeAreaView>
  )
}
