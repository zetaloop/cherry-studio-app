import { Book, BookMarked, BookOpenCheck, ChevronRight, Globe, HardDrive, NotebookPen } from '@tamagui/lucide-icons'
import { useNavigation } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, useTheme, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle, SettingRow } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { NavigationProps } from '@/types/naviagate'

interface SettingItemConfig {
  title: string
  screen: string
  icon: React.ReactElement
}

interface SettingGroupConfig {
  title: string
  items: SettingItemConfig[]
}

export default function DataSettingsPage() {
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()

  const settingsItems: SettingGroupConfig[] = [
    {
      title: ' ',
      items: [
        {
          title: 'Basic Data Settings',
          screen: 'BasicDataSettings',
          icon: <HardDrive size={24} />
        }
      ]
    },
    {
      title: 'Cloud Backup Settings',
      items: [
        {
          title: 'WebDAV',
          screen: 'webdav',
          icon: <Globe size={24} />
        },
        {
          title: 'Nutstore Configuration',
          screen: 'nutstore',
          icon: <BookOpenCheck size={24} />
        }
      ]
    },
    {
      title: 'Third-party Connections',
      items: [
        {
          title: 'Notion',
          screen: 'notion',
          icon: <BookMarked size={24} />
        },
        {
          title: 'Yuque',
          screen: 'yuque',
          icon: <Book size={24} />
        },
        {
          title: 'Joplin',
          screen: 'joplin',
          icon: <NotebookPen size={24} />
        }
      ]
    }
  ]

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar title="Data Settings" onBackPress={() => navigation.goBack()} />

      <ScrollView flex={1} backgroundColor="$background">
        <SettingContainer>
          <YStack gap={24} flex={1}>
            {settingsItems.map(group => (
              <Group key={group.title} title={group.title}>
                {group.items.map(item => (
                  <SettingItem key={item.title} title={item.title} screen={item.screen} icon={item.icon} />
                ))}
              </Group>
            ))}
          </YStack>
        </SettingContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <YStack gap={8}>
      {title.trim() !== '' && <SettingGroupTitle>{title}</SettingGroupTitle>}
      <SettingGroup>{children}</SettingGroup>
    </YStack>
  )
}

function SettingItem({ title, screen, icon }: SettingItemProps) {
  const navigation = useNavigation<NavigationProps>()
  return (
    <SettingRow onPress={() => navigation.navigate(screen as any)}>
      <XStack alignItems="center" gap={12}>
        {icon}
        <Text fontSize="$5">{title}</Text>
      </XStack>
      <ChevronRight size={24} color="$colorFocus" />
    </SettingRow>
  )
}

interface SettingItemProps {
  title: string
  screen: string
  icon: React.ReactElement
}
