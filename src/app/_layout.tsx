import 'react-native-reanimated'
import '@/i18n'

import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { TamaguiProvider } from '@tamagui/core'
import { drizzle } from 'drizzle-orm/expo-sqlite'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import * as SplashScreen from 'expo-splash-screen'
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite'
import { StatusBar } from 'expo-status-bar'
import { Suspense } from 'react'
import { useEffect } from 'react'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { useColorScheme } from 'react-native'
import { Provider } from 'react-redux'
import { PortalProvider } from 'tamagui'

import store from '@/store'

import migrations from '../../drizzle/migrations'
import tamaguiConfig from '../../tamagui.config'
import App from './App'

export const DATABASE_NAME = 'test'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const expoDb = openDatabaseSync(DATABASE_NAME)
  const db = drizzle(expoDb)
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
    <Suspense fallback={<ActivityIndicator size="large" />}>
      <SQLiteProvider databaseName={DATABASE_NAME} options={{ enableChangeListener: true }} useSuspense>
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
      </SQLiteProvider>
    </Suspense>
  )
}
