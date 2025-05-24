import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ChevronRight, HeartPulse, Plus, Settings, Settings2 } from '@tamagui/lucide-icons'
import { debounce, groupBy } from 'lodash'
import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Accordion, Button, ScrollView, Separator, Text, useTheme, XStack, YStack } from 'tamagui'

import { HeaderBar } from '@/components/settings/headerBar'
import { ModelGroup } from '@/components/settings/providers/modelGroup'
import { SearchInput } from '@/components/ui/searchInput'
import { CustomSwitch } from '@/components/ui/switch'
import { useProvider } from '@/hooks/use-providers'
import { Model } from '@/types/agent'
import { NavigationProps, RootStackParamList } from '@/types/naviagate'

type ProviderSettingsRouteProp = RouteProp<RootStackParamList, 'ProviderSettingsPage'>

export default function ProviderSettingsPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const route = useRoute<ProviderSettingsRouteProp>()
  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('') // Add debounced search text

  const { providerId } = route.params
  const { provider } = useProvider(providerId)

  // Debounce search text
  const debouncedSetSearchText = useMemo(() => debounce(setDebouncedSearchText, 300), [])

  React.useEffect(() => {
    debouncedSetSearchText(searchText)

    return () => {
      debouncedSetSearchText.cancel()
    }
  }, [searchText, debouncedSetSearchText])

  // 根据搜索文本过滤和分组模型
  const modelGroups = useMemo(() => {
    const filteredModels = debouncedSearchText // Use debouncedSearchText
      ? provider.models.filter(model => model.name.toLowerCase().includes(debouncedSearchText.toLowerCase()))
      : provider.models
    return groupBy(filteredModels, 'group')
  }, [debouncedSearchText, provider.models]) // Use debouncedSearchText

  // 对分组进行排序
  const sortedModelGroups = useMemo(() => {
    return Object.entries(modelGroups).sort(([a], [b]) => a.localeCompare(b))
  }, [modelGroups])

  // 默认展开前6个分组
  const defaultOpenGroups = useMemo(() => {
    return sortedModelGroups.slice(0, 6).map((_, index) => `item-${index}`)
  }, [sortedModelGroups])

  const onAddModel = useCallback(() => {
    // 添加模型逻辑
    console.log('[ProviderSettingsPage] onAddModel')
  }, [])

  const onManageModel = useCallback(() => {
    // 管理模型逻辑
    navigation.navigate('ManageModelsPage', { providerId })
  }, [navigation, providerId])

  const onSettingModel = useCallback((model: Model) => {
    console.log('[ProviderSettingsPage] onSettingModel', model)
  }, [])

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
                    // onCheckedChange={checked => updateProvider({ ...provider, enabled: checked })}
                  />
                </XStack>
                <XStack paddingVertical={12} paddingHorizontal={16} justifyContent="space-between" alignItems="center">
                  <Text>{t('settings.provider.api_service')}</Text>
                  <XStack>
                    {provider.checked && (
                      <Text
                        paddingVertical={2}
                        paddingHorizontal={8}
                        borderRadius={8}
                        backgroundColor="$gray4"
                        fontWeight="bold"
                        fontSize={14}>
                        {t('settings.provider.checked')}
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
                  {sortedModelGroups.map(
                    (
                      [groupName, modelsInGroup],
                      index // Renamed models to modelsInGroup to avoid conflict
                    ) => (
                      <ModelGroup
                        key={groupName}
                        groupName={groupName}
                        models={modelsInGroup} // Use modelsInGroup
                        index={index}
                        renderModelButton={(
                          model: Model // Wrap with useCallback
                        ) => (
                          <Button
                            size={14}
                            chromeless
                            icon={<Settings size={14} />}
                            onPress={() => onSettingModel(model)}
                          />
                        )} // Add onSettingModel to dependency array
                      />
                    )
                  )}
                </Accordion>
              ) : (
                <Text textAlign="center" color="$gray10" paddingVertical={24}>
                  {searchText ? t('settings.models.no_results') : t('models.no_models')}
                </Text>
              )}
            </YStack>
          </YStack>
        </ScrollView>
      </YStack>
    </SafeAreaView>
  )
}
