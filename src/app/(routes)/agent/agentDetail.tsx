import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftRight, PenLine } from '@tamagui/lucide-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Input, styled, Tabs, Text, TextArea, useTheme, XStack, YStack } from 'tamagui'

import { SettingContainer, SettingRowTitle } from '@/components/settings'
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
  const [activeTab, setActiveTab] = useState('prompt')
  const [isEditing, setIsEditing] = useState(false)

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
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
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
                <YStack width="100%" gap={8}>
                  <SettingRowTitle paddingHorizontal={10}>{t('common.name')}</SettingRowTitle>
                  <Input padding={15} placeholder={t('agents.name')} value={agent?.name} />
                </YStack>
                <YStack width="100%" gap={8} flex={1}>
                  <SettingRowTitle paddingHorizontal={10}>{t('common.prompt')}</SettingRowTitle>
                  <TextArea
                    flex={1}
                    padding={15}
                    placeholder={t('common.prompt')}
                    value={agent?.prompt}
                    editable={isEditing}
                    onFocus={() => setIsEditing(true)}
                    onBlur={() => setIsEditing(false)}
                    onPress={() => setIsEditing(true)}
                    multiline
                  />
                </YStack>
              </Tabs.Content>

              <Tabs.Content value="model" flex={1}>
                <YStack flex={1} padding="$4">
                  <Text fontSize="$4" fontWeight="$6" marginBottom="$2">
                    Model Configuration
                  </Text>
                  <Text color="$gray10">Select and configure the AI model for your agent.</Text>
                </YStack>
              </Tabs.Content>

              <Tabs.Content value="preset" flex={1}>
                <YStack flex={1} padding="$4">
                  <Text fontSize="$4" fontWeight="$6" marginBottom="$2">
                    Preset Management
                  </Text>
                  <Text color="$gray10">Manage and apply presets for quick configuration.</Text>
                </YStack>
              </Tabs.Content>

              <Tabs.Content value="tool" flex={1}>
                <YStack flex={1} padding="$4">
                  <Text fontSize="$4" fontWeight="$6" marginBottom="$2">
                    Knowledge Base
                  </Text>
                  <Text color="$gray10">Upload and manage tool documents for your agent.</Text>
                </YStack>
              </Tabs.Content>
            </YStack>
          </Tabs>
          <XStack paddingHorizontal={25} width="100%" justifyContent="center" alignItems="center">
            <Button backgroundColor="$foregroundGreen" width="100%" borderRadius={48}>
              {t(`agents.${mode === 'create' ? 'create' : 'save'}`)}
            </Button>
          </XStack>
        </SettingContainer>
      </KeyboardAvoidingView>
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
