import { Folder, Save } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, useTheme, XStack } from 'tamagui'

import {
  SettingContainer,
  SettingDivider,
  SettingGroup,
  SettingRow,
  SettingRowTitle,
  SettingTitle
} from '@/components/settings'
import { NotionSettings, WebDavSettings, Yuque } from '@/components/settings/data'

export default function DataSettingsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <SettingContainer>
        <SettingGroup>
          <SettingTitle>{t('settings.data.title')}</SettingTitle>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.general.backup.title')}</SettingRowTitle>
            <XStack>
              <Button variant="outlined" icon={<Save />}>
                {t('settings.general.backup.button')}
              </Button>
              <Button variant="outlined" icon={<Folder />}>
                {t('settings.general.restore.button')}
              </Button>
            </XStack>
          </SettingRow>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.general.reset.title')}</SettingRowTitle>
            <Button variant="outlined" color={'red'}>
              {t('settings.general.reset.button')}
            </Button>
          </SettingRow>
        </SettingGroup>

        <SettingGroup>
          <WebDavSettings />
        </SettingGroup>

        <SettingGroup>
          <NotionSettings />
        </SettingGroup>

        <SettingGroup>
          <Yuque />
        </SettingGroup>

        <SettingGroup>
          <SettingTitle>{t('settings.data.data.title')}</SettingTitle>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.data.app_data')}</SettingRowTitle>
          </SettingRow>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.data.app_logs')}</SettingRowTitle>
          </SettingRow>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.data.app_knowledge')}</SettingRowTitle>
            <Button variant="outlined" color={'red'}>
              {t('settings.data.app_knowledge.remove_all')}
            </Button>
          </SettingRow>
          <SettingDivider />
          <SettingRow>
            <SettingRowTitle>{t('settings.data.clear_cache.title')}</SettingRowTitle>
            <Button variant="outlined" color={'red'}>
              {t('settings.data.clear_cache.button')}
            </Button>
          </SettingRow>
        </SettingGroup>
      </SettingContainer>
    </SafeAreaView>
  )
}
