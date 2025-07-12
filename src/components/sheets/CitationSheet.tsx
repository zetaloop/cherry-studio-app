import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet'
import * as ExpoLinking from 'expo-linking'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Stack, Text, useTheme, View, XStack, YStack } from 'tamagui'

import { Citation } from '@/types/websearch'
import { getWebsiteBrand } from '@/utils/websearch'

import FallbackFavicon from '../icons/FallbackFavicon'

interface CitationSheetProps {
  citations: Citation[]
}

const CitationSheet = forwardRef<BottomSheetModal, CitationSheetProps>(({ citations }, ref) => {
  const { t } = useTranslation()
  const theme = useTheme()

  // 添加背景组件渲染函数
  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
  )

  const handlePress = async (url: string) => {
    const supported = await ExpoLinking.canOpenURL(url)

    if (supported) {
      try {
        await ExpoLinking.openURL(url)
      } catch (error) {
        const message = t('errors.cannotOpenLink', {
          error: error instanceof Error ? error.message : String(error)
        })
        console.error(message, error)
      }
    } else {
      const message = t('errors.deviceCannotHandleLink', { url })
      console.warn(message)
    }
  }

  return (
    <BottomSheetModal
      snapPoints={['60%']}
      enableDynamicSizing={false}
      ref={ref}
      backgroundStyle={{
        borderRadius: 30,
        backgroundColor: 'rgba(18, 18, 19, 1)'
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.color.val
      }}
      backdropComponent={renderBackdrop}>
      <BottomSheetScrollView showsVerticalScrollIndicator={false}>
        <Stack justifyContent="center" alignItems="center">
          <Text fontSize={20} lineHeight={22} fontWeight={600}>
            {t('common.source')}
          </Text>
        </Stack>
        {citations.map((citation, index) => (
          <View key={index} paddingHorizontal={30} paddingVertical={20}>
            <YStack
              gap={5}
              padding={10}
              backgroundColor="rgba(25, 25, 28, 1)"
              borderRadius={8}
              onPress={() => handlePress(citation.url)}>
              <XStack gap={11}>
                <Stack
                  borderRadius={8}
                  borderWidth={0.5}
                  padding={3}
                  gap={2}
                  justifyContent="center"
                  alignItems="center">
                  <Text
                    height={14}
                    width={14}
                    fontSize={10}
                    textAlign="center"
                    alignItems="center"
                    justifyContent="center">
                    {citation.number}
                  </Text>
                </Stack>
                <Stack flex={1}>
                  <Text lineHeight={20} numberOfLines={1} ellipsizeMode="tail">
                    {citation.title}
                  </Text>
                </Stack>
              </XStack>
              <XStack>
                <Text fontSize={12} lineHeight={16} numberOfLines={2} ellipsizeMode="tail">
                  {citation.content}
                </Text>
              </XStack>
              <XStack gap={6} alignItems="center">
                <FallbackFavicon hostname={new URL(citation.url).hostname} alt={citation.title || ''} />
                <Text lineHeight={20} fontSize={10}>
                  {getWebsiteBrand(citation.url)}
                </Text>
              </XStack>
            </YStack>
          </View>
        ))}
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
})

CitationSheet.displayName = 'CitationSheet'

export default CitationSheet
