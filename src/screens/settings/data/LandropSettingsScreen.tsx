import { useNavigation } from '@react-navigation/native'
import { File, Paths } from 'expo-file-system/next'
import * as Network from 'expo-network'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { io, Socket } from 'socket.io-client'
import { Button, Spinner, Text, useTheme, YStack } from 'tamagui'

import { HeaderBar } from '@/components/settings/HeaderBar'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { NavigationProps } from '@/types/naviagate'

export default function LandropSettingsScreen() {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const { t } = useTranslation()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef<Socket | null>(null)

  const onPress = async () => {
    try {
      setIsConnecting(true)
      setIsConnected(false)

      // 如果已有连接，先断开
      if (socketRef.current) {
        socketRef.current.disconnect()
      }

      const ip = await Network.getIpAddressAsync()

      // 创建新连接
      const socket = io(`http://${ip}:3000`, {
        timeout: 5000, // 5秒连接超时
        reconnection: false // 不自动重连
      })

      socketRef.current = socket

      // 监听连接成功
      socket.on('connect', () => {
        console.log('Socket connected')
        socket.emit('message', 'This is from iPhone')
        setIsConnecting(false)
      })

      // 监听服务端消息接收确认
      socket.on('message_received', data => {
        console.log('Message received by server:', data)

        if (!data.success) {
          Alert.alert(t('settings.data.landrop.error'), t('settings.data.landrop.messageNotReceived'))
          setIsConnected(false)
        }

        setIsConnected(true)
      })

      // 在 zip-file 事件监听器中
      socket.on('zip-file', async data => {
        try {
          const { filename, data: fileBuffer } = data

          const file = new File(Paths.cache, filename)
          const content = fileBuffer instanceof Uint8Array ? fileBuffer : new Uint8Array(fileBuffer)

          file.write(content)

          console.log('File saved:', file.uri)
          Alert.alert(t('settings.data.landrop.fileReceived'), `${t('settings.data.landrop.fileSaved')}: ${filename}`)
        } catch (error) {
          console.error('Error saving file:', error)
          Alert.alert(t('settings.data.landrop.error'), t('settings.data.landrop.fileSaveError'))
        }
      })

      // 监听连接错误
      socket.on('connect_error', error => {
        console.error('Socket connection error:', error)
        Alert.alert(t('settings.data.landrop.error'), t('settings.data.landrop.connectionFailed'))
        setIsConnecting(false)
        setIsConnected(false)
      })

      // 监听断开连接
      socket.on('disconnect', () => {
        console.log('Socket disconnected')
        setIsConnecting(false)
        setIsConnected(false)
      })
    } catch (error) {
      console.error('Error sending message:', error)
      Alert.alert(t('settings.data.landrop.error'), t('settings.data.landrop.unexpectedError'))
      setIsConnecting(false)
      setIsConnected(false)
    }
  }

  // 组件卸载时清理连接
  React.useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [])

  return (
    <SafeAreaContainer style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title={t('settings.data.landrop.title')} onBackPress={() => navigation.goBack()} />
      <YStack padding="$4">
        {isConnected && (
          <Text color="$green10" textAlign="center" fontSize="$5">
            {t('settings.data.landrop.connected')}
          </Text>
        )}
        <Button onPress={onPress} disabled={isConnecting} icon={isConnecting ? <Spinner /> : undefined}>
          {isConnecting ? t('settings.data.landrop.connecting') : t('settings.data.landrop.button')}
        </Button>
      </YStack>
    </SafeAreaContainer>
  )
}
