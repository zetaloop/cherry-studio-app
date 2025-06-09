import { DrawerContentComponentProps, DrawerItemList } from '@react-navigation/drawer'
import { Settings } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Button, Text, XStack, YStack } from 'tamagui'

import { MenuTabContent } from '@/components/menu/menuTabContent'

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation()

  const handleTopicSeeAll = () => {
    props.navigation.navigate('Main', { screen: 'TopicPage' })
    console.log('Navigate to all topics')
  }

  return (
    <YStack flex={1} backgroundColor="transparent">
      <YStack gap={10} flex={1}>
        <YStack paddingHorizontal={20} paddingTop={50} paddingBottom={10}>
          <DrawerItemList {...props} />
        </YStack>

        <YStack backgroundColor="$background" padding="$2" flex={1}>
          <MenuTabContent
            searchPlaceholder={t('common.search_placeholder')}
            title={t('menu.topic.recent')}
            onSeeAllPress={handleTopicSeeAll}>
            {/* 这里可以添加topic特有的列表内容 */}
          </MenuTabContent>
        </YStack>
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
