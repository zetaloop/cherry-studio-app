import {
  AlignVerticalSpaceAround,
  ArrowUpCircle,
  AtSign,
  Edit3,
  Globe,
  Maximize,
  Paintbrush,
  TextSearch
} from '@tamagui/lucide-icons'
import { Button, ScrollView, XStack } from 'tamagui'

export const InputBarItems: React.FC = () => {
  return (
    <XStack borderTopWidth={1} borderColor={'$color.pink8Light'}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <XStack alignItems="center" gap={2}>
          <Button size={36} backgroundColor={'$colorTransparent'} icon={Edit3} />
          <Button size={36} backgroundColor={'$colorTransparent'} icon={AtSign} />
          <Button size={36} backgroundColor={'$colorTransparent'} icon={Globe} />
          <Button size={36} backgroundColor={'$colorTransparent'} icon={Paintbrush} />
          <Button size={36} backgroundColor={'$colorTransparent'} icon={TextSearch} />
          <Button size={36} backgroundColor={'$colorTransparent'} icon={AlignVerticalSpaceAround} />
          <Button size={36} backgroundColor={'$colorTransparent'} icon={Maximize} />
        </XStack>
      </ScrollView>
      <Button size={36} color={'$color.green8Light'} backgroundColor={'$colorTransparent'} icon={ArrowUpCircle} />
    </XStack>
  )
}
