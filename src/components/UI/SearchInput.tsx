import { Search } from '@tamagui/lucide-icons'
import React from 'react'
import { Input, Stack, XStack } from 'tamagui'

interface SearchInputProps {
  placeholder: string
  onChangeText?: (text: string) => void
  value?: string
}

export const SearchInput = ({ placeholder, onChangeText, value }: SearchInputProps) => {
  return (
    <XStack height={48} gap={8} alignItems="center" width="100%">
      <Input
        flex={1}
        paddingHorizontal={16}
        paddingVertical={13}
        borderRadius={24}
        width="100%"
        paddingLeft={42}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
      <Stack
        position="absolute"
        left={16}
        top={13}
        height={20}
        width={20}
        alignItems="center"
        justifyContent="center"
        zIndex={1}>
        <Search size={20} />
      </Stack>
    </XStack>
  )
}
