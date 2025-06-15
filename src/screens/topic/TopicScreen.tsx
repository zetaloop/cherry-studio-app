import { useNavigation } from '@react-navigation/native'
import { PenSquare } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'tamagui'

import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { SearchInput } from '@/components/ui/SearchInput'

export default function TopicScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()

  const onAddTopic = () => {
    // Navigate to the topic creation page or open a modal
    console.log('Navigate to add topic page')
  }

  return (
    <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
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
    </SafeAreaContainer>
  )
}
