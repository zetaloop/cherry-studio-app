import { Eye, EyeOff, Plus, Settings } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Input, ScrollView, Text, XStack, YStack } from 'tamagui'
import { View } from 'tamagui'

import ExternalLink from '@/components/external-link'
import { ProviderGroup } from '@/components/settings/providers'

export default function OpenAIProviderPage() {
  const { t } = useTranslation()
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiUrl, setApiUrl] = useState('https://api.openai.com')
  const [selectedModel, setSelectedModel] = useState('gpt-4o')

  const gpt_models = [
    { name: 'GPT-4o', value: 'gpt-4o' },
    { name: 'GPT-4o-mini', value: 'gpt-4o-mini' }
  ]

  const o1_models = [
    { name: 'o1-mini', value: 'o1-mini' },
    { name: 'o1-preview', value: 'o1-preview' }
  ]

  const handleSave = () => {
    console.log('保存设置', { apiKey, apiUrl, selectedModel })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <YStack gap={24} flex={1}>
          <Text fontSize="$6" fontWeight="bold">
            OpenAI 设置
          </Text>

          <YStack gap={8}>
            <Text fontSize="$4" fontWeight="bold">
              {t('settings.provider.api_key')}
            </Text>
            <XStack alignItems="center" gap={8}>
              <Input
                flex={1}
                value={apiKey}
                onChangeText={setApiKey}
                placeholder={t('settings.provider.api_key')}
                secureTextEntry={!showApiKey}
              />
              <Button
                size="$3"
                circular
                icon={showApiKey ? <EyeOff size={18} /> : <Eye size={18} />}
                onPress={() => setShowApiKey(!showApiKey)}
              />
            </XStack>
            <Text fontSize="$2" color="$gray10">
              点击管理获取密钥
            </Text>
          </YStack>

          <YStack gap={8}>
            <Text fontSize="$4" fontWeight="bold">
              {t('settings.provider.api_host')}
            </Text>
            <XStack borderWidth="$0.5" borderColor="$gray5" borderRadius="$4" overflow="hidden">
              <Input
                borderWidth={0}
                borderRightWidth="$1"
                borderRadius={0}
                flexGrow={1}
                value={apiUrl}
                onChangeText={setApiUrl}
                placeholder={t('settings.provider.api_host')}
              />
              <Button borderRadius={0}>检查</Button>
            </XStack>
            <Text fontSize="$2" color="$gray10">
              /v1/chat/completions 将自动添加到用户输入地址
            </Text>
          </YStack>

          <YStack gap={8}>
            <Text fontSize="$4" fontWeight="bold">
              {t('common.model')}
            </Text>

            <ProviderGroup
              models={gpt_models}
              group_name="GPT-4o"
              icon={<View width={24} height={24} borderRadius={12} backgroundColor="$purple5" />}
            />
            <ProviderGroup
              models={o1_models}
              group_name="o1"
              icon={<View width={24} height={24} borderRadius={12} backgroundColor="$yellow5" />}
            />
          </YStack>

          <Text fontSize="$2" color="$gray10">
            查看
            <ExternalLink href={'https://platform.openai.com/docs'}>OpenAI 文档</ExternalLink>和
            <ExternalLink href={'https://platform.openai.com/docs/models'}>模型</ExternalLink>
            了解更多信息
          </Text>

          <XStack gap={24} marginTop="$4">
            <Button flex={1} icon={<Settings />} variant="outlined">
              {t('button.manage')}
            </Button>
            <Button flex={1} theme="active" icon={<Plus />} onPress={handleSave}>
              {t('button.add')}
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  )
}
