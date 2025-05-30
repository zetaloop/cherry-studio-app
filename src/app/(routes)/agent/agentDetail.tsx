import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftRight, PenLine } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ScrollView, styled, Tabs, Text, useTheme, XStack, YStack } from 'tamagui'

import { ModelTabContent } from '@/components/agent/modelTabContent'
import { PresetTabContent } from '@/components/agent/presetTabContent'
import { PromptTabContent } from '@/components/agent/promptTabContent'
import { ToolTabContent } from '@/components/agent/toolTabContent'
import { SettingContainer } from '@/components/settings'
import { HeaderBar } from '@/components/settings/headerBar'
import { AvatarEditButton } from '@/components/ui/avatarEditButton'
import { DefaultProviderIcon } from '@/components/ui/svgIcons'
import { useAgent } from '@/hooks/use-agent'
import { RootStackParamList } from '@/types/naviagate'

type AgentDetailRouteProp = RouteProp<RootStackParamList, 'AgentDetailPage'>

export default function AgentDetailPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()
  const route = useRoute<AgentDetailRouteProp>()

  const { agentId, mode } = route.params
  const { agent } = useAgent(agentId)
  const [activeTab, setActiveTab] = useState('model')

  const onAddTopic = () => {
    // Navigate to the topic creation page or open a modal
    console.log('Navigate to add topic page')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <HeaderBar
        title={mode === 'create' ? t('agents.title.create') : t('agents.title.edit')}
        onBackPress={() => navigation.goBack()}
      />
      {/* todo KeyboardAvoidingView bug */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <SettingContainer>
          <XStack justifyContent="center" alignItems="center">
            <AvatarEditButton
              content={agent?.emoji || <DefaultProviderIcon />}
              editIcon={agent?.emoji ? <ArrowLeftRight size={24} /> : <PenLine size={24} />}
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
              <StyledTab value="preset">
                <Text fontSize="12">{t('common.preset')}</Text>
              </StyledTab>
              <StyledTab value="tool">
                <Text fontSize="12">{t('common.tool')}</Text>
              </StyledTab>
            </Tabs.List>
            <YStack flex={1} paddingTop={30}>
              <Tabs.Content value="prompt" flex={1} gap={30}>
                <PromptTabContent agent={agent} />
              </Tabs.Content>

              <Tabs.Content value="model" flex={1} gap={30}>
                <ModelTabContent agent={agent} />
              </Tabs.Content>

              <Tabs.Content value="preset" flex={1} gap={30}>
                <PresetTabContent agent={agent} />
              </Tabs.Content>

              <Tabs.Content value="tool" flex={1} gap={30}>
                <ToolTabContent agent={agent} />
              </Tabs.Content>
            </YStack>
          </Tabs>
          <XStack paddingHorizontal={25} width="100%" justifyContent="center" alignItems="center">
            <Button backgroundColor="$foregroundGreen" width="100%" borderRadius={48}>
              {t(`agents.${mode === 'create' ? 'create' : 'save'}`)}
            </Button>
          </XStack>
        </SettingContainer>
      </ScrollView>
    </SafeAreaView>
  )
}

const StyledTab = styled(Tabs.Tab, {
  flex: 1,
  backgroundColor: '$background',
  borderRadius: 20,
  paddingVertical: 8,
  paddingHorizontal: 20
})
