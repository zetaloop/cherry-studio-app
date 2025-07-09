import React from 'react'
import { useTranslation } from 'react-i18next'
import { Progress, Text, useTheme } from 'tamagui'

import { SettingContainer, SettingGroup, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { WebSocketStatus } from '@/hooks/useWebSocket'

interface DataTransferProps {
  status: WebSocketStatus
  ip: string
  filename?: string
  progress: number
  onBackPress: () => void
}

function ConnectionStatus({ status, ip }: { status: WebSocketStatus; ip: string }) {
  const { t } = useTranslation()

  return (
    <SettingGroup>
      <SettingRow>
        <Text color="$blue10" textAlign="center" fontSize="$4">
          IP: {ip}
        </Text>
      </SettingRow>
      <SettingRow>
        <Text>{t('settings.data.landrop.status.title')}</Text>
        <Text>{t(`settings.data.landrop.status.${status}`)}</Text>
      </SettingRow>
    </SettingGroup>
  )
}

function FileReceiver({ filename, progress }: { filename: string; progress: number }) {
  const { t } = useTranslation()
  const progressValue = Math.floor(Math.min(Math.max(progress, 0), 100))

  return (
    <SettingGroup>
      <SettingRow>
        <Text>{t('settings.data.landrop.filename')}</Text>
        <Text>{filename}</Text>
      </SettingRow>
      <SettingRow>
        <Progress value={progressValue} width="100%">
          <Progress.Indicator />
        </Progress>
      </SettingRow>

      <SettingRow>
        <Text textAlign="center">{`${progressValue}%`}</Text>
      </SettingRow>
    </SettingGroup>
  )
}

export function DataTransfer({ status, ip, filename, progress, onBackPress }: DataTransferProps) {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={t('settings.data.landrop.title')} onBackPress={onBackPress} />
      <SettingContainer>
        <ConnectionStatus status={status} ip={ip} />
        {filename && <FileReceiver filename={filename} progress={progress} />}
      </SettingContainer>
    </SafeAreaContainer>
  )
}
