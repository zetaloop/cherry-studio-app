import { ScanQrCode } from '@tamagui/lucide-icons'
import { CameraView, useCameraPermissions } from 'expo-camera'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Spinner, Text, useTheme, XStack, YStack } from 'tamagui'

import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'

import { Overlay } from './Overlay'

interface QRCodeScannerProps {
  onQRCodeScanned: (ip: string) => void
  onBackPress: () => void
}

export function QRCodeScanner({ onQRCodeScanned, onBackPress }: QRCodeScannerProps) {
  const theme = useTheme()
  const { t } = useTranslation()
  const [permission, requestPermission] = useCameraPermissions()

  useEffect(() => {
    const getPermission = async () => {
      if (!permission?.granted) {
        await requestPermission()
      }
    }

    getPermission()
  }, [permission, requestPermission])

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    try {
      const qrData = JSON.parse(data)

      if (qrData && qrData.host && qrData.port) {
        const ip = `${qrData.host}:${qrData.port}`
        onQRCodeScanned(ip)
      }
    } catch (error) {
      console.error('Failed to parse QR code data:', error)
    }
  }

  if (!permission) {
    return (
      <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
        <HeaderBar title={t('settings.data.landrop.title')} onBackPress={onBackPress} />
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Spinner />
        </YStack>
      </SafeAreaContainer>
    )
  }

  if (!permission.granted) {
    return (
      <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
        <HeaderBar title={t('settings.data.landrop.title')} onBackPress={onBackPress} />
        <YStack flex={1} justifyContent="center" alignItems="center" padding="$4">
          <Text textAlign="center">{t('settings.data.landrop.cameraPermission')}</Text>
          <Button onPress={requestPermission}>{t('settings.data.landrop.grantPermission')}</Button>
        </YStack>
      </SafeAreaContainer>
    )
  }

  return (
    <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={t('settings.data.landrop.scan_qr_code.title')} onBackPress={onBackPress} />
      <SettingContainer>
        <XStack gap={5} alignItems="center">
          <ScanQrCode color="rgba(0, 185, 107, 1)" />
          <Text>{t('settings.data.landrop.scan_qr_code.description')}</Text>
        </XStack>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr']
          }}
        />
        <Overlay />
      </SettingContainer>
    </SafeAreaContainer>
  )
}
