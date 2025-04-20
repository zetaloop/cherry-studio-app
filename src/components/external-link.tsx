import * as ExpoLinking from 'expo-linking' // 使用 Expo 的 Linking
import React from 'react'
import { Alert, OpaqueColorValue } from 'react-native'
import { Button, GetThemeValueForKey, Text } from 'tamagui'

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  color?: 'unset' | GetThemeValueForKey<'color'> | OpaqueColorValue
  onError?: (error: Error) => void
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children, color = '$blue10', onError }) => {
  const handlePress = async () => {
    const supported = await ExpoLinking.canOpenURL(href)

    if (supported) {
      try {
        await ExpoLinking.openURL(href)
      } catch (error) {
        const message = `无法打开链接: ${error instanceof Error ? error.message : String(error)}`
        console.error(message, error)

        if (onError) {
          onError(error instanceof Error ? error : new Error(String(error)))
        } else {
          Alert.alert('打开链接出错', message)
        }
      }
    } else {
      const message = `您的设备无法处理此链接: ${href}`
      console.warn(message)

      if (onError) {
        onError(new Error(message))
      } else {
        Alert.alert('无法打开链接', message)
      }
    }
  }

  const content = typeof children === 'string' ? <Text color={color}>{children}</Text> : children

  return <Button onPress={handlePress}>{content}</Button>
}

export default ExternalLink
