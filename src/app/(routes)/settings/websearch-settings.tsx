import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { SettingContainer, SettingDivider, SettingRow, SettingRowTitle, SettingTitle } from '@/components/settings'

export default function WebSearchSettingsPage() {
  const { t } = useTranslation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
