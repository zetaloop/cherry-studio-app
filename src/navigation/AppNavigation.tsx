import 'react-native-reanimated'
import '@/i18n'

import { createDrawerNavigator, DrawerContentComponentProps, DrawerItemList } from '@react-navigation/drawer'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import { Settings, Star } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions } from 'react-native'
import { Avatar, Button, ScrollView, Text, useTheme, XStack, YStack } from 'tamagui'

import AppStackWithPersist from '@/app/(routes)/_layout'
import { SettingDivider } from '@/components/settings'
import { SearchInput } from '@/components/ui/searchInput'

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation()

  return (
    <YStack flex={1} backgroundColor="transparent">
      <YStack gap={10} flex={1}>
        <YStack paddingHorizontal={20} paddingTop={50} paddingBottom={10}>
          <DrawerItemList {...props} />
          <SearchInput placeholder={t('menu.search_placeholder')} />
        </YStack>

        <SettingDivider />

        <ScrollView
          flex={1}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 20,
            gap: 20
          }}>
          <YStack>
            <XStack justifyContent="space-between" alignItems="center">
              <XStack gap={5} alignItems="center">
                <Star size={16} />
                <Text>{t('menu.recent_topics')}</Text>
              </XStack>
              <Button chromeless size="$1" padding={0} pressStyle={{ opacity: 0.7 }}>
                <Text fontSize={10} color="$foregroundGreen">
                  {t('menu.see_all')}
                </Text>
              </Button>
            </XStack>
            {/* topics 将会放在这里 */}
            {/* 示例内容，你可以替换为你的 topics 列表 */}
            {/* 例如:
          <Text>Topic 1</Text>
          <Text>Topic 2</Text>
          ... 更多 topics 来测试滚动 ...
          */}
          </YStack>
        </ScrollView>
      </YStack>

      <XStack paddingHorizontal={20} paddingBottom={40} justifyContent="space-between" alignItems="center">
        <XStack gap={10} alignItems="center">
          <Avatar circular size={48}>
            <Avatar.Image accessibilityLabel="Cam" src={require('@/assets/images/favicon.png')} />
            <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
          </Avatar>
          <Text>{t('common.cherry_studio')}</Text>
        </XStack>
        <Button
          icon={<Settings size={24} />}
          chromeless
          onPress={() => {
            props.navigation.navigate('Main', { screen: 'Settings' })
            props.navigation.closeDrawer()
          }}
        />
      </XStack>
    </YStack>
  )
}

export default function AppNavigator() {
  const theme = useTheme()
  const screenWidth = Dimensions.get('window').width

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({ route }) => {
        const focusedNestedRouteName = getFocusedRouteNameFromRoute(route)

        const swipeEnabled = focusedNestedRouteName === 'Home'
        return {
          drawerStyle: {
            width: screenWidth * 0.7,
            backgroundColor: theme.background.val
          },
          swipeEnabled: swipeEnabled
        }
      }}>
      <Drawer.Screen
        name="Main"
        options={{
          headerShown: false,
          drawerItemStyle: {
            display: 'none'
          }
        }}
        component={AppStackWithPersist} // 使用 _layout.tsx 中导出的导航器
      />
    </Drawer.Navigator>
  )
}
