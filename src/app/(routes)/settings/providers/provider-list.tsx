import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, useTheme } from 'tamagui'

export default function ProviderListPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.val
      }}>
      <Text fontSize="$6" fontWeight="bold">
        {t('settings.provider.title')}
      </Text>
    </SafeAreaView>
  )
}
