import 'react-native-reanimated'
import '@/i18n'

import { DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native'
import { TamaguiProvider } from '@tamagui/core'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import * as SplashScreen from 'expo-splash-screen'
import { openDatabaseSync } from 'expo-sqlite'
import { StatusBar } from 'expo-status-bar'
import { Suspense } from 'react'
import { useEffect } from 'react'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { PortalProvider } from 'tamagui'

import store, { persistor } from '@/store'

import migrations from '../drizzle/migrations'
import tamaguiConfig from '../tamagui.config'
import AppNavigator from './navigators/AppNavigator'

export const DATABASE_NAME = 'message_blocks_test.db'
export const expoDb = openDatabaseSync(DATABASE_NAME)
export const db = drizzle(expoDb)
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function App() {
  const colorScheme = useColorScheme()

  const { success, error } = useMigrations(db, migrations)

  useEffect(() => {
    if (success) {
      console.log('Migrations completed successfully')
    } else if (error) {
      console.error('Migrations failed', error)
    }
  }, [success, error])

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme ?? 'light'}>
              <PortalProvider>
                <NavigationContainer theme={DefaultTheme}>
                  <ThemeProvider value={DefaultTheme}>
                    <AppNavigator />
                    <StatusBar style="auto" />
                  </ThemeProvider>
                </NavigationContainer>
              </PortalProvider>
            </TamaguiProvider>
          </PersistGate>
        </Provider>
      </Suspense>
    </GestureHandlerRootView>
  )
}
