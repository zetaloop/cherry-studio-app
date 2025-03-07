import {
  AlignVerticalSpaceAround,
  ArrowUpCircle,
  AtSign,
  Edit3,
  Globe,
  Maximize,
  Paintbrush,
  Pin,
  TextSearch
} from '@tamagui/lucide-icons'
import { Button, Paragraph, ScrollView, Tooltip, XStack } from 'tamagui'

const items = [
  { icon: <Edit3 />, label: 'NewTopic' },
  { icon: <AtSign />, label: 'SelectModel' },
  { icon: <Globe />, label: 'WebSearch' },
  { icon: <Paintbrush />, label: 'Clear' },
  { icon: <TextSearch />, label: 'KnowledgeBase' },
  { icon: <Pin />, label: 'Upload' },
  { icon: <AlignVerticalSpaceAround />, label: 'ClearContext' },
  { icon: <Maximize />, label: 'Expand' }
]

export const InputBarItems: React.FC = () => {
  return (
    <XStack borderTopWidth={1} borderColor={'$color.pink8Light'}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <XStack alignItems="center" gap={2}>
          {items.map(item => (
            <Tooltip key={item.label} placement="top">
              <Tooltip.Trigger>
                <Button size={36} backgroundColor={'$colorTransparent'} icon={item.icon} />
              </Tooltip.Trigger>
              <Tooltip.Content>
                <Paragraph>{item.label}</Paragraph>
              </Tooltip.Content>
            </Tooltip>
          ))}
        </XStack>
      </ScrollView>
      <Button size={36} color={'$color.green8Light'} backgroundColor={'$colorTransparent'} icon={ArrowUpCircle} />
    </XStack>
  )
}
