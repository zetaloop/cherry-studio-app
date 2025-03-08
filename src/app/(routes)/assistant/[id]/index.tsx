import { Plus, Search } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, AvatarImage, Button, ListItem, ScrollView, SizableText, XStack, YGroup } from 'tamagui'

// 模拟聊天列表数据
const mockChats = [
  {
    id: '1',
    name: '豆包',
    description: '嗨，我是你的新朋友豆包！初次见面很高兴...',
    avatar: 'https://picsum.photos/200/200',
    url: 'doubao.com'
  },
  {
    id: '2',
    name: '豆包电脑版对话',
    description: '电脑登录 doubao.com',
    avatar: 'https://picsum.photos/201/201'
  },
  {
    id: '3',
    name: '海龟汤（恐怖向）',
    description: '探索未知，解谜迷团，令人毛骨悚然的...',
    avatar: 'https://picsum.photos/202/202'
  },
  {
    id: '4',
    name: 'AI 图片生成',
    description: '一句话即可生成图片，支持多种样式...',
    avatar: 'https://picsum.photos/203/203'
  },
  {
    id: '5',
    name: '猜人物',
    description: '嘿，我能猜到你心里想谁呢！不信就...',
    avatar: 'https://picsum.photos/204/204'
  },
  {
    id: '6',
    name: '姓名打分',
    description: '输入你想打分的名字，我们一起评分...',
    avatar: 'https://picsum.photos/205/205'
  },
  {
    id: '7',
    name: '摄影作品点评',
    description: '五星评满分，上传照片，看看你的摄影...',
    avatar: 'https://picsum.photos/206/206'
  },
  {
    id: '8',
    name: '科比',
    description: '嗨，我是科比，真的，好久不见。',
    avatar: 'https://picsum.photos/207/207'
  }
]

export default function AssistantPage() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <XStack justifyContent="space-between" alignItems="center" padding="$2">
        <SizableText fontSize={20} fontWeight="bold">
          对话
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
                onPress={() => router.push(`/assistant/${id}/chat/${item.id}`)}
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
                    {item.url && (
                      <SizableText fontSize="$2" color="$blue10">
                        {item.url}
                      </SizableText>
                    )}
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
