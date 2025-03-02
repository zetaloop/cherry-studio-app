import { Link } from 'expo-router'
import { Avatar, AvatarImage, GetThemeValueForKey, SizableText, XStack, YStack } from 'tamagui'

export const Assistant: React.FC<{
  width: number | 'unset' | GetThemeValueForKey<'width'>
  name: string
  avatar: string
  message: string
}> = ({ name, message, avatar, width }) => {
  return (
    <Link
      href={{
        pathname: '/assistant/[id]',
        params: { id: name }
      }}
      asChild>
      <XStack width={width} padding={8} gap={12}>
        <Avatar circular>
          <AvatarImage src={avatar} />
        </Avatar>
        <YStack>
          <SizableText fontWeight={'bold'}>{name}</SizableText>
          <SizableText fontWeight={'300'}>{message}</SizableText>
        </YStack>
      </XStack>
    </Link>
  )
}
