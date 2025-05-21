import 'react-native-reanimated'
import '@/i18n'

import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { TamaguiProvider } from '@tamagui/core'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import React from 'react'
import { useColorScheme } from 'react-native'
import { Provider } from 'react-redux'
import { PortalProvider } from 'tamagui'

import store from '@/store'

import tamaguiConfig from '../../tamagui.config'
import App from './App'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <Provider store={store}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme ?? 'light'}>
        <PortalProvider>
          <ThemeProvider value={DefaultTheme}>
            <App />
            <StatusBar style="auto" />
          </ThemeProvider>
        </PortalProvider>
      </TamaguiProvider>
    </Provider>
  )
}
