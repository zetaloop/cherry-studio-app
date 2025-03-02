import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, SizableText, styled, View } from 'tamagui'

import { InputBar } from '@/components/InputBar'
import { NavBar } from '@/components/NavBar/index'

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar />
      <CenterView>
        <SizableText fontSize={20}>Hello Cherry Studio</SizableText>
        <Button>
          <Button.Text>Click me</Button.Text>
        </Button>
      </CenterView>
      <BottomInputView>
        <InputBar />
      </BottomInputView>
    </SafeAreaView>
  )
}

const CenterView = styled(View, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
})

const BottomInputView = styled(View, {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0
})

export default HomeScreen
