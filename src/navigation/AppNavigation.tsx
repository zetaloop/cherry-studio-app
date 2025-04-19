import { createNativeStackNavigator } from '@react-navigation/native-stack'

import WelcomePage from '@/app/(routes)/welcome'
import HomeScreen from '@/app/(tabs)'
import { useAppSelector } from '@/store'

const Stack = createNativeStackNavigator()

export const AppNavigation: React.FC = () => {
  const welcomeShown = useAppSelector(state => state.app.welcomeShown)

  return (
    <Stack.Navigator>
      {!welcomeShown && <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomePage} />}
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}
