import { ChevronDown, RefreshCcw } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Accordion, Button, Input, ScrollView, Slider, Square, Text, TextArea, useTheme, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingGroup, SettingGroupTitle, SettingRow, SettingRowTitle } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { WebSearchSelect } from '@/components/settings/websearch/websearchSelect'
import { CustomSwitch } from '@/components/ui/switch'
import { SubscribeSource } from '@/types/websearch'

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

const blacklistSubscription: SubscribeSource[] = [{ key: 1, url: 'https://git.io/ublacklist', name: 'git.io' }]

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
      <HeaderBar title={t('settings.websearch.title')} />
      <ScrollView flex={1}>
        <SettingContainer>
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
            {/* Replace the existing blacklist section with the Accordion */}
            <Accordion type="single" collapsable width="100%">
              <Accordion.Item value="blacklist-subscription" marginBottom={8}>
                <Accordion.Trigger
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  paddingVertical={12}
                  paddingHorizontal={16}
                  backgroundColor="$gray2"
                  borderRadius={9}
                  borderBottomLeftRadius={0}
                  borderBottomRightRadius={0}>
                  {({ open }: { open: boolean }) => (
                    <>
                      <XStack gap={10} alignItems="center">
                        <Square animation="quick" rotate={open ? '0deg' : '-90deg'}>
                          <ChevronDown size={14} />
                        </Square>
                        <Text fontSize={14} fontWeight="bold">
                          {t('settings.websearch.subscribe.title')}
                        </Text>
                      </XStack>
                    </>
                  )}
                </Accordion.Trigger>
                <Accordion.HeightAnimator animation="quicker">
                  <Accordion.Content
                    exitStyle={{ opacity: 0 }}
                    backgroundColor="$gray1"
                    borderBottomLeftRadius={9}
                    borderBottomRightRadius={9}
                    borderTopWidth={1}
                    borderTopColor="$gray4"
                    width="100%"
                    paddingHorizontal={0}
                    overflow="hidden">
                    <YStack borderColor="white" width="100%" paddingVertical={8} gap={8} pointerEvents="box-none">
                      {blacklistSubscription.map(source => (
                        <SettingRow key={source.key}>
                          <Text>{source.name}</Text>
                          <XStack justifyContent="center" alignContent="center">
                            <Text>{source.url}</Text>
                            <Button
                              size={14}
                              backgroundColor="$colorTransparent"
                              icon={<RefreshCcw size={14} />}
                              pressStyle={{ opacity: 0.7 }}
                            />
                          </XStack>
                        </SettingRow>
                      ))}
                    </YStack>
                  </Accordion.Content>
                </Accordion.HeightAnimator>
              </Accordion.Item>
            </Accordion>
          </YStack>
        </SettingContainer>
      </ScrollView>
    </SafeAreaView>
  )
}
