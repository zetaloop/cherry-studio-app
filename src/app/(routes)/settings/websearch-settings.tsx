import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'tamagui'

import { SettingContainer, SettingDivider, SettingRow, SettingRowTitle, SettingTitle } from '@/components/settings'

export default function WebSearchSettingsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <SettingContainer>
        <SettingTitle>{t('')}</SettingTitle>
        <SettingDivider />
        <SettingRow>
          <SettingRowTitle>{t('')}</SettingRowTitle>
        </SettingRow>
      </SettingContainer>
    </SafeAreaView>
  )
}
