import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ChevronDown, ChevronRight, HeartPulse, Plus, Settings, Settings2 } from '@tamagui/lucide-icons'
import { groupBy } from 'lodash'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Accordion, Button, ScrollView, Separator, Square, Text, useTheme, XStack, YStack } from 'tamagui'

import { HeaderBar } from '@/components/settings/headerBar'
import { ModelIcon } from '@/components/ui/modelIcon'
import { ModelTags } from '@/components/ui/modelTags'
import { SearchInput } from '@/components/ui/searchInput'
import { CustomSwitch } from '@/components/ui/switch'
import { useProvider } from '@/hooks/use-providers'
import { RootStackParamList } from '@/types/naviagate'

type ProviderSettingsRouteProp = RouteProp<RootStackParamList, 'ProviderSettingsPage'>

export default function ProviderSettingsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute<ProviderSettingsRouteProp>()
  const [searchText, setSearchText] = useState('')

  const { providerId } = route.params
  const { provider, updateProvider } = useProvider(providerId)

  // 根据搜索文本过滤和分组模型
  const modelGroups = useMemo(() => {
    const filteredModels = searchText
      ? provider.models.filter(model => model.name.toLowerCase().includes(searchText.toLowerCase()))
      : provider.models
    return groupBy(filteredModels, 'group')
  }, [searchText, provider.models])

  // 对分组进行排序
  const sortedModelGroups = useMemo(() => {
    const entries = Object.entries(modelGroups)
    return entries.sort(([a], [b]) => a.localeCompare(b))
  }, [modelGroups])

  // 默认展开前6个分组
  const defaultOpenGroups = useMemo(() => {
    return sortedModelGroups.slice(0, 6).map((_, index) => `item-${index}`)
  }, [sortedModelGroups])

  const onAddModel = () => {
    // 添加模型逻辑
  }

  const onManageModel = () => {
    // 管理模型逻辑
  }

  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={{
        flex: 1,
        backgroundColor: theme.background.val
      }}>
      <YStack backgroundColor="$background" flex={1} gap={24} padding="$4">
        <HeaderBar
          title={provider.name}
          onBackPress={() => navigation.goBack()}
          rightButtons={[
            {
              icon: <Settings2 size={24} />,
              onPress: onManageModel
            },
            {
              icon: <Plus size={24} />,
              onPress: onAddModel
            }
          ]}
        />

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <YStack flex={1} gap={24}>
            {/* Manage Card */}
            <YStack gap={8}>
              <Text>{t('common.manage')}</Text>
              <YStack gap={8} backgroundColor="$gray2" borderRadius={8} paddingVertical={8}>
                <XStack paddingVertical={12} paddingHorizontal={16} justifyContent="space-between" alignItems="center">
                  <Text>{t('common.enabled')}</Text>
                  <CustomSwitch
                    checked={provider.enabled}
                    onCheckedChange={checked => updateProvider({ ...provider, enabled: checked })}
                  />
                </XStack>
                <XStack paddingVertical={12} paddingHorizontal={16} justifyContent="space-between" alignItems="center">
                  <Text>{t('settings.provider.api_service')}</Text>
                  <XStack>
                    {provider.enabled && (
                      <Text
                        paddingVertical={2}
                        paddingHorizontal={8}
                        borderRadius={8}
                        backgroundColor="$gray4"
                        fontWeight="bold"
                        fontSize={14}>
                        {t('settings.provider.enabled')}
                      </Text>
                    )}
                    <ChevronRight color="$white9" width={6} height={12} />
                  </XStack>
                </XStack>
              </YStack>
            </YStack>

            <Separator />

            {/* Search Card */}
            <SearchInput placeholder={t('settings.models.search')} value={searchText} onChangeText={setSearchText} />

            {/* Model List Card with Accordion */}
            <YStack flex={1}>
              <XStack justifyContent="space-between" alignItems="center" marginBottom={16}>
                <Text>{t('settings.models.title')}</Text>
                <Button size={14} chromeless icon={<HeartPulse size={14} />} />
              </XStack>

              {sortedModelGroups.length > 0 ? (
                <Accordion overflow="hidden" type="multiple" defaultValue={defaultOpenGroups}>
                  {sortedModelGroups.map(([groupName, models], index) => (
                    <Accordion.Item key={groupName} value={`item-${index}`} marginBottom={8}>
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
                            <Text fontSize={14} fontWeight="bold">
                              {groupName}
                            </Text>
                            <Square animation="quick" rotate={open ? '0deg' : '-90deg'}>
                              <ChevronDown size={14} />
                            </Square>
                          </>
                        )}
                      </Accordion.Trigger>

                      <Accordion.HeightAnimator animation="quick">
                        <Accordion.Content
                          exitStyle={{ opacity: 0 }}
                          backgroundColor="$gray1"
                          borderBottomLeftRadius={9}
                          borderBottomRightRadius={9}
                          borderTopWidth={1}
                          borderTopColor="$gray4">
                          <YStack flex={1} width="100%">
                            {models.map(model => (
                              <XStack
                                key={model.id}
                                alignItems="center"
                                justifyContent="space-between"
                                // paddingVertical={6}
                                paddingHorizontal={8}
                                width="100%">
                                <XStack gap={8} flex={1} maxWidth="80%">
                                  {/* icon */}
                                  <XStack justifyContent="center" alignItems="center" flexShrink={0}>
                                    <ModelIcon model={model} />
                                  </XStack>
                                  {/* name and tool */}
                                  <YStack gap={5} flex={1} minWidth={0}>
                                    <Text numberOfLines={1} ellipsizeMode="tail">
                                      {model.name}
                                    </Text>
                                    <ModelTags model={model} size={11} style={{ flexShrink: 0 }} />
                                  </YStack>
                                </XStack>
                                <XStack flexShrink={0} marginLeft={8}>
                                  <Button size={14} chromeless icon={<Settings size={14} />} />
                                </XStack>
                              </XStack>
                            ))}
                          </YStack>
                        </Accordion.Content>
                      </Accordion.HeightAnimator>
                    </Accordion.Item>
                  ))}
                </Accordion>
              ) : (
                <Text textAlign="center" color="$gray10" paddingVertical={24}>
                  {searchText ? t('settings.models.no_results') : t('settings.models.no_models')}
                </Text>
              )}
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  )
}
