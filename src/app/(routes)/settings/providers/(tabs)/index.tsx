import { Search, Star } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ListItem, ScrollView, YGroup, YStack } from 'tamagui'

import { Input } from '@/components/ui/input'
import { useWidth } from '@/hooks/use-width'

const mock_providers = [{ href: 'open-ai', label: 'openAI' }]

export default function ProviderSettingsPage() {
  const { t } = useTranslation()

  const isLargeScreen = useWidth(768)

  return (
    <SafeAreaView
      style={{
        padding: 16
      }}>
      <Input placeholder={t('settings.provider.search')} size="$4" borderWidth={2} icon={<Search />} />
      <YStack>
        <ScrollView>
          <YGroup marginVertical={16} alignSelf="center" bordered size="$4">
            {mock_providers.map(provider => (
              <YGroup.Item key={provider.href}>
                <Link href={`/settings/providers/open-ai`} asChild>
                  <ListItem hoverTheme icon={Star} title={provider.label} />
                </Link>
              </YGroup.Item>
            ))}
          </YGroup>
        </ScrollView>
      </YStack>
      <Button variant="outlined">+添加</Button>
    </SafeAreaView>
  )
}
