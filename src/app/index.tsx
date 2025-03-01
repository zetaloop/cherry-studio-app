import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, SizableText, styled, View } from 'tamagui'

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CenterView>
        <SizableText fontSize={20}>Hello Cherry Studio</SizableText>
        <Button>
          <Button.Text>Click me</Button.Text>
        </Button>
      </CenterView>
    </SafeAreaView>
  )
}

const CenterView = styled(View, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
})

export default HomeScreen
