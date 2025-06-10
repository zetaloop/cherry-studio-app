import 'react-native-reanimated'
import '@/i18n'

import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { TamaguiProvider } from '@tamagui/core'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { Suspense } from 'react'
import { useEffect } from 'react'
import React from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PortalProvider } from 'tamagui'

import AppNavigator from '@/navigation/AppNavigation'
import store from '@/store'

// import migrations from '../../drizzle/migrations'
import tamaguiConfig from '../../tamagui.config'

export const DATABASE_NAME = 'test'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()

  // const expoDb = openDatabaseSync(DATABASE_NAME)
  // const db = drizzle(expoDb)
  // const { success, error } = useMigrations(db, migrations)
  const screenWidth = Dimensions.get('window').width

  // useEffect(() => {
  //   if (success) {
  //     console.log('Migrations completed successfully')
  //   } else if (error) {
  //     console.error('Migrations failed', error)
  //   }
  // }, [success, error])

  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        {/* <SQLiteProvider databaseName={DATABASE_NAME} options={{ enableChangeListener: true }} useSuspense> */}
        <Provider store={store}>
          <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme ?? 'light'}>
            <PortalProvider>
              <ThemeProvider value={DefaultTheme}>
                <AppNavigator />
                <StatusBar style="auto" />
              </ThemeProvider>
            </PortalProvider>
          </TamaguiProvider>
        </Provider>
        {/* </SQLiteProvider> */}
      </Suspense>
    </GestureHandlerRootView>
  )
}
