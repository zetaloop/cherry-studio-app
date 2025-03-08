import { ChevronRight } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, Text, XStack, YStack } from 'tamagui'

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <YStack padding="$4" gap={4} flex={1}>
          <Text fontSize="$6" fontWeight="bold">
            设置
          </Text>

          {/* <SettingItem title="模型服务" href="" /> */}
          {/* <SettingItem title="默认模型" href="" /> */}
          {/* <SettingItem title="网络搜索" href="" /> */}
          <SettingItem title={t('settings.general.title')} href="/settings/general-settings" />
          {/* <SettingItem title="显示设置" href="" /> */}
          {/* <SettingItem title="快捷方式" href="" /> */}
          {/* <SettingItem title="快捷助手" href="" /> */}
          {/* <SettingItem title="数据设置" href="" /> */}
          {/* <SettingItem title="关于我们" href="" /> */}
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

// 设置项组件
function SettingItem({ title, href }: { title: string; href: ComponentProps<typeof Link>['href'] }) {
  return (
    <Link href={href} asChild>
      <XStack
        backgroundColor="$background"
        padding="$4"
        borderRadius="$4"
        justifyContent="space-between"
        alignItems="center"
        pressStyle={{ opacity: 0.8 }}
        hoverStyle={{ backgroundColor: '$backgroundHover' }}>
        <Text fontSize="$4">{title}</Text>
        <ChevronRight size={20} />
      </XStack>
    </Link>
  )
}
