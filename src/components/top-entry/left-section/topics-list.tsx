import { Download, FileImage, Trash2 } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ScrollView, Separator, Text, XStack, YStack } from 'tamagui'
import { useLeftSectionController } from '../hooks/useLeftSectionController'

export const TopicsList: React.FC = () => {
  const { t } = useTranslation()
  const {
    filteredTopics,
    currentTopic,
    selectTopic,
    removeTopic,
    exportTopicAsMarkdown,
    exportTopicAsImage
  } = useLeftSectionController()

  return (
    <YStack flex={1} width="100%">
      <Text fontSize="$5" fontWeight="600" marginBottom="$2">
        {t('chat.topics.list')}
      </Text>
      <Separator />
      <ScrollView flex={1} showsVerticalScrollIndicator={true} marginTop="$2">
        <YStack gap="$2">
          {filteredTopics.length > 0 ? (
            filteredTopics.map(topic => (
              <YStack key={topic.id} marginBottom="$2">
                <XStack
                  justifyContent="space-between"
                  alignItems="flex-start"
                  padding="$2"
                  borderRadius="$4"
                  backgroundColor={currentTopic?.id === topic.id ? '$backgroundHover' : 'transparent'}
                  hoverStyle={{ backgroundColor: '$backgroundHover' }}
                  pressStyle={{ backgroundColor: '$backgroundPress' }}
                  onPress={() => selectTopic(topic.id)}>
                  <YStack flex={1}>
                    <Text fontSize="$4" fontWeight={currentTopic?.id === topic.id ? "600" : "400"}>
                      {topic.name}
                    </Text>
                    {topic.content && (
                      <Text fontSize="$2" color="$gray10" numberOfLines={1} marginTop="$1">
                        {topic.content.slice(0, 40)}{topic.content.length > 40 ? '...' : ''}
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
                {t('history.topics.empty')}
              </Text>
            </YStack>
          )}
        </YStack>
      </ScrollView>
    </YStack>
  )
}
