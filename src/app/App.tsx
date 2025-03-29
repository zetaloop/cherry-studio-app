import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'

const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(routes)/welcome/index" />
      <Stack.Screen name="+not-found" />
    </Stack>
  )
}

export default App
