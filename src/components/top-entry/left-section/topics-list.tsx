import { Download, FileImage, Trash2 } from '@tamagui/lucide-icons'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ScrollView, Separator, Text, XStack, YStack } from 'tamagui'
import { useLeftSectionController } from '../hooks/useLeftSectionController'
import { Topic } from '../../../store/top-entry'

interface TopicsListProps {
  searchQuery?: string
}

export const TopicsList: React.FC<TopicsListProps> = ({ searchQuery: externalSearchQuery }) => {
  const { t } = useTranslation()
  const {
    filteredTopics,
    currentTopic,
    selectTopic,
    removeTopic,
    exportTopicAsMarkdown,
    exportTopicAsImage,
    searchQuery,
    topics
  } = useLeftSectionController()

  // 使用外部传入的 searchQuery 进行过滤
  const displayTopics = useMemo(() => {
    // 添加调试日志
    console.log('TopicsList 渲染，外部searchQuery:', externalSearchQuery, '内部searchQuery:', searchQuery)

    // 优先使用外部传入的 searchQuery
    const effectiveQuery = externalSearchQuery !== undefined ? externalSearchQuery : searchQuery

    if (effectiveQuery && effectiveQuery.trim() !== '') {
      const query = effectiveQuery.toLowerCase().trim()
      return topics.filter(
        (topic: Topic) =>
          topic.name.toLowerCase().includes(query) ||
          (topic.content && topic.content.toLowerCase().includes(query))
      )
    }

    return filteredTopics
  }, [externalSearchQuery, searchQuery, filteredTopics, topics])

  return (
    <YStack flex={1} width="100%">
      <Text fontSize="$5" fontWeight="600" marginBottom="$2">
        {t('chat.topics.list')}
      </Text>
      <Separator />
      <ScrollView flex={1} showsVerticalScrollIndicator={true} marginTop="$2">
        <YStack gap="$2">
          {displayTopics.length > 0 ? (
            displayTopics.map((topic: Topic) => (
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
