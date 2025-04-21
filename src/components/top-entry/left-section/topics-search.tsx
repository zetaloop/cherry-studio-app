import { Search, X } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Input, ScrollView, Separator, Text, XStack, YStack } from 'tamagui'
import { useLeftSectionController } from '../hooks/useLeftSectionController'

interface TopicsSearchProps {
  onClose: () => void
}

export const TopicsSearch: React.FC<TopicsSearchProps> = ({ onClose }) => {
  const { t } = useTranslation()
  const {
    filteredTopics,
    searchQuery,
    setSearchQuery,
    selectTopic
  } = useLeftSectionController()

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  const handleSelectTopic = (topicId: string) => {
    selectTopic(topicId)
    onClose()
  }

  return (
    <YStack gap="$3" width="100%">
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize="$4" fontWeight="600">
          {t('history.search.title')}
        </Text>
        <Button
          size="$2"
          circular
          backgroundColor="transparent"
          hoverStyle={{ backgroundColor: '$backgroundHover' }}
          onPress={onClose}
          icon={<X size={18} />}
        />
      </XStack>

      <XStack alignItems="center" gap="$2">
        <Search size={18} color="$gray9" />
        <Input
          flex={1}
          size="$4"
          placeholder={t('history.search.placeholder')}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
        {searchQuery ? (
          <Button
            size="$2"
            circular
            backgroundColor="transparent"
            hoverStyle={{ backgroundColor: '$backgroundHover' }}
            onPress={handleClearSearch}
            icon={<X size={16} />}
          />
        ) : null}
      </XStack>

      <Separator />

      <ScrollView maxHeight={400} showsVerticalScrollIndicator={true}>
        <YStack gap="$2">
          {filteredTopics.length > 0 ? (
            filteredTopics.map(topic => (
              <YStack
                key={topic.id}
                padding="$3"
                borderRadius="$4"
                backgroundColor="$backgroundHover"
                hoverStyle={{ opacity: 0.9 }}
                pressStyle={{ opacity: 0.8 }}
                onPress={() => handleSelectTopic(topic.id)}>
                <Text fontSize="$4" fontWeight="600">
                  {topic.name}
                </Text>
                <Text fontSize="$2" color="$gray10" numberOfLines={2} marginTop="$1">
                  {topic.content}
                </Text>
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
