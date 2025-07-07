import { File, Paths } from 'expo-file-system/next'
import * as Network from 'expo-network'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { io, Socket } from 'socket.io-client'

// 定义 WebSocket 连接状态的枚举
export enum WebSocketStatus {
  IDLE = 'idle',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECEIVING = 'receiving',
  DISCONNECTED = 'disconnected',
  ERROR = 'error'
}

// 定义 Hook 返回的状态和方法
interface WebSocketState {
  status: WebSocketStatus
  progress: number
  receivedFilename: string
  error?: string
}

interface WebSocketActions {
  connect: () => void
}

// 初始状态
const initialState: WebSocketState = {
  status: WebSocketStatus.IDLE,
  progress: 0,
  receivedFilename: '',
  error: undefined
}

interface UseWebSocketReturn {
  state: WebSocketState
  actions: WebSocketActions
}

export function useWebSocket(): UseWebSocketReturn {
  const { t } = useTranslation()
  const [state, setState] = useState<WebSocketState>(initialState)
  const [connectAttempt, setConnectAttempt] = useState(0)

  const socketRef = useRef<Socket | null>(null)
  const fileChunksRef = useRef<Uint8Array[]>([])
  const totalSizeRef = useRef(0)
  const receivedSizeRef = useRef(0)
  const receivedFilenameRef = useRef('')
  const lastProgressUpdateRef = useRef(0)

  const resetFileTransferState = () => {
    setState(prev => ({
      ...prev,
      status: prev.status === WebSocketStatus.RECEIVING ? WebSocketStatus.CONNECTED : prev.status,
      progress: 0,
      receivedFilename: ''
    }))
    fileChunksRef.current = []
    totalSizeRef.current = 0
    receivedSizeRef.current = 0
    receivedFilenameRef.current = ''
  }

  const handleConnectionError = (message: string, error?: any) => {
    if (error) console.error(message, error)
    Alert.alert(t('settings.data.landrop.error'), message)
    setState(prev => ({ ...prev, status: WebSocketStatus.ERROR, error: message }))
    resetFileTransferState()
  }

  useEffect(() => {
    if (connectAttempt === 0) return

    let isMounted = true
    let socket: Socket

    const connectSocket = async () => {
      setState({ ...initialState, status: WebSocketStatus.CONNECTING })

      if (socketRef.current) {
        socketRef.current.disconnect()
      }

      try {
        const ip = await Network.getIpAddressAsync()
        socket = io(`http://${ip}:3000`, { timeout: 5000, reconnection: false })
        socketRef.current = socket

        // --- Event Listeners ---
        socket.on('connect', () => {
          if (!isMounted) return
          console.log('Socket connected')
          socket.emit('message', 'This is from iPhone')
          // 状态保持 CONNECTING 直到服务器确认
        })

        socket.on('message_received', data => {
          if (!isMounted) return
          console.log('Message received by server:', data)

          if (data.success) {
            setState(prev => ({ ...prev, status: WebSocketStatus.CONNECTED, error: undefined }))
          } else {
            handleConnectionError(t('settings.data.landrop.messageNotReceived'))
          }
        })

        socket.on('zip-file-start', data => {
          if (!isMounted) return
          console.log('File transfer started:', data)
          resetFileTransferState()
          receivedFilenameRef.current = data.filename
          totalSizeRef.current = data.totalSize
          setState(prev => ({
            ...prev,
            status: WebSocketStatus.RECEIVING,
            receivedFilename: data.filename
          }))
        })

        // todo: progress 无法实时更新
        socket.on('zip-file-chunk', (chunk: ArrayBuffer) => {
          if (!isMounted) return
          const chunkData = new Uint8Array(chunk)
          fileChunksRef.current.push(chunkData)
          receivedSizeRef.current += chunkData.length
          const newProgress = Math.min((receivedSizeRef.current / totalSizeRef.current) * 100, 100)

          const now = Date.now()

          if (now - lastProgressUpdateRef.current > 100) {
            lastProgressUpdateRef.current = now
            setState(prev => ({ ...prev, progress: newProgress }))
            console.log('newProgress', newProgress)
          }
        })

        socket.on('zip-file-end', async () => {
          if (!isMounted) return
          console.log('File transfer finished.')
          setState(prev => ({ ...prev, progress: 100 }))

          try {
            const totalLength = fileChunksRef.current.reduce((acc, val) => acc + val.length, 0)
            const content = new Uint8Array(totalLength)
            let offset = 0

            for (const chunk of fileChunksRef.current) {
              content.set(chunk, offset)
              offset += chunk.length
            }

            const file = new File(Paths.cache, receivedFilenameRef.current)
            if (file.exists) file.delete()
            file.write(content)

            console.log('File saved:', file.uri)
            Alert.alert(
              t('settings.data.landrop.fileReceived'),
              `${t('settings.data.landrop.fileSaved')}: ${receivedFilenameRef.current}`
            )
          } catch (error) {
            console.error('Error saving file:', error)
            Alert.alert(t('settings.data.landrop.error'), t('settings.data.landrop.fileSaveError'))
          } finally {
            setTimeout(() => {
              if (isMounted) {
                resetFileTransferState()
                setState(prev => ({ ...prev, status: WebSocketStatus.CONNECTED }))
              }
            }, 1000)
          }
        })

        socket.on('connect_error', error => {
          if (!isMounted) return
          handleConnectionError(t('settings.data.landrop.connectionFailed'), error)
        })

        socket.on('disconnect', () => {
          if (!isMounted) return
          console.log('Socket disconnected')
          setState({ ...initialState, status: WebSocketStatus.DISCONNECTED })
          resetFileTransferState()
        })
      } catch (error) {
        if (!isMounted) return
        handleConnectionError(t('settings.data.landrop.unexpectedError'), error)
      }
    }

    connectSocket()

    return () => {
      isMounted = false

      if (socketRef.current) {
        console.log('Disconnecting socket from cleanup.')
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
  }, [connectAttempt, t, handleConnectionError, resetFileTransferState])

  const connect = () => {
    setConnectAttempt(prev => prev + 1)
  }

  return { state, actions: { connect } }
}
