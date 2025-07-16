import { useNavigation } from '@react-navigation/native'
import { File, Paths } from 'expo-file-system/next'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'tamagui'

import { RestoreProgressModal } from '@/components/settings/data/RestoreProgressModal'
import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { useRestore } from '@/hooks/useRestore'
import { useWebSocket, WebSocketStatus } from '@/hooks/useWebSocket'
import { NavigationProps } from '@/types/naviagate'

import { QRCodeScanner } from './QRCodeScanner'

export default function LandropSettingsScreen() {
  const theme = useTheme()
  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProps>()
  const { status, filename, connect } = useWebSocket()
  const [scannedIP, setScannedIP] = useState<string | null>(null)
  const { isModalOpen, restoreSteps, overallStatus, startRestore, closeModal } = useRestore()

  // 监听 WebSocket 状态变化，在断开连接时重置扫描状态
  useEffect(() => {
    if (status === WebSocketStatus.DISCONNECTED) {
      setScannedIP(null)
    }
  }, [status])

  // 收到文件名后开始恢复
  useEffect(() => {
    const handleRestore = async () => {
      if (status === WebSocketStatus.ZIP_FILE_END) {
        const zip = new File(Paths.join(Paths.cache, 'Files'), filename)
        await startRestore({
          name: zip.name,
          uri: zip.uri,
          size: zip.size || 0,
          mimeType: zip.type || ''
        })
      }
    }

    handleRestore()
  }, [filename, startRestore, status])

  const handleQRCodeScanned = (ip: string) => {
    setScannedIP(ip)
    connect(ip)
  }

  const handleModalClose = () => {
    closeModal()
    navigation.goBack()
  }

  return (
    <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={t('settings.data.landrop.scan_qr_code.title')} onBackPress={() => navigation.goBack()} />

      {!isModalOpen && !scannedIP && <QRCodeScanner onQRCodeScanned={handleQRCodeScanned} />}
      <RestoreProgressModal
        isOpen={isModalOpen}
        steps={restoreSteps}
        overallStatus={overallStatus}
        onClose={handleModalClose}
      />
    </SafeAreaContainer>
  )
}
