import { ChevronDown } from '@tamagui/lucide-icons'
import React from 'react'
import { Accordion, Square, Text, XStack, YStack } from 'tamagui'

import { ModelIcon } from '@/components/ui/modelIcon'
import { ModelTags } from '@/components/ui/modelTags'
import { Model } from '@/types/agent'

interface ModelGroupProps {
  groupName: string
  models: Model[]
  index: number
  renderGroupButton?: (models: Model[]) => React.ReactNode
  renderModelButton?: (model: Model) => React.ReactNode
  showModelCount?: boolean
}

export function ModelGroup({
  groupName,
  models,
  index,
  renderGroupButton,
  renderModelButton,
  showModelCount = false
}: ModelGroupProps) {
  return (
    <Accordion.Item key={groupName} value={`item-${index}`} marginBottom={8}>
      <Accordion.Trigger
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        paddingVertical={12}
        paddingHorizontal={16}
        backgroundColor="rgba(23, 23, 27, 1)"
        borderRadius={9}
        borderBottomLeftRadius={0}
        borderBottomRightRadius={0}>
        {({ open }: { open: boolean }) => (
          <>
            <XStack gap={10} alignItems="center">
              <Square animation="quick" rotate={open ? '0deg' : '-90deg'}>
                <ChevronDown size={14} />
              </Square>
              <Text fontSize={14} fontWeight="bold">
                {groupName}
              </Text>
              {showModelCount && (
                <Text
                  paddingHorizontal={8}
                  borderRadius={8}
                  backgroundColor="$backgroundGreen"
                  color="$foregroundGreen">
                  {models.length}
                </Text>
              )}
            </XStack>

            {renderGroupButton?.(models)}
          </>
        )}
      </Accordion.Trigger>

      <Accordion.HeightAnimator animation="quick">
        <Accordion.Content
          exitStyle={{ opacity: 0 }}
          backgroundColor="rgba(23, 23, 27, 1)"
          borderBottomLeftRadius={9}
          borderBottomRightRadius={9}>
          <YStack flex={1} width="100%" gap={8}>
            {models.map(model => (
              <XStack
                key={model.id}
                alignItems="center"
                justifyContent="space-between"
                paddingHorizontal={8}
                width="100%">
                <XStack gap={8} flex={1} maxWidth="80%">
                  {/* icon */}
                  <XStack justifyContent="center" alignItems="center" flexShrink={0}>
                    <ModelIcon model={model} />
                  </XStack>
                  {/* name and tool */}
                  <YStack gap={5} flex={1} minWidth={0}>
                    <Text numberOfLines={1} ellipsizeMode="tail">
                      {model.name}
                    </Text>
                    <ModelTags model={model} size={11} style={{ flexShrink: 0 }} />
                  </YStack>
                </XStack>
                <XStack flexShrink={0} marginLeft={8}>
                  {renderModelButton?.(model)}
                </XStack>
              </XStack>
            ))}
          </YStack>
        </Accordion.Content>
      </Accordion.HeightAnimator>
    </Accordion.Item>
  )
}
