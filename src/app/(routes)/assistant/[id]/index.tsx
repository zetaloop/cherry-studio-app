import { Plus, Search } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, AvatarImage, Button, ListItem, ScrollView, SizableText, XStack, YGroup } from 'tamagui'

// 模拟聊天列表数据
const mockChats = [
  {
    id: '1',
    name: 'topic 1',
    description: '...',
    avatar: 'https://picsum.photos/200/200'
  }
]

export default function AssistantPage() {
  const { t } = useTranslation()
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <XStack justifyContent="space-between" alignItems="center" padding="$2">
        <SizableText fontSize={20} fontWeight="bold">
          {t('chat.topics.title')}
        </SizableText>
        <XStack gap={8}>
          <Button size="$3" circular icon={Search} />
          <Button size="$3" circular icon={Plus} />
        </XStack>
      </XStack>

      <ScrollView>
        <YGroup borderRadius={0}>
          {mockChats.map(item => (
            <YGroup.Item key={item.id}>
              <ListItem
                onPress={() => router.replace(`/assistant/${id}/topic/${item.id}`)}
                hoverTheme
                pressTheme
                height="$6"
                icon={
                  <Avatar circular size="$5">
                    <AvatarImage src={item.avatar} />
                  </Avatar>
                }
                iconAfter={
                  item.id === '1' ? (
                    <Button variant="outlined" circular size="$2" icon={<SizableText color="green">✆</SizableText>} />
                  ) : undefined
                }
                title={
                  <XStack alignItems="center" gap={4}>
                    <SizableText fontSize="$4" fontWeight="600">
                      {item.name}
                    </SizableText>
                  </XStack>
                }
                subTitle={
                  <SizableText fontSize="$3" color="$gray10" numberOfLines={1}>
                    {item.description}
                  </SizableText>
                }
              />
            </YGroup.Item>
          ))}
        </YGroup>
      </ScrollView>
    </SafeAreaView>
  )
}
