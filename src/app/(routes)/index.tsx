import { Link } from '@react-navigation/native'
import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Stack, Text, useTheme, View, YStack } from 'tamagui'

import { MessageInput } from '@/components/message-input'
import { TopEntry } from '@/components/top-entry'

const HomeScreen = () => {
  const theme = useTheme()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <YStack backgroundColor="$background" flex={1} onPress={Keyboard.dismiss}>
          {/* 顶部导航组件 */}
          <TopEntry />

          {/* 主要内容区域 */}
          <YStack flex={1} justifyContent="center" alignItems="center">
            <Link screen="Settings" params={{}}>
              <Stack>
                <Text color="$color12">Go to Settings</Text>
              </Stack>
            </Link>
          </YStack>

          {/* 底部输入框 */}
          <View
            left="$2"
            right="$2"
            paddingHorizontal={16}
            paddingVertical={12}
            backgroundColor="$gray2"
            borderRadius={9}>
            <MessageInput />
          </View>
        </YStack>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default HomeScreen
