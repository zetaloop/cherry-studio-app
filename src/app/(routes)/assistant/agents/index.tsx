import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'tamagui'

export default function AgentsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>agent</SafeAreaView>
}
