import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, useTheme, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { CustomSwitch } from '@/components/ui/switch'
import i18n from '@/i18n'
import { LanguageVarious } from '@/types'
import { NavigationProps } from '@/types/naviagate'

const languagesOptions: { value: LanguageVarious; label: string; flag: string }[] = [
  { value: 'zh-CN', label: '中文', flag: '🇨🇳' },
  { value: 'zh-TW', label: '中文（繁体）', flag: '🇭🇰' },
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
  { value: 'ja-JP', label: '日本語', flag: '🇯🇵' },
  { value: 'ru-RU', label: 'Русский', flag: '🇷🇺' }
]

const themeOptions = [
  { value: 'light', label: '浅色' },
  { value: 'dark', label: '深色' },
  { value: 'system', label: '跟随系统' }
]

export default function SettingsPage() {
  const { t } = useTranslation()
  const [language, setLanguage] = useState('zh-CN')
  const [currentTheme, setCurrentTheme] = useState('system')
  const [proxyMode, setProxyMode] = useState('system')
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()

  const handleLanguageChange = async (value: string) => {
    setLanguage(value)
    await AsyncStorage.setItem('language', value)
    await i18n.changeLanguage(value)
  }

  const handleThemeChange = async (value: string) => {
    setCurrentTheme(value)
    await AsyncStorage.setItem('theme', value)
    // 这里需要调用主题切换的逻辑
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={t('settings.general.title')} onBackPress={() => navigation.goBack()} />
      <SettingContainer>
        <YStack gap={24} flex={1}>
          {/* Display settings */}
          <YStack gap={8}>
            <SettingGroupTitle>{t('settings.general.display.title')}</SettingGroupTitle>
            <SettingGroup>
              <SettingRow>
                <Text>{t('settings.general.theme.title')}</Text>
              </SettingRow>
            </SettingGroup>
          </YStack>

          {/* General settings */}
          <YStack gap={8}>
            <SettingGroupTitle>{t('settings.general.title')}</SettingGroupTitle>
            <SettingGroup>
              <SettingRow>
                <Text>{t('settings.general.language.title')}</Text>
              </SettingRow>
            </SettingGroup>
          </YStack>

          {/* Privacy settings */}
          <YStack gap={8}>
            <SettingGroupTitle>{t('settings.general.display.title')}</SettingGroupTitle>
            <SettingGroup>
              <SettingRow>
                <Text>{t('settings.general.privacy.anonymous')}</Text>
                <CustomSwitch />
              </SettingRow>
            </SettingGroup>
          </YStack>
        </YStack>
      </SettingContainer>
    </SafeAreaView>
  )
}
