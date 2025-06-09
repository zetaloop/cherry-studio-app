import { Search, Trash } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Input, ScrollView, Separator, Text, XStack, YStack } from 'tamagui'

import { useMiddleSectionController } from '../hooks/useMiddleSectionController'

interface AssistantsListProps {
  onClose: () => void
}

export const AssistantsList: React.FC<AssistantsListProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const { filteredAssistants, searchQuery, setSearchQuery, selectAssistant, removeAssistant } =
    useMiddleSectionController()

  return (
    <YStack gap="$2" width="100%">
      <XStack padding="$2" alignItems="center" gap="$2">
        <Search size={16} color="$gray9" />
        <Input
          flex={1}
          size="$3"
          placeholder={t('chat.assistant.search.placeholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </XStack>

      <Separator />

      <ScrollView maxHeight={300} showsVerticalScrollIndicator={true}>
        <YStack gap="$1" padding="$1">
          {filteredAssistants.length > 0 ? (
            filteredAssistants.map(assistant => (
              <XStack
                key={assistant.id}
                alignItems="center"
                justifyContent="space-between"
                padding="$2"
                borderRadius="$2"
                hoverStyle={{ backgroundColor: '$backgroundHover' }}
                pressStyle={{ backgroundColor: '$backgroundPress' }}>
                <XStack flex={1} alignItems="center" gap="$2" onPress={() => selectAssistant(assistant.id)}>
                  {/* <Avatar circular size="$3">
                    <AvatarFallback backgroundColor="$blue5" />
                    <AvatarImage src={assistant.avatar} />
                  </Avatar> */}
                  <YStack>
                    <Text fontSize="$3">{assistant.name}</Text>
                    <Text fontSize="$2" color="$gray10" numberOfLines={1}>
                      {assistant.model}
                    </Text>
                  </YStack>
                </XStack>

                {/* 删除按钮，如果不是默认助手 */}
                {!assistant.id.startsWith('default') && (
                  <XStack>
                    <Trash
                      size={16}
                      color="$red10"
                      cursor="pointer"
                      opacity={0.7}
                      hoverStyle={{ opacity: 1 }}
                      onPress={() => removeAssistant(assistant.id)}
                    />
                  </XStack>
                )}
              </XStack>
            ))
          ) : (
            <Text fontSize="$3" color="$gray10" textAlign="center" paddingVertical="$4">
              {t('assistants.search.no_results')}
            </Text>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
