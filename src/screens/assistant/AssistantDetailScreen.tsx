import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftRight, PenLine } from '@tamagui/lucide-icons'
import { debounce } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button, styled, Tabs, Text, useTheme, XStack, YStack } from 'tamagui'

import { ModelTabContent } from '@/components/assistant/ModelTabContent'
import { PromptTabContent } from '@/components/assistant/PromptTabContent'
import { ToolTabContent } from '@/components/assistant/ToolTabContent'
import { DefaultProviderIcon } from '@/components/icons/DefaultProviderIcon'
import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/HeaderBar'
import { AvatarEditButton } from '@/components/ui/AvatarEditButton'
import SafeAreaContainer from '@/components/ui/SafeAreaContainer'
import { getAssistantById, getDefaultAssistant, saveAssistant } from '@/services/AssistantService'
import { Assistant } from '@/types/assistant'
import { RootStackParamList } from '@/types/naviagate'
import { runAsyncFunction } from '@/utils'

type AssistantDetailRouteProp = RouteProp<RootStackParamList, 'AssistantDetailScreen'>

export default function AssistantDetailScreen() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute<AssistantDetailRouteProp>()

  const { assistantId, mode } = route.params
  const [activeTab, setActiveTab] = useState('model')
  const [localAssistant, setLocalAssistant] = useState<Assistant | null>(null)
  const isInitialMount = useRef(true)

  const debouncedSave = useMemo(
    () =>
      debounce((assistant: Assistant) => {
        runAsyncFunction(async () => {
          await saveAssistant(assistant)
        })
      }, 500),
    []
  )

  useEffect(() => {
    runAsyncFunction(async () => {
      if (assistantId) {
        const assistant = await getAssistantById(assistantId)
        setLocalAssistant(assistant)
      } else if (mode === 'create') {
        setLocalAssistant(await getDefaultAssistant())
      }
    })
  }, [assistantId, mode])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (mode === 'edit' && localAssistant) {
      debouncedSave(localAssistant)
    }
  }, [localAssistant, mode, debouncedSave])

  const onSaveAssistant = async () => {
    if (!localAssistant) {
      console.error('No assistant to save')
      return
    }

    await saveAssistant(localAssistant)
  }

  return (
    <SafeAreaContainer>
      <HeaderBar
        title={mode === 'create' ? t('assistants.title.create') : t('assistants.title.edit')}
        onBackPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled">
        <SettingContainer>
          <XStack justifyContent="center" alignItems="center">
            <AvatarEditButton
              content={localAssistant?.emoji || <DefaultProviderIcon />}
              editIcon={localAssistant?.emoji ? <ArrowLeftRight size={24} /> : <PenLine size={24} />}
              onEditPress={() => {
                // 处理编辑逻辑
                console.log('Edit avatar')
              }}
              onAvatarPress={() => {
                // 处理头像点击逻辑（可选）
                console.log('Avatar pressed')
              }}
            />
          </XStack>
          {/* todo: change active tabs style */}
          <Tabs value={activeTab} onValueChange={setActiveTab} orientation="horizontal" flexDirection="column" flex={1}>
            <Tabs.List
              backgroundColor="$background"
              borderRadius="20"
              gap={5}
              paddingVertical={4}
              paddingHorizontal={5}>
              <StyledTab value="prompt">
                <Text fontSize="12">{t('common.prompt')}</Text>
              </StyledTab>
              <StyledTab value="model">
                <Text fontSize="12">{t('common.model')}</Text>
              </StyledTab>
              <StyledTab value="tool">
                <Text fontSize="12">{t('common.tool')}</Text>
              </StyledTab>
            </Tabs.List>
            <YStack flex={1} paddingTop={30}>
              <Tabs.Content value="prompt" flex={1} gap={30}>
                <PromptTabContent assistant={localAssistant} />
              </Tabs.Content>

              <Tabs.Content value="model" flex={1} gap={30}>
                <ModelTabContent assistant={localAssistant} setAssistant={setLocalAssistant} />
              </Tabs.Content>

              <Tabs.Content value="tool" flex={1} gap={30}>
                <ToolTabContent assistant={localAssistant} />
              </Tabs.Content>
            </YStack>
          </Tabs>
          {mode === 'create' && (
            <XStack paddingHorizontal={25} width="100%" justifyContent="center" alignItems="center">
              <Button backgroundColor="$foregroundGreen" width="100%" borderRadius={48} onPress={onSaveAssistant}>
                {t(`assistants.${mode === 'create' ? 'create' : 'save'}`)}
              </Button>
            </XStack>
          )}
        </SettingContainer>
      </KeyboardAwareScrollView>
    </SafeAreaContainer>
  )
}

const StyledTab = styled(Tabs.Tab, {
  flex: 1,
  backgroundColor: '$background',
  borderRadius: 20,
  paddingVertical: 8,
  paddingHorizontal: 20
})
