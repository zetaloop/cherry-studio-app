import { ChevronLeft } from '@tamagui/lucide-icons'
import React from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ScrollView,
  Sheet,
  Text,
  useMedia,
  useTheme,
  XStack,
  YStack
} from 'tamagui'

//@ts-ignore
import Icon from '@/assets/images/favicon.png'

const Sidebar: React.FC<{
  isOpen: boolean
  onClose: () => void
}> = ({ isOpen, onClose }) => {
  const theme = useTheme()
  const media = useMedia()

  return (
    <Sheet
      modal
      open={isOpen}
      onOpenChange={onClose}
      dismissOnOverlayPress={true}
      snapPoints={[media.xs ? 75 : 50, media.xs ? '100%' : '50%']}
      zIndex={200000}>
      <Sheet.Overlay backgroundColor={'#000000'} />
      <Sheet.Frame
        width={media.xs ? '100%' : '50%'}
        height={media.xs ? '100%' : '100vh'}
        backgroundColor={theme.background.get()}
        borderRadius={0}>
        <Sheet.Handle />

        <YStack
          alignItems="center"
          justifyContent="space-between"
          padding="$4"
          borderBottomWidth={1}
          borderColor="$borderColor">
          <XStack alignItems="center">
            <Avatar size="$3">
              <AvatarFallback backgroundColor="$blue5" />
              <AvatarImage source={Icon} />
            </Avatar>
            <Text fontSize="$6" fontWeight="700" ml="$3">
              Cherry Studio
            </Text>
          </XStack>
          <Button size="$3" circular icon={ChevronLeft} onPress={onClose} />
        </YStack>

        <ScrollView paddingHorizontal="$3" showsVerticalScrollIndicator={false}>
          <Text fontSize="$3" fontWeight="600" color="$gray7" padding="$3"></Text>
        </ScrollView>
      </Sheet.Frame>
    </Sheet>
  )
}

export default Sidebar
