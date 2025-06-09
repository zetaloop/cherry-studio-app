import { FlashList } from '@shopify/flash-list'
import React from 'react'
import { YStack } from 'tamagui'

import AssistantItemRow from '@/components/assistant/assistantItemRow'
import { Assistant } from '@/types/assistant'

interface CategoryAssistantsTabProps {
  assistants: Assistant[]
  setIsBottomSheetOpen: (isOpen: boolean) => void
  onAssistantPress: (assistant: Assistant) => void
}

const CategoryAssistantsTab: React.FC<CategoryAssistantsTabProps> = ({
  assistants,
  setIsBottomSheetOpen,
  onAssistantPress
}) => {
  const renderItem = ({ item }: { item: Assistant }) => (
    <AssistantItemRow
      assistant={item}
      setIsBottomSheetOpen={setIsBottomSheetOpen}
      onAssistantPress={onAssistantPress}
    />
  )

  return (
    <YStack flex={1}>
      <FlashList
        data={assistants}
        renderItem={renderItem}
        estimatedItemSize={70}
        ItemSeparatorComponent={() => <YStack height={10} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  )
}

export default CategoryAssistantsTab
