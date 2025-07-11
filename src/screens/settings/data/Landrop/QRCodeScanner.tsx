import { ScanQrCode } from '@tamagui/lucide-icons'
import { CameraView, useCameraPermissions } from 'expo-camera'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, useTheme, XStack } from 'tamagui'

import { SettingContainer } from '@/components/settings'

import { Overlay } from './Overlay'

interface QRCodeScannerProps {
  onQRCodeScanned: (ip: string) => void
}

export function QRCodeScanner({ onQRCodeScanned }: QRCodeScannerProps) {
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

  return (
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
  )
}
