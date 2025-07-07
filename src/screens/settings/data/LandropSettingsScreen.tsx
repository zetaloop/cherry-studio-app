import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Progress, Spinner, Text, useTheme, YStack } from 'tamagui'

import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useWebSocket, WebSocketStatus } from '@/hooks/useWebSocket'
import { NavigationProps } from '@/types/naviagate'

function ConnectionStatus({ status }: { status: WebSocketStatus }) {
  const { t } = useTranslation()
  if (status !== WebSocketStatus.CONNECTED) return null

  return (
    <Text color="$green10" textAlign="center" fontSize="$5">
      {t('settings.data.landrop.connected')}
    </Text>
  )
}

function FileReceiver({ status, filename, progress }: { status: WebSocketStatus; filename: string; progress: number }) {
  const { t } = useTranslation()
  if (status !== WebSocketStatus.RECEIVING) return null

  return (
    <YStack space="$2" alignItems="center">
      <Text textAlign="center">{t('settings.data.landrop.receivingFile', { filename })}</Text>
      <Progress value={progress} width="100%">
        <Progress.Indicator />
      </Progress>
      <Text textAlign="center">{`${Math.floor(progress)}%`}</Text>
    </YStack>
  )
}

export default function LandropSettingsScreen() {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const { t } = useTranslation()
  const { state, actions } = useWebSocket()
  const { status, progress, receivedFilename, error } = state
  const { connect } = actions

  const isConnecting = status === WebSocketStatus.CONNECTING
  const isButtonDisabled =
    status === WebSocketStatus.CONNECTING ||
    status === WebSocketStatus.CONNECTED ||
    status === WebSocketStatus.RECEIVING

  const getButtonText = () => {
    switch (status) {
      case WebSocketStatus.CONNECTING:
        return t('settings.data.landrop.connecting')
      case WebSocketStatus.CONNECTED:
        return t('settings.data.landrop.connected')
      case WebSocketStatus.RECEIVING:
        return t('settings.data.landrop.receiving')
      case WebSocketStatus.DISCONNECTED:
        return t('settings.data.landrop.disconnected')
      case WebSocketStatus.ERROR:
        return t('settings.data.landrop.retry')
      default:
        return t('settings.data.landrop.button')
    }
  }

  return (
    <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={t('settings.data.landrop.title')} onBackPress={() => navigation.goBack()} />
      <YStack padding="$4" space="$4">
        <ConnectionStatus status={status} />

        <Button onPress={connect} disabled={isButtonDisabled} icon={isConnecting ? <Spinner /> : undefined}>
          {getButtonText()}
        </Button>

        {status === WebSocketStatus.ERROR && error && (
          <Text color="$red10" textAlign="center">
            {error}
          </Text>
        )}

        <FileReceiver status={status} filename={receivedFilename} progress={progress} />
      </YStack>
    </SafeAreaContainer>
  )
}
