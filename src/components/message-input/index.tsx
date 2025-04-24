import { ArrowUp, AtSign, Globe, Image, Settings } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ScrollView, TextArea, TextAreaProps, XStack, YStack } from 'tamagui'

export const MessageInput: React.FC<TextAreaProps> = ({ width, ...props }) => {
  const { t } = useTranslation()
  const [msg, setMsg] = useState('')
  return (
    <YStack gap="$2" width="100%" padding="$2">
      <XStack gap="$2" alignItems="center">
        <TextArea
          flex={1}
          placeholder={t('button.placeholder')}
          borderWidth="$0"
          borderRadius="$10"
          scrollbarWidth="thin"
          onChangeText={setMsg}
          minHeight={40}
          maxHeight={120}
          {...props}
        />
        <Button
          size="$3"
          backgroundColor="$primary"
          borderRadius="$10"
          icon={<ArrowUp color="$blue9" />}
          disabled={!msg}
        />
      </XStack>

      <XStack>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap="$2">
            <Button size="$3" backgroundColor="$gray4" borderRadius="$10" icon={<AtSign />}>
              {t('button.select_model')}
            </Button>
            <Button size="$3" backgroundColor="$gray4" borderRadius="$10" icon={<Globe />}>
              {t('button.web_search')}
            </Button>
            <Button size="$3" backgroundColor="$gray4" borderRadius="$10" icon={<Image />}>
              {t('button.image_generate')}
            </Button>
            <Button size="$3" backgroundColor="$gray4" borderRadius="$10" icon={<Settings />} />
          </XStack>
        </ScrollView>
      </XStack>
    </YStack>
  )
}
