import { SplashScreen } from 'expo-router'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { AppNavigation } from '@/navigation/AppNavigation'
import { persistor } from '@/store'

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigation></AppNavigation>
      </PersistGate>
    </Provider>
  )
}

export default App
