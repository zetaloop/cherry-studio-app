import 'react-native-reanimated'
import '@/i18n'

import { DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native'
import { TamaguiProvider } from '@tamagui/core'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import * as SplashScreen from 'expo-splash-screen'
import { SQLiteProvider } from 'expo-sqlite'
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

import { DATABASE_NAME, db, expoDb } from '../db'
import { removeAllBlocks } from '../db/queries/messageBlocks.queries'
import { removeAllMessages } from '../db/queries/messages.queries'
import migrations from '../drizzle/migrations'
import tamaguiConfig from '../tamagui.config'
import AppNavigator from './navigators/AppNavigator'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function App() {
  const colorScheme = useColorScheme()
  const { success, error } = useMigrations(db, migrations)

  useEffect(() => {
    const handleMigrations = async () => {
      if (success) {
        console.log('Migrations completed successfully', expoDb.databasePath)
        await removeAllMessages()
        await removeAllBlocks()
      } else if (error) {
        console.error('Migrations failed', error)
      }
    }

    handleMigrations()
  }, [success, error])

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <SQLiteProvider databaseName={DATABASE_NAME} options={{ enableChangeListener: true }} useSuspense>
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
        </SQLiteProvider>
      </Suspense>
    </GestureHandlerRootView>
  )
}
