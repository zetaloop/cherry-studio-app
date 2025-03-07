import React, { Children } from 'react'
import { Stack, XStack } from 'tamagui'

export const NavBar: React.FC<{ children: React.ReactNode; itemsPosition: ('left' | 'right' | 'center')[] }> = ({
  children,
  itemsPosition = ['left']
}) => {
  const _children = Children.toArray(children)
  return (
    <XStack width={'100%'} position="fixed" top={0} left={0} alignItems="center" justifyContent="space-around">
      <Stack>{_children[itemsPosition.indexOf('left')]}</Stack>
      <Stack>{_children[itemsPosition.indexOf('center')]}</Stack>
      <Stack>{_children[itemsPosition.indexOf('right')]}</Stack>
    </XStack>
  )
}
