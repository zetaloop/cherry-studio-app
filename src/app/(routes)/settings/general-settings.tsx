import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { SettingContainer, SettingDivider, SettingRow, SettingRowTitle, SettingTitle } from '@/components/settings'
import { Select } from '@/components/ui/select'
import i18n, { getLanguage } from '@/i18n'
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
      <SettingContainer>
        <SettingTitle>{t('settings.general.title')}</SettingTitle>

        <SettingDivider />

        <SettingRow>
          <SettingRowTitle>{t('common.language')}</SettingRowTitle>
          <Select
            label={t('common.language')}
            value={language}
            onValueChange={handleLanguageChange}
            placeholder="..."
            items={languagesOptions}
          />
        </SettingRow>
        <SettingDivider />
        <SettingRow>
          <SettingRowTitle>{t('settings.proxy.title')}</SettingRowTitle>

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
        </SettingRow>
      </SettingContainer>
    </SafeAreaView>
  )
}
