import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'

import { useWebSocket, WebSocketStatus } from '@/hooks/useWebSocket'
import { NavigationProps } from '@/types/naviagate'

import { DataTransfer } from './DataTransfer'
import { QRCodeScanner } from './QRCodeScanner'

export default function LandropSettingsScreen() {
  const navigation = useNavigation<NavigationProps>()
  const { status, progress, filename, connect } = useWebSocket()
  const [scannedIP, setScannedIP] = useState<string | null>(null)

  // 监听 WebSocket 状态变化，在断开连接时重置扫描状态
  useEffect(() => {
    if (status === WebSocketStatus.DISCONNECTED) {
      setScannedIP(null)
    }
  }, [status])

  const handleQRCodeScanned = (ip: string) => {
    setScannedIP(ip)
    connect(ip)
  }

  const handleBackPress = () => {
    navigation.goBack()
  }

  if (!scannedIP) {
    return <QRCodeScanner onQRCodeScanned={handleQRCodeScanned} onBackPress={handleBackPress} />
  }

  return (
    <DataTransfer
      status={status}
      ip={scannedIP}
      filename={filename}
      progress={progress}
      onBackPress={handleBackPress}
    />
  )
}
