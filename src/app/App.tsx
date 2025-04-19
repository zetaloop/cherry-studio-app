import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(routes)/home/index">
      <Stack.Screen name="(routes)/home/index" />
      <Stack.Screen name="(routes)/welcome/index" />
      <Stack.Screen name="(routes)/assistant/index" />
      <Stack.Screen name="(routes)/settings/index" />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}

export default App
