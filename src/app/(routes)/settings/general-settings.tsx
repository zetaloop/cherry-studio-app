import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { ChevronRight } from '@tamagui/lucide-icons'
import { useFocusEffect } from 'expo-router'
import { useState } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, useTheme, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { CustomSwitch } from '@/components/ui/switch'
import { languagesOptions } from '@/config/languages'
import { themeOptions } from '@/config/theme'
import i18n from '@/i18n'
import { NavigationProps } from '@/types/naviagate'

export default function SettingsPage() {
  const { t } = useTranslation()

  const [language, setLanguage] = useState('zh-CN')
  const [currentTheme, setCurrentTheme] = useState('system')

  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()

  useFocusEffect(
    React.useCallback(() => {
      const loadSettings = async () => {
        const storedLanguage = await AsyncStorage.getItem('language')

        if (storedLanguage) {
          setLanguage(storedLanguage)
        } else {
          setLanguage(i18n.language)
        }

        const storedTheme = await AsyncStorage.getItem('theme')

        if (storedTheme) {
          setCurrentTheme(storedTheme)
        }
      }

      loadSettings()
    }, [])
  )

  const getCurrentLanguage = () => {
    const currentLang = languagesOptions.find(item => item.value === language)
    return currentLang ? `${currentLang.flag} ${currentLang.label}` : 'English'
  }

  const getCurrentTheme = () => {
    const currentThemeOption = themeOptions.find(item => item.value === currentTheme)
    return currentThemeOption ? currentThemeOption.label : '跟随系统'
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
              <SettingRow onPress={() => navigation.navigate('ThemeSettingsPage')}>
                <XStack alignItems="center">
                  <Text fontSize="$5">{t('settings.general.theme.title')}</Text>
                </XStack>
                <XStack alignItems="center" space="$2">
                  <Text color="$colorFocus">{getCurrentTheme()}</Text>
                  <ChevronRight size={24} color="$colorFocus" />
                </XStack>
              </SettingRow>
            </SettingGroup>
          </YStack>

          {/* General settings */}
          <YStack gap={8}>
            <SettingGroupTitle>{t('settings.general.title')}</SettingGroupTitle>
            <SettingGroup>
              <SettingRow onPress={() => navigation.navigate('LanguageChangePage')}>
                <XStack alignItems="center">
                  <Text fontSize="$5">{t('settings.general.language.title')}</Text>
                </XStack>
                <XStack alignItems="center" space="$2">
                  <Text color="$colorFocus">{getCurrentLanguage()}</Text>
                  <ChevronRight size={24} color="$colorFocus" />
                </XStack>
              </SettingRow>
            </SettingGroup>
          </YStack>

          {/* Privacy settings */}
          <YStack gap={8}>
            <SettingGroupTitle>{t('settings.general.display.title')}</SettingGroupTitle>
            <SettingGroup>
              <SettingRow>
                <XStack alignItems="center">
                  <Text fontSize="$5">{t('settings.general.privacy.anonymous')}</Text>
                </XStack>
                <CustomSwitch />
              </SettingRow>
            </SettingGroup>
          </YStack>
        </YStack>
      </SettingContainer>
    </SafeAreaView>
  )
}
