import { Search, Star } from '@tamagui/lucide-icons'
import { Link } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useWindowDimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, ListItem, ScrollView, View, YGroup } from 'tamagui'

import { Input } from '@/components/ui/input'

const mock_providers = [{ href: 'open-ai', label: 'openAI' }]

export default function ProviderSettingsPage() {
  const { t } = useTranslation()

  const { width } = useWindowDimensions()
  const isLargeScreen = width >= 768

  return (
    <SafeAreaView
      style={{
        padding: 16
      }}>
      <Input placeholder={t('settings.provider.search')} size="$4" borderWidth={2} icon={<Search />} />
      {isLargeScreen ? <LargeScreenView /> : <MobileView />}
      <Button variant="outlined">+添加</Button>
    </SafeAreaView>
  )
}

const MobileView = () => (
  <ScrollView>
    <YGroup marginVertical={16} alignSelf="center" bordered size="$4">
      {mock_providers.map(provider => (
        <YGroup.Item key={provider.href}>
          {/* @ts-ignore */}
          <Link href={`/settings/providers/(provider)/${provider.href}`} asChild>
            <ListItem hoverTheme icon={Star} title={provider.label} />
          </Link>
        </YGroup.Item>
      ))}
    </YGroup>
  </ScrollView>
)

const LargeScreenView = () => (
  // <Tabs
  //   defaultValue="tab1"
  //   orientation="horizontal"
  //   flexDirection="column"
  //   width={400}
  //   height={150}
  //   borderRadius="$4"
  //   borderWidth="$0.25"
  //   overflow="hidden"
  //   borderColor="$borderColor">
  //   <Tabs.List separator={<Separator vertical />} disablePassBorderRadius="bottom" aria-label="Manage your account">
  //     <Tabs.Tab
  //       focusStyle={{
  //         backgroundColor: '$color3'
  //       }}
  //       flex={1}
  //       value="tab1">
  //       <SizableText fontFamily="$body">Profile ne</SizableText>
  //     </Tabs.Tab>
  //     <Tabs.Tab
  //       focusStyle={{
  //         backgroundColor: '$color3'
  //       }}
  //       flex={1}
  //       value="tab2">
  //       <SizableText fontFamily="$body">Connections</SizableText>
  //     </Tabs.Tab>
  //     <Tabs.Tab
  //       focusStyle={{
  //         backgroundColor: '$color3'
  //       }}
  //       flex={1}
  //       value="tab3">
  //       <SizableText fontFamily="$body">Notifications</SizableText>
  //     </Tabs.Tab>
  //   </Tabs.List>
  //   <Separator />
  //   <TabsContent value="tab1">
  //     <H5>Profile</H5>
  //   </TabsContent>

  //   <TabsContent value="tab2">
  //     <H5>Connections</H5>
  //   </TabsContent>

  //   <TabsContent value="tab3">
  //     <H5>Notifications</H5>
  //   </TabsContent>
  // </Tabs>
  <View></View>
)

// const TabsContent = (props: TabsContentProps) => {
//   return (
//     <Tabs.Content
//       backgroundColor="$background"
//       key="tab3"
//       padding="$2"
//       alignItems="center"
//       justifyContent="center"
//       flex={1}
//       borderColor="$background"
//       borderRadius="$2"
//       borderTopLeftRadius={0}
//       borderTopRightRadius={0}
//       borderWidth="$2"
//       {...props}>
//       {props.children}
//     </Tabs.Content>
//   )
// }
