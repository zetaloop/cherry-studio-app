import { ChevronDown } from '@tamagui/lucide-icons'
import { Adapt, Select, Sheet } from 'tamagui'

const ISelect: React.FC<{
  label?: string
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  items: { value: string; label: string }[]
}> = ({ label, placeholder, value, onValueChange, items }) => {
  return (
    <Select value={value} onValueChange={onValueChange} disablePreventBodyScroll>
      <Select.Trigger width={150} iconAfter={ChevronDown}>
        <Select.Value placeholder={placeholder} />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet native modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$shadowColor"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          <Select.Group>
            {label && <Select.Label>{label}</Select.Label>}
            {items.map((item, index) => (
              <Select.Item key={index} index={index} value={item.value}>
                <Select.ItemText>{item.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  )
}

export { ISelect as Select }
