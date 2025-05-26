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

import AppStackWithPersist from '@/app/(routes)/_layout'
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
        name="Main" // 您可以根据需要命名，例如 "Main" 或 "HomeStack"
        options={{
          headerShown: false,
          drawerItemStyle: {
            display: 'none' // 如果不希望这个主导航栈在抽屉菜单中显示为一个可选项
          }
        }}
        component={AppStackWithPersist} // 使用 _layout.tsx 中导出的导航器
      />
    </Drawer.Navigator>
  )
}
