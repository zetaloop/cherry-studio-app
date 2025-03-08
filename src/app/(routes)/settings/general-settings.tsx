import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, XStack, YStack } from 'tamagui'

// eslint-disable-next-line import/no-unresolved
import { Select } from '@/components/ui/select'
// eslint-disable-next-line import/no-unresolved
import i18n, { getLanguage } from '@/i18n'
// eslint-disable-next-line import/no-unresolved
import { LanguageVarious } from '@/types'

const languagesOptions: { value: LanguageVarious; label: string; flag: string }[] = [
  { value: 'zh-CN', label: '中文', flag: '🇨🇳' },
  { value: 'zh-TW', label: '中文（繁体）', flag: '🇭🇰' },
  { value: 'en-US', label: 'English', flag: '🇺🇸' },
  { value: 'ja-JP', label: '日本語', flag: '🇯🇵' },
  { value: 'ru-RU', label: 'Русский', flag: '🇷🇺' }
]

export default function SettingsPage() {
  const { t } = useTranslation()
  const [language, setLanguage] = useState('zh-CN')
  const [proxyMode, setProxyMode] = useState('system')

  useEffect(() => {
    const initLanguage = async () => {
      const currentLang = await getLanguage()
      setLanguage(currentLang)
    }

    initLanguage()
  }, [])

  const handleLanguageChange = async (value: string) => {
    setLanguage(value)
    await AsyncStorage.setItem('language', value)
    await i18n.changeLanguage(value)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <YStack padding="$4" gap={16} flex={1}>
          <Text fontSize="$6" fontWeight="bold">
            {t('settings.general.title')}
          </Text>

          <YStack backgroundColor="$background" padding="$4" borderRadius="$4" gap={16}>
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$4">{t('common.language')}</Text>
              <Select
                label={t('common.language')}
                value={language}
                onValueChange={handleLanguageChange}
                placeholder="..."
                items={languagesOptions}
              />
            </XStack>

            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize="$4">{t('settings.proxy.title')}</Text>

              <Select
                label={t('settings.proxy.title')}
                value={proxyMode}
                onValueChange={setProxyMode}
                placeholder="..."
                items={[
                  { value: 'system', label: t('settings.proxy.mode.system') },
                  { value: 'none', label: t('settings.proxy.mode.none') },
                  { value: 'custom', label: t('settings.proxy.mode.custom') }
                ]}
              />
            </XStack>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
