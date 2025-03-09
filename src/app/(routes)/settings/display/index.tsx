import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Switch, Text, ToggleGroup, XStack } from 'tamagui'

import {
  SettingContainer,
  SettingDivider,
  SettingGroup,
  SettingRow,
  SettingRowTitle,
  SettingTitle
} from '@/components/settings'

export default function DisplaySettingsPage() {
  const { t } = useTranslation()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SettingContainer>
        <SettingGroup>
          <SettingTitle>{t('settings.display.title')}</SettingTitle>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.theme.title')}</SettingRowTitle>
            <ToggleGroup type="single">
              <ToggleGroup.Item value="light">
                <Text>{t('settings.theme.light')}</Text>
              </ToggleGroup.Item>
              <ToggleGroup.Item value="dark">
                <Text>{t('settings.theme.dark')}</Text>
              </ToggleGroup.Item>
              <ToggleGroup.Item value="system">
                <Text>{t('settings.theme.auto')}</Text>
              </ToggleGroup.Item>
            </ToggleGroup>
          </SettingRow>
        </SettingGroup>

        <SettingGroup>
          <SettingTitle>{t('settings.display.assistant.title')}</SettingTitle>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.assistant.show.icon')}</SettingRowTitle>
            <Switch>
              <Switch.Thumb animation="quicker" />
            </Switch>
          </SettingRow>
        </SettingGroup>

        <SettingGroup>
          <XStack justifyContent="space-between" alignItems="center">
            <SettingRowTitle>{t('settings.display.minApp.title')}</SettingRowTitle>
            <Button>{t('common.reset')}</Button>
          </XStack>
          <SettingDivider />
        </SettingGroup>
      </SettingContainer>
    </SafeAreaView>
  )
}
