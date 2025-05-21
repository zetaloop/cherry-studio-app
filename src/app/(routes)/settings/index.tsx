import { useNavigation } from '@react-navigation/native'
import { ArrowLeft, ChevronRight, Cloud, Globe, HardDrive, Info, Package, Settings } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ScrollView, Text, XStack, YStack } from 'tamagui'

export default function SettingsPage() {
  const { t } = useTranslation()
  const navigation = useNavigation()

  const settingsItems: {
    title: string
    items: {
      title: string
      screen: string
      icon: React.ReactNode
    }[]
  }[] = [
    {
      title: t('settings.modelAndService'),
      items: [
        {
          title: t('settings.provider.title'),
          screen: 'ProvidersSettings',
          icon: <Cloud size={24} />
        },
        {
          title: t('settings.model'),
          screen: 'ModelSettings',
          icon: <Package size={24} />
        },
        {
          title: t('settings.websearch.title'),
          screen: 'WebSearchSettings',
          icon: <Globe size={24} />
        }
      ]
    },
    {
      title: t('settings.title'),
      items: [
        {
          title: t('settings.general.title'),
          screen: 'GeneralSettings',
          icon: <Settings size={24} />
        },
        {
          title: t('settings.data.title'),
          screen: 'DataSettings',
          icon: <HardDrive size={24} />
        }
      ]
    },
    {
      title: t('settings.dataAndSecurity'),
      items: [
        {
          title: t('settings.about.title'),
          screen: 'AboutSettings',
          icon: <Info size={24} />
        }
      ]
    }
  ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <YStack padding="$4" gap={4} flex={1}>
          <XStack justifyContent="space-between" alignItems="center">
            <Button size="$2" circular icon={<ArrowLeft size={18} />} onPress={() => navigation.goBack()} />
            <Text fontSize="$6" fontWeight="bold">
              {t('settings.title')}
            </Text>
            <XStack width={44} />
          </XStack>

          <YStack gap={24} flex={1} marginTop={16}>
            {settingsItems.map(group => (
              <SettingGroup key={group.title} title={group.title}>
                {group.items.map(item => (
                  <SettingItem key={item.title} title={item.title} screen={item.screen} icon={item.icon} />
                ))}
              </SettingGroup>
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

function SettingGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <YStack gap={8}>
      <Text fontSize="$4" fontWeight="bold" opacity={0.7}>
        {title}
      </Text>
      <YStack backgroundColor="$background" gap={8} paddingVertical={12} borderRadius={9}>
        {children}
      </YStack>
    </YStack>
  )
}

function SettingItem({ title, screen, icon }: { title: string; screen: string; icon: React.ReactNode }) {
  const navigation = useNavigation()
  return (
    <XStack
      height={44}
      backgroundColor="$background"
      paddingHorizontal={16}
      paddingVertical={12}
      borderRadius={9}
      justifyContent="space-between"
      alignItems="center"
      pressStyle={{ opacity: 0.8 }}
      hoverStyle={{ backgroundColor: '#2A2A2A' }}
      // @ts-expect-error navigate type mismatch
      onPress={() => navigation.navigate(screen)}>
      <XStack alignItems="center" gap={12}>
        {icon}
        <YStack gap={16}>
          <Text fontSize="$5">{title}</Text>
        </YStack>
      </XStack>
      <ChevronRight size={24} color="#aaa" />
    </XStack>
  )
}
