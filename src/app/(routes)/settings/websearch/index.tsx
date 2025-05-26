import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, ScrollView, Slider, Text, TextArea, useTheme, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle, SettingRow, SettingRowTitle } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { WebSearchSelect } from '@/components/settings/websearch/websearchSelect'
import { CustomSwitch } from '@/components/ui/switch'

const selectOptions = [
  {
    label: 'Free Service Provider',
    options: [
      { label: 'Google', value: 'google' },
      { label: 'Bing', value: 'bing' },
      { label: 'Baidu', value: 'baidu' }
    ]
  },
  {
    label: 'API Service Provider',
    options: [
      { label: 'Tavily', value: 'tavily' },
      { label: 'Exa', value: 'exa' },
      { label: 'Searxng', value: 'searxng' }
    ]
  }
]

export default function WebSearchSettingsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const [selectedProvider, setSelectedProvider] = useState<string | undefined>(undefined)
  const [searchCount, setSearchCount] = useState<number>(6)
  const [contentLimit, setContentLimit] = useState<string>('2000')

  const onWebSearchChange = (value: string) => {
    setSelectedProvider(value)
    console.log('Selected web search provider:', value)
    // Add logic here to save the selected provider, e.g., to AsyncStorage or a backend
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <SettingContainer>
        <HeaderBar title={t('settings.websearch.title')} />
        <ScrollView>
          <YStack gap={24} flex={1}>
            <WebSearchSelect
              value={selectedProvider}
              onValueChange={val => {
                if (val) {
                  onWebSearchChange(val)
                }
              }}
              selectOptions={selectOptions}
              placeholder={t('settings.websearch.selectPlaceholder')}
            />

            <YStack gap={8} paddingVertical={8}>
              <SettingGroupTitle>{t('settings.general.title')}</SettingGroupTitle>
              <SettingGroup>
                <SettingRow>
                  <SettingRowTitle>{t('settings.websearch.searchWithDates')}</SettingRowTitle>
                  <CustomSwitch checked={true} />
                </SettingRow>
                <SettingRow>
                  <SettingRowTitle>{t('settings.websearch.overrideSearchService')}</SettingRowTitle>
                  <CustomSwitch checked={true} />
                </SettingRow>
                <SettingRow>
                  <YStack gap={10} flex={1}>
                    <XStack justifyContent="space-between">
                      <SettingRowTitle>{t('settings.websearch.searchCount')}</SettingRowTitle>
                      <SettingRowTitle>{searchCount}</SettingRowTitle>
                    </XStack>
                    <Slider
                      defaultValue={[searchCount]}
                      max={20}
                      step={1}
                      onValueChange={value => setSearchCount(value[0])}>
                      <Slider.Track>
                        <Slider.TrackActive backgroundColor="#00B96B" />
                      </Slider.Track>
                      <Slider.Thumb backgroundColor="#00B96B" borderWidth={0} size={16} index={0} circular />
                    </Slider>
                  </YStack>
                </SettingRow>
                <SettingRow>
                  <SettingRowTitle>{t('settings.websearch.contentLengthLimit')}</SettingRowTitle>
                  <Input
                    height={21}
                    minWidth={52}
                    paddingVertical={2}
                    value={contentLimit}
                    onChangeText={setContentLimit}
                  />
                </SettingRow>
              </SettingGroup>
            </YStack>

            <YStack gap={8} paddingVertical={8}>
              <SettingGroupTitle>{t('settings.websearch.blacklist.title')}</SettingGroupTitle>
              <SettingGroup>
                <TextArea
                  numberOfLines={7}
                  backgroundColor="$colorTransparent"
                  borderWidth={0}
                  placeholder={t('settings.websearch.blacklist_placeholder')}
                />
              </SettingGroup>
              <Text fontSize={12} opacity={0.5}>
                {t('settings.websearch.blacklist_description')}
              </Text>
            </YStack>
          </YStack>
        </ScrollView>
      </SettingContainer>
    </SafeAreaView>
  )
}
