import { CircleMinus, Eye, EyeOff, Plus, Settings } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Input, ScrollView, Separator, Text, View, XStack, YStack } from 'tamagui'

export default function OpenAIProviderPage() {
  const { t } = useTranslation()
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiUrl, setApiUrl] = useState('https://api.openai.com')
  const [selectedModel, setSelectedModel] = useState('gpt-4o')

  const models = [
    { name: 'GPT-4o', value: 'gpt-4o' },
    { name: 'GPT-4o-mini', value: 'gpt-4o-mini' },
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
              API 密钥
            </Text>
            <XStack alignItems="center" gap={8}>
              <Input
                flex={1}
                value={apiKey}
                onChangeText={setApiKey}
                placeholder="请输入 API 密钥"
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
              API 地址
            </Text>
            <Input value={apiUrl} onChangeText={setApiUrl} placeholder="https://api.openai.com" />
            <Text fontSize="$2" color="$gray10">
              /v1/chat/completions 将自动添加到用户输入地址
            </Text>
          </YStack>

          <YStack gap={8}>
            <Text fontSize="$4" fontWeight="bold">
              {t('common.model')}
            </Text>
            <YStack backgroundColor="$gray2" borderRadius="$4" padding="$2">
              {models.map((model, index) => (
                <YStack key={model.value}>
                  <XStack padding="$2" alignItems="center" justifyContent="space-between">
                    <XStack gap={8} alignItems="center">
                      <View
                        width={24}
                        height={24}
                        borderRadius={12}
                        backgroundColor={model.value.startsWith('gpt') ? '$purple5' : '$yellow5'}
                      />
                      <Text>{model.name}</Text>
                      <Button backgroundColor="$colorTransparent" size="$2" circular icon={<Settings size={16} />} />
                    </XStack>
                    <Button
                      backgroundColor="$colorTransparent"
                      size="$2"
                      circular
                      icon={<CircleMinus color="$red10" size={16} />}
                    />
                  </XStack>
                  {index < models.length - 1 && <Separator />}
                </YStack>
              ))}
            </YStack>
          </YStack>

          <Text fontSize="$2" color="$gray10">
            查看
            <Link href={'https://platform.openai.com/docs'}>
              <Text color={'$blue10'}>OpenAI 文档</Text>
            </Link>
            和
            <Link href={'https://platform.openai.com/docs/models'}>
              <Text color={'$blue10'}>模型</Text>
            </Link>
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
