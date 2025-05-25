import { useNavigation } from '@react-navigation/native'
import { ArrowUpRight, Github, Rss } from '@tamagui/lucide-icons'
import * as ExpoLinking from 'expo-linking'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, Text, useTheme, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'

export default function AboutPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <SettingContainer>
        <HeaderBar
          title={t('settings.about.header')}
          onBackPress={() => navigation.goBack()}
          rightButton={{
            icon: <Github size={24} />,
            onPress: async () => await ExpoLinking.openURL('https://github.com/CherryHQ/cherry-studio-app')
          }}
        />
        <YStack gap={24} flex={1} marginTop={16}>
          {/* Logo and Description */}
          <SettingGroup>
            <SettingRow gap={18}>
              <Image height={70} width={70} borderRadius={41} source={require('@/assets/images/favicon.png')} />
              <YStack gap={5} paddingVertical={4} flex={1}>
                <Text fontWeight="bold" fontSize={22}>
                  {t('common.cherry_studio')}
                </Text>
                <Text fontSize={12} numberOfLines={0} flexWrap="wrap">
                  {t('common.cherry_studio_description')}
                </Text>
                <Text
                  borderWidth={0.42}
                  borderRadius={25.37}
                  backgroundColor="$gray9"
                  alignSelf="flex-start"
                  paddingHorizontal={8}
                  paddingVertical={2}>
                  v0.0.1
                </Text>
              </YStack>
            </SettingRow>
          </SettingGroup>

          <SettingGroup>
            <SettingRow>
              <XStack alignItems="center" gap={10}>
                <Rss size={20} />
                <Text>{t('settings.about.releases.title')}</Text>
              </XStack>
              <ArrowUpRight size={16} />
            </SettingRow>
          </SettingGroup>
        </YStack>
      </SettingContainer>
    </SafeAreaView>
  )
}
