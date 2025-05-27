import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ChevronsRight, Eye, EyeOff, ShieldCheck } from '@tamagui/lucide-icons'
import { sortBy } from 'lodash'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Input, Stack, Text, useTheme, XStack, YStack } from 'tamagui'

import ExternalLink from '@/components/external-link'
import { SettingContainer, SettingGroupTitle, SettingHelpText } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { ModelSelect } from '@/components/settings/providers/modelSelect'
import { isEmbeddingModel } from '@/config/models/embedding'
import { useProvider } from '@/hooks/use-providers'
import { Model } from '@/types/agent'
import { NavigationProps, RootStackParamList } from '@/types/naviagate'
import { getModelUniqId } from '@/utils/model'

type ProviderSettingsRouteProp = RouteProp<RootStackParamList, 'ApiServicePage'>

// 常量定义
const BUTTON_HEIGHT = 60
const BUTTON_WIDTH = 224
const BUTTON_BORDER_RADIUS = 70

export default function ApiServicePage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation<NavigationProps>()
  const route = useRoute<ProviderSettingsRouteProp>()

  const [showApiKey, setShowApiKey] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model | undefined>()
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [apiHost, setApiHost] = useState('')

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['32%'], [])

  const { providerId } = route.params
  const { provider } = useProvider(providerId)

  const selectOptions = useMemo(() => {
    if (!provider?.models?.length) return []

    return [
      {
        label: provider.isSystem ? t(`provider.${provider.id}`) : provider.name,
        title: provider.name,
        options: sortBy(provider.models, 'name')
          .filter(model => !isEmbeddingModel(model))
          .map(model => ({
            label: model.name,
            value: getModelUniqId(model),
            model
          }))
      }
    ]
  }, [provider, t])

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand()
    setIsBottomSheetOpen(true)
  }, [])

  const handleBottomSheetClose = useCallback(() => {
    setIsBottomSheetOpen(false)
  }, [])

  const handleModelChange = useCallback(
    (value: string) => {
      if (!value) {
        setSelectedModel(undefined)
        return
      }

      const allOptions = selectOptions.flatMap(group => group.options)
      const foundOption = allOptions.find(opt => opt.value === value)
      setSelectedModel(foundOption?.model)
    },
    [selectOptions]
  )

  const toggleApiKeyVisibility = useCallback(() => {
    setShowApiKey(prevShowApiKey => !prevShowApiKey)
  }, [])

  const handleApiKeyChange = useCallback((text: string) => {
    setApiKey(text)
  }, [])

  const handleApiHostChange = useCallback((text: string) => {
    setApiHost(text)
  }, [])

  const handleBackPress = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  // 模型检测处理
  const handleStartModelCheck = useCallback(async () => {
    if (!selectedModel) return

    try {
      // TODO: 实现模型检测逻辑
      console.log('Starting model check for:', selectedModel, 'with API Key:', apiKey, 'and API Host:', apiHost)
    } catch (error) {
      console.error('Model check failed:', error)
    }
  }, [selectedModel, apiKey, apiHost])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.val
      }}>
      <HeaderBar title={t('settings.provider.api_service')} onBackPress={handleBackPress} />

      <SettingContainer>
        {/* API Key 配置 */}
        <YStack gap={8}>
          <XStack paddingHorizontal={10} height={20} justifyContent="space-between" alignItems="center">
            <SettingGroupTitle>{t('settings.provider.api_key')}</SettingGroupTitle>
            <Button
              size={16}
              icon={<ShieldCheck size={16} />}
              backgroundColor="$colorTransparent"
              circular
              onPress={handleOpenBottomSheet}
              disabled={isBottomSheetOpen}
            />
          </XStack>

          <XStack paddingVertical={8} gap={8} position="relative">
            <Input
              flex={1}
              placeholder={t('settings.provider.api_key.placeholder')}
              secureTextEntry={!showApiKey}
              paddingRight={48}
              editable={!isBottomSheetOpen}
              value={apiKey}
              onChangeText={handleApiKeyChange}
            />
            <Stack
              position="absolute"
              right={10}
              top="50%"
              height={16}
              width={16}
              alignItems="center"
              justifyContent="center"
              zIndex={1}
              onPress={toggleApiKeyVisibility}
              cursor="pointer">
              {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </Stack>
          </XStack>

          <XStack justifyContent="space-between">
            <SettingHelpText>{t('settings.provider.api_key.tip')}</SettingHelpText>
            <ExternalLink href="" size={12}>
              {t('settings.provider.api_key.get')}
            </ExternalLink>
          </XStack>
        </YStack>

        {/* API Host 配置 */}
        <YStack gap={8}>
          <XStack paddingHorizontal={10} height={20} alignItems="center">
            <SettingGroupTitle>{t('settings.provider.api_host')}</SettingGroupTitle>
          </XStack>
          <Input
            placeholder={t('settings.provider.api_host')}
            editable={!isBottomSheetOpen}
            value={apiHost}
            onChangeText={handleApiHostChange}
          />
        </YStack>
      </SettingContainer>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={handleBottomSheetClose}
        backgroundStyle={{
          backgroundColor: theme.gray2.val
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.color.val
        }}>
        <BottomSheetView style={{ flex: 1 }}>
          <YStack alignItems="center" paddingTop={10} paddingBottom={30} paddingHorizontal={20} gap={10}>
            <XStack width="100%" alignItems="center" justifyContent="center">
              <Text fontSize={24}>{t('settings.provider.api_check.title')}</Text>
            </XStack>

            <YStack width="100%" gap={5}>
              <Text>{t('settings.provider.api_check.tooltip')}</Text>
              <ModelSelect
                value={selectedModel ? getModelUniqId(selectedModel) : undefined}
                onValueChange={handleModelChange}
                selectOptions={selectOptions}
                placeholder={t('settings.models.empty')}
              />
            </YStack>

            <XStack width="100%" alignItems="center" justifyContent="center">
              <Button
                height={BUTTON_HEIGHT}
                width={BUTTON_WIDTH}
                borderRadius={BUTTON_BORDER_RADIUS}
                backgroundColor="$color1"
                disabled={!selectedModel || !apiKey} // apiKey 是否存在的判断
                onPress={handleStartModelCheck}>
                <XStack width="100%" alignItems="center" justifyContent="space-between">
                  <Text fontSize={18} fontWeight="bold">
                    {t('button.start_check_model')}
                  </Text>
                  <ChevronsRight />
                </XStack>
              </Button>
            </XStack>
          </YStack>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  )
}
