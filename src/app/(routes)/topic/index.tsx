import { useNavigation } from '@react-navigation/native'
import { PenSquare } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from 'tamagui'

import { SettingContainer } from '@/components/Settings'
import { HeaderBar } from '@/components/Settings/HeaderBar'
import { SearchInput } from '@/components/UI/SearchInput'

export default function TopicPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()

  const onAddTopic = () => {
    // Navigate to the topic creation page or open a modal
    console.log('Navigate to add topic page')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar
        title={t('topics.title.recent')}
        onBackPress={() => navigation.goBack()}
        rightButton={{
          icon: <PenSquare size={24} />,
          onPress: onAddTopic
        }}
      />
      <SettingContainer>
        <SearchInput placeholder={t('common.search_placeholder')} />
      </SettingContainer>
    </SafeAreaView>
  )
}
