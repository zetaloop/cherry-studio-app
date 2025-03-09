import { Input, InputProps, View } from 'tamagui'

const MInput: React.FC<
  InputProps & {
    icon?: React.ReactNode
    iconPosition?: 'left' | 'right'
  }
> = ({ icon, iconPosition = 'right', ...props }) => (
  <View position="relative">
    <Input
      {...props}
      paddingLeft={iconPosition === 'left' ? 36 : props.paddingLeft}
      paddingRight={iconPosition === 'right' ? 36 : props.paddingRight}
    />
    {icon && (
      <View
        position="absolute"
        top="50%"
        left={iconPosition === 'left' ? 10 : undefined}
        right={iconPosition === 'right' ? 10 : undefined}
        transform={[{ translateY: '-50%' }]}
        alignItems="center"
        justifyContent="center"
        pointerEvents="none">
        {icon}
      </View>
    )}
  </View>
)

export { MInput as Input }
