import { Github } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Text, useTheme, XStack, YStack } from 'tamagui'

import ExternalLink from '@/components/external-link'
import {
  SettingContainer,
  SettingDivider,
  SettingGroup,
  SettingRow,
  SettingRowTitle,
  SettingTitle
} from '@/components/settings'

export default function AboutPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <SettingContainer>
        <SettingGroup>
          <SettingTitle>
            {t('settings.about.title')}
            <XStack>
              <ExternalLink href="https://github.com/kangfenmao/cherry-studio">
                <Github marginRight={4} size={20} />
              </ExternalLink>
            </XStack>
          </SettingTitle>
          <SettingDivider />

          <YStack marginBottom={10} alignItems="center">
            <XStack marginBottom={10}>
              <Text fontSize={16} fontWeight="bold">
                Cherry Studio
              </Text>
            </XStack>
            <Text fontSize={14} color="$color.text.2" marginBottom={5}>
              一款为创造者而生的 AI 助手
            </Text>
            <Text fontSize={12} color="$color.text.3">
              v0.0.1
            </Text>
          </YStack>
        </SettingGroup>

        <SettingGroup>
          <SettingRow>
            <SettingRowTitle>{t('settings.about.releases.title')}</SettingRowTitle>
            <Button variant="outlined">{t('settings.about.releases.button')}</Button>
          </SettingRow>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.about.website.title')}</SettingRowTitle>
            <Button variant="outlined">{t('settings.about.website.button')}</Button>
          </SettingRow>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.about.feedback.title')}</SettingRowTitle>
            <Button variant="outlined">{t('settings.about.feedback.button')}</Button>
          </SettingRow>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.about.license.title')}</SettingRowTitle>
            <Button variant="outlined">{t('settings.about.license.button')}</Button>
          </SettingRow>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.about.contact.title')}</SettingRowTitle>
            <Button variant="outlined">{t('settings.about.contact.button')}</Button>
          </SettingRow>
        </SettingGroup>
      </SettingContainer>
    </SafeAreaView>
  )
}
