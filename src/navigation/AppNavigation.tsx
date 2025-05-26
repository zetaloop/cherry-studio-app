import 'react-native-reanimated'
import '@/i18n'

import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions } from 'react-native'
import { useTheme } from 'tamagui'

import HomeScreen from '@/app/(routes)'
import { SearchInput } from '@/components/ui/searchInput'

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation()
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: 'transparent',
        padding: 20
      }}>
      <DrawerItemList {...props} />
      <SearchInput placeholder={t('menu.search_placeholder')} />
    </DrawerContentScrollView>
  )
}

export default function AppNavigator() {
  const theme = useTheme()
  const screenWidth = Dimensions.get('window').width

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          width: screenWidth * 0.7,
          backgroundColor: theme.background.val // Use Tamagui theme background
        }
      }}>
      <Drawer.Screen
        name="Home"
        options={{
          headerShown: false,
          drawerItemStyle: {
            display: 'none'
          }
        }}
        component={HomeScreen}
      />
    </Drawer.Navigator>
  )
}
