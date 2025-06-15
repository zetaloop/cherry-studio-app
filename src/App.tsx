import 'react-native-reanimated'
import '@/i18n'

import { DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native'
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
import { PersistGate } from 'redux-persist/integration/react'
import { PortalProvider } from 'tamagui'

import store, { persistor } from '@/store'

import tamaguiConfig from '../tamagui.config'
import AppNavigator from './navigators/AppNavigator'

// import migrations from '../../drizzle/migrations'

export const DATABASE_NAME = 'test'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function App() {
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
