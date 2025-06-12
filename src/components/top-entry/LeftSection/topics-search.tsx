import { Download, FileImage, Trash2 } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ScrollView, Separator, Text, XStack, YStack } from 'tamagui'

import { Topic } from '@/store/top-entry'

import { useLeftSectionController } from '../hooks/useLeftSectionController'

interface TopicsSearchProps {
  onClose: () => void
}

export const TopicsSearch: React.FC<TopicsSearchProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const { filteredTopics, selectTopic, currentTopic, exportTopicAsMarkdown, exportTopicAsImage, removeTopic } =
    useLeftSectionController()

  // 注意：移除了自动关闭的useEffect，避免循环问题

  const handleSelectTopic = (topicId: string) => {
    selectTopic(topicId)
    onClose()
  }

  return (
    <YStack gap="$3" width="100%">
      <Text fontSize="$5" fontWeight="600" marginBottom="$2">
        {t('chat.topics.search.results')}
      </Text>

      <Separator />

      <ScrollView flex={1} showsVerticalScrollIndicator={true}>
        <YStack gap="$2">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic: Topic) => (
              <YStack key={topic.id} marginBottom="$2">
                <XStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  padding="$2"
                  borderRadius="$4"
                  backgroundColor={currentTopic?.id === topic.id ? '$backgroundHover' : 'transparent'}
                  hoverStyle={{ backgroundColor: '$backgroundHover' }}
                  pressStyle={{ backgroundColor: '$backgroundPress' }}
                  onPress={() => handleSelectTopic(topic.id)}>
                  <YStack flex={1}>
                    <Text fontSize="$4" fontWeight={currentTopic?.id === topic.id ? '600' : '400'}>
                      {topic.name}
                    </Text>
                    {topic.content && (
                      <Text fontSize="$2" color="$gray10" numberOfLines={1} marginTop="$1">
                        {topic.content.slice(0, 40)}
                        {topic.content.length > 40 ? '...' : ''}
                      </Text>
                    )}
                  </YStack>
                  <XStack alignSelf="center" paddingLeft="$2">
                    <XStack gap="$1">
                      <Button
                        size="$1"
                        circular
                        backgroundColor="transparent"
                        hoverStyle={{ backgroundColor: '$backgroundHover' }}
                        onPress={() => exportTopicAsMarkdown(topic.id)}
                        icon={<Download size={14} />}
                      />
                      <Button
                        size="$1"
                        circular
                        backgroundColor="transparent"
                        hoverStyle={{ backgroundColor: '$backgroundHover' }}
                        onPress={() => exportTopicAsImage(topic.id)}
                        icon={<FileImage size={14} />}
                      />
                      <Button
                        size="$1"
                        circular
                        backgroundColor="transparent"
                        hoverStyle={{ backgroundColor: '$backgroundHover' }}
                        onPress={() => removeTopic(topic.id)}
                        icon={<Trash2 size={14} color="$red10" />}
                      />
                    </XStack>
                  </XStack>
                </XStack>
              </YStack>
            ))
          ) : (
            <YStack justifyContent="center" alignItems="center" paddingVertical="$6">
              <Text fontSize="$3" color="$gray10" textAlign="center">
                {t('history.search.topics.empty')}
              </Text>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
