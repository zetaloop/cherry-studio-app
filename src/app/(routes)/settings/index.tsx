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
            {t('settings.title')}
          </Text>

          <YStack gap={4} flex={1} marginTop={16}>
            <SettingItem title={t('settings.provider.title')} href="/settings/providers" />
            <SettingItem title={t('settings.model')} href="/settings/model" />
            <SettingItem title={t('settings.websearch.title')} href="/settings/websearch-settings" />
            <SettingItem title={t('settings.general.title')} href="/settings/general-settings" />
            <SettingItem title={t('settings.display.title')} href="/settings/display" />
            <SettingItem title={t('settings.data.title')} href="/settings/data" />
            <SettingItem title={t('settings.about.title')} href="/settings/about-settings" />
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}

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
