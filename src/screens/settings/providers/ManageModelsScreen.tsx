import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list'
import { Minus, Plus } from '@tamagui/lucide-icons'
import { debounce, groupBy, isEmpty, uniqBy } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { Accordion, Button, ScrollView, Tabs, Text, useTheme, YStack } from 'tamagui'

import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { ModelGroup } from '@/components/settings/providers/ModelGroup'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { SearchInput } from '@/components/ui/SearchInput'
import { groupQwenModels, isFreeModel } from '@/config/models'
import { isEmbeddingModel } from '@/config/models/embedding'
import { isFunctionCallingModel } from '@/config/models/functionCalling'
import { isReasoningModel } from '@/config/models/reasoning'
import { isRerankModel } from '@/config/models/rerank'
import { isVisionModel } from '@/config/models/vision'
import { isWebSearchModel } from '@/config/models/webSearch'
import { fetchModels } from '@/services/ApiService'
import { getProviderById, saveProvider } from '@/services/ProviderService'
import { Model, Provider } from '@/types/assistant'
import { RootStackParamList } from '@/types/naviagate'
import { runAsyncFunction } from '@/utils'
import { getDefaultGroupName } from '@/utils/naming'

type ProviderSettingsRouteProp = RouteProp<RootStackParamList, 'ManageModelsScreen'>

// Check if the model exists in the provider's model list
const getIsModelInProvider = (providerModels: Model[]) => {
  const providerModelIds = new Set(providerModels.map(m => m.id))
  return (modelId: string): boolean => providerModelIds.has(modelId)
}

const getIsAllInProvider = (isModelInProviderFunc: (modelId: string) => boolean) => {
  return (models: Model[]): boolean => models.every(model => isModelInProviderFunc(model.id))
}

export default function ManageModelsScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute<ProviderSettingsRouteProp>()

  const [searchText, setSearchText] = useState('')
  const [debouncedSearchText, setDebouncedSearchText] = useState('')
  const [listModels, setListModels] = useState<Model[]>([])
  const [actualFilterType, setActualFilterType] = useState<string>('all')
  const [provider, setProvider] = useState<Provider | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { providerId } = route.params

  const isModelInCurrentProvider = useMemo(() => getIsModelInProvider(provider?.models || []), [provider])
  const isAllModelsInCurrentProvider = useMemo(
    () => getIsAllInProvider(isModelInCurrentProvider),
    [isModelInCurrentProvider]
  )

  // Debounce search text
  const debouncedSetSearchText = useMemo(() => debounce(setDebouncedSearchText, 300), [])

  useEffect(() => {
    debouncedSetSearchText(searchText)

    return () => {
      debouncedSetSearchText.cancel()
    }
  }, [searchText, debouncedSetSearchText])

  const allModels = useMemo(() => {
    return uniqBy(listModels, 'id')
  }, [listModels])

  const list = useMemo(() => {
    return allModels.filter(model => {
      if (
        debouncedSearchText &&
        !model.id.toLocaleLowerCase().includes(debouncedSearchText.toLocaleLowerCase()) &&
        !model.name?.toLocaleLowerCase().includes(debouncedSearchText.toLocaleLowerCase())
      ) {
        return false
      }

      switch (actualFilterType) {
        case 'reasoning':
          return isReasoningModel(model)
        case 'vision':
          return isVisionModel(model)
        case 'websearch':
          return isWebSearchModel(model)
        case 'free':
          return isFreeModel(model)
        case 'embedding':
          return isEmbeddingModel(model)
        case 'function_calling':
          return isFunctionCallingModel(model)
        case 'rerank':
          return isRerankModel(model)
        default:
          return true
      }
    })
  }, [allModels, debouncedSearchText, actualFilterType])

  const modelGroups = useMemo(
    () =>
      provider?.id === 'dashscope'
        ? {
            ...groupBy(
              list.filter(model => !model.id.startsWith('qwen')),
              'group'
            ),
            ...groupQwenModels(list.filter(model => model.id.startsWith('qwen')))
          }
        : groupBy(list, 'group'),
    [list, provider?.id]
  )

  const sortedModelGroups = useMemo(() => {
    return Object.entries(modelGroups).sort(([a], [b]) => a.localeCompare(b))
  }, [modelGroups])

  const tabConfigs = [
    { value: 'all', label: t('models.type.all') },
    { value: 'reasoning', label: t('models.type.reasoning') },
    { value: 'vision', label: t('models.type.vision') },
    { value: 'websearch', label: t('models.type.websearch') },
    { value: 'free', label: t('models.type.free') },
    { value: 'embedding', label: t('models.type.embedding') },
    { value: 'rerank', label: t('models.type.rerank') },
    { value: 'function_calling', label: t('models.type.function_calling') }
  ]

  // 添加通用 tab 样式函数
  const getTabStyle = (tabValue: string) => ({
    height: '100%',
    backgroundColor: actualFilterType === tabValue ? '$background' : 'transparent',
    borderRadius: 15
  })
  const onAddModel = useCallback(
    (model: Model) => {
      if (!provider) return
      const updatedProvider = {
        ...provider,
        models: uniqBy([...provider.models, model], 'id')
      }
      setProvider(updatedProvider)
      runAsyncFunction(async () => saveProvider(updatedProvider))
    },
    [provider]
  )

  const onRemoveModel = useCallback(
    (model: Model) => {
      if (!provider) return
      const updatedProvider = {
        ...provider,
        models: provider.models.filter(m => m.id !== model.id)
      }
      setProvider(updatedProvider)
      runAsyncFunction(async () => saveProvider(updatedProvider))
    },
    [provider]
  )

  const onAddAllModels = useCallback(
    (modelsToAdd: Model[]) => {
      if (!provider) return
      const updatedProvider = {
        ...provider,
        models: uniqBy([...provider.models, ...modelsToAdd], 'id')
      }
      setProvider(updatedProvider)
      runAsyncFunction(async () => saveProvider(updatedProvider))
    },
    [provider]
  )

  const onRemoveAllModels = useCallback(
    (modelsToRemove: Model[]) => {
      if (!provider) return
      const modelsToRemoveIds = new Set(modelsToRemove.map(m => m.id))
      const updatedProvider = {
        ...provider,
        models: provider.models.filter(m => !modelsToRemoveIds.has(m.id))
      }
      setProvider(updatedProvider)
      runAsyncFunction(async () => saveProvider(updatedProvider))
    },
    [provider]
  )

  useEffect(() => {
    setIsLoading(true)
    runAsyncFunction(async () => {
      try {
        const p = await getProviderById(providerId)
        setProvider(p)
        const models = await fetchModels(p)
        setListModels(
          models
            .map(model => ({
              // @ts-ignore modelId
              id: model?.id || model?.name,
              // @ts-ignore name
              name: model?.display_name || model?.displayName || model?.name || model?.id,
              provider: p.id,
              // @ts-ignore group
              group: getDefaultGroupName(model?.id || model?.name, p.id),
              // @ts-ignore description
              description: model?.description || '',
              // @ts-ignore owned_by
              owned_by: model?.owned_by || ''
            }))
            .filter(model => !isEmpty(model.name))
        )
      } catch (error) {
        console.error('Failed to fetch models', error)
      } finally {
        setIsLoading(false)
      }
    })
  }, [providerId])

  const renderModelGroupItem = useCallback(
    ({ item: [groupName, currentModels], index }: ListRenderItemInfo<[string, Model[]]>) => (
      <ModelGroup
        groupName={groupName}
        models={currentModels}
        index={index}
        showModelCount={true}
        renderGroupButton={groupButtonModels => (
          <Button
            size={20}
            chromeless
            icon={
              isAllModelsInCurrentProvider(groupButtonModels) ? (
                <Minus size={14} borderRadius={99} backgroundColor="$backgroundRed" color="$foregroundRed" />
              ) : (
                <Plus size={14} borderRadius={99} backgroundColor="$backgroundGreen" color="$foregroundGreen" />
              )
            }
            onPress={
              isAllModelsInCurrentProvider(groupButtonModels)
                ? () => onRemoveAllModels(groupButtonModels)
                : () => onAddAllModels(groupButtonModels)
            }
          />
        )}
        renderModelButton={model => (
          <Button
            size={14}
            chromeless
            icon={
              isModelInCurrentProvider(model.id) ? (
                <Minus size={14} borderRadius={99} backgroundColor="$backgroundRed" color="$foregroundRed" />
              ) : (
                <Plus size={14} borderRadius={99} backgroundColor="$backgroundGreen" color="$foregroundGreen" />
              )
            }
            onPress={isModelInCurrentProvider(model.id) ? () => onRemoveModel(model) : () => onAddModel(model)}
          />
        )}
      />
    ),
    [
      isAllModelsInCurrentProvider,
      isModelInCurrentProvider,
      onAddAllModels,
      onAddModel,
      onRemoveAllModels,
      onRemoveModel
    ]
  )

  return (
    <SafeAreaContainer
      style={{
        flex: 1,
        backgroundColor: theme.background.val
      }}>
      <HeaderBar title={provider?.name || t('settings.models.manage_models')} onBackPress={() => navigation.goBack()} />
      <SettingContainer>
        {/* Filter Tabs */}
        <Tabs
          defaultValue="all"
          value={actualFilterType}
          onValueChange={setActualFilterType}
          orientation="horizontal"
          flexDirection="column"
          height={34}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Tabs.List aria-label="Model filter tabs" gap="10" flexDirection="row">
              {tabConfigs.map(({ value, label }) => (
                <Tabs.Tab key={value} value={value} {...getTabStyle(value)}>
                  <Text>{label}</Text>
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </ScrollView>
        </Tabs>

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
          <YStack flex={1} gap={24}>
            {/* Search Card */}
            <SearchInput placeholder={t('settings.models.search')} value={searchText} onChangeText={setSearchText} />

            {/* Model List Card with Accordion */}
            {isLoading ? (
              <YStack flex={1} justifyContent="center" alignItems="center">
                <ActivityIndicator />
              </YStack>
            ) : (
              <YStack flex={1}>
                {sortedModelGroups.length > 0 ? (
                  <Accordion overflow="hidden" type="multiple">
                    <FlashList
                      data={sortedModelGroups}
                      renderItem={renderModelGroupItem}
                      keyExtractor={([groupName]) => groupName}
                      estimatedItemSize={60}
                      extraData={provider}
                    />
                  </Accordion>
                ) : (
                  <Text textAlign="center" color="$gray10" paddingVertical={24}>
                    {searchText ? t('settings.models.no_results') : t('models.no_models')}
                  </Text>
                )}
              </YStack>
            )}
          </YStack>
        </ScrollView>
      </SettingContainer>
    </SafeAreaContainer>
  )
}
