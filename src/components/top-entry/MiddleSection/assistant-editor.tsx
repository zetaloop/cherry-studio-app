import { AtSign, Save } from '@tamagui/lucide-icons'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, AvatarFallback, AvatarImage, Button, Input, Separator, Text, TextArea, XStack, YStack } from 'tamagui'

import { Assistant } from '@/store/top-entry'

import { useMiddleSectionController } from '../hooks/useMiddleSectionController'

interface AssistantEditorProps {
  onClose: () => void
}

export const AssistantEditor: React.FC<AssistantEditorProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const { editingAssistant, saveAssistant } = useMiddleSectionController()

  // 本地状态，用于编辑
  const [assistantData, setAssistantData] = useState<Assistant>({
    id: '',
    name: '',
    description: '',
    avatar: 'https://picsum.photos/200/200',
    model: 'gpt-3.5-turbo'
  })

  // 监听外部编辑对象变化
  useEffect(() => {
    if (editingAssistant) {
      setAssistantData(editingAssistant)
    }
  }, [editingAssistant])

  const handleSave = () => {
    saveAssistant(assistantData)
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setAssistantData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <YStack gap="$3" width="100%">
      <Text fontSize="$5" fontWeight="600">
        {assistantData.id ? t('assistants.edit.title') : t('assistants.create.title')}
      </Text>

      <Separator />

      <XStack alignItems="center" gap="$3">
        <Avatar circular size="$5">
          <AvatarFallback backgroundColor="$blue5" />
          <AvatarImage src={assistantData.avatar} />
        </Avatar>
        <YStack flex={1} gap="$1">
          <Text fontSize="$2" color="$gray10">
            {t('common.name')}
          </Text>
          <Input size="$3" value={assistantData.name} onChangeText={value => handleChange('name', value)} />
        </YStack>
      </XStack>

      <YStack gap="$1">
        <Text fontSize="$2" color="$gray10">
          {t('common.description')}
        </Text>
        <TextArea
          size="$3"
          numberOfLines={3}
          value={assistantData.description}
          onChangeText={value => handleChange('description', value)}
        />
      </YStack>

      <YStack gap="$1">
        <Text fontSize="$2" color="$gray10">
          {t('common.model')}
        </Text>
        <Button
          size="$3"
          backgroundColor="$backgroundHover"
          borderRadius="$4"
          gap="$1"
          paddingHorizontal="$3"
          justifyContent="flex-start">
          <AtSign size={16} />
          <Text fontSize="$3">{assistantData.model}</Text>
        </Button>
      </YStack>

      <XStack justifyContent="flex-end" gap="$2" marginTop="$2">
        <Button size="$3" backgroundColor="$gray4" borderRadius="$4" onPress={onClose}>
          {t('common.cancel')}
        </Button>
        <Button size="$3" backgroundColor="$blue9" color="white" borderRadius="$4" gap="$1" onPress={handleSave}>
          <Save size={16} />
          <Text color="white">{t('common.save')}</Text>
        </Button>
      </XStack>
    </YStack>
  )
}
