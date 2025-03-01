import 'react-native-reanimated'

import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { TamaguiProvider } from '@tamagui/core'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PortalProvider } from 'tamagui'

import store from '@/store'

import tamaguiConfig from '../../tamagui.config'
import App from './App'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <Provider store={store}>
      <TamaguiProvider config={tamaguiConfig}>
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
