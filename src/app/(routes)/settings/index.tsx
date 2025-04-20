import { useNavigation } from '@react-navigation/native'
import { Bot, ChevronRight, Cloud, Database, Info, Monitor, Search, Settings } from '@tamagui/lucide-icons'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, XStack, YStack } from 'tamagui'

export default function SettingsPage() {
  const { t } = useTranslation()

  const settingsItems: {
    title: string
    items: {
      title: string
      details: string
      screen: string
      icon: React.ReactNode
    }[]
  }[] = [
    {
      title: 'AI模型与服务',
      items: [
        {
          title: t('settings.provider.title'),
          screen: 'ProvidersSettings',
          details: '配置AI模型服务器和参数',
          icon: <Cloud size={24} />
        },
        {
          title: t('settings.model'),
          screen: 'ModelSettings',
          details: '选择默认使用的AI模型',
          icon: <Bot size={24} />
        },
        {
          title: t('settings.websearch.title'),
          screen: 'WebSearchSettings',
          details: '网络搜索引擎设置与权限',
          icon: <Search size={24} />
        }
      ]
    },
    {
      title: '界面与交互',
      items: [
        {
          title: t('settings.general.title'),
          screen: 'GeneralSettings',
          details: '应用语言、主题、启动设置等',
          icon: <Settings size={24} />
        },
        {
          title: t('settings.display.title'),
          screen: 'DisplaySettings',
          details: '字体、字号、界面样式等',
          icon: <Monitor size={24} />
        }
      ]
    },
    {
      title: '数据与安全',
      items: [
        {
          title: t('settings.data.title'),
          screen: 'DataSettings',
          details: '数据备份、WebDAV、Obsidian配置',
          icon: <Database size={24} />
        },
        {
          title: t('settings.about.title'),
          screen: 'AboutSettings',
          details: '版本信息与法律声明',
          icon: <Info size={24} />
        }
      ]
    }
  ]

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <YStack padding="$4" gap={4} flex={1}>
          <Text fontSize="$6" fontWeight="bold">
            {t('settings.title')}
          </Text>

          <YStack gap={24} flex={1} marginTop={16}>
            {settingsItems.map(group => (
              <SettingGroup key={group.title} title={group.title}>
                {group.items.map(item => (
                  <SettingItem
                    key={item.title}
                    title={item.title}
                    details={item.details}
                    screen={item.screen}
                    icon={item.icon}
                  />
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
    <YStack gap={12}>
      <Text fontSize="$4" fontWeight="bold" opacity={0.7}>
        {title}
      </Text>
      {children}
    </YStack>
  )
}

function SettingItem({
  title,
  details,
  screen,
  icon
}: {
  title: string
  details: string
  screen: string
  icon: React.ReactNode
}) {
  const navigation = useNavigation()
  return (
    <XStack
      height={70}
      backgroundColor="$background"
      padding="$4"
      borderRadius="$4"
      justifyContent="space-between"
      alignItems="center"
      pressStyle={{ opacity: 0.8 }}
      hoverStyle={{ backgroundColor: '#2A2A2A' }}
      // @ts-expect-error navigate type mismatch
      onPress={() => navigation.navigate(screen)}>
      <XStack alignItems="center" gap={12}>
        {icon}
        <YStack gap={4}>
          <Text fontSize="$5">{title}</Text>
          <Text fontSize="$2" color="#aaa">
            {details}
          </Text>
        </YStack>
      </XStack>
      <ChevronRight size={20} color="#aaa" />
    </XStack>
  )
}
