import { ArrowUpRight, CircleDollarSign, ReceiptText, UserRoundPlus } from '@tamagui/lucide-icons'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Text, XStack, YStack } from 'tamagui'

import { Provider } from '@/types/agent'

interface ServiceSectionProps {
  provider: Provider
  onLoginPress?: () => void
  onBalanceRechargePress?: () => void
  onFeeBillsPress?: () => void
}

const AuthCard: React.FC<ServiceSectionProps> = ({
  provider,
  onLoginPress,
  onBalanceRechargePress,
  onFeeBillsPress
}) => {
  const { t } = useTranslation()

  const handleLoginPress = () => {
    console.log('Login pressed - 处理OAuth登录逻辑，类似原代码中的OAuthButton功能')
    onLoginPress?.()
  }

  const handleBalanceRechargePress = () => {
    console.log('Balance Recharge pressed - 调用充值功能，类似原代码中的providerCharge函数')
    onBalanceRechargePress?.()
  }

  const handleFeeBillsPress = () => {
    console.log('Fee Bills pressed - 查看账单功能，类似原代码中的providerBills函数')
    onFeeBillsPress?.()
  }

  const renderLoginItem = () => (
    <YStack backgroundColor="$gray2" borderRadius={9}>
      <XStack flex={1} justifyContent="space-between" paddingVertical={12} paddingLeft={16} paddingRight={20}>
        <XStack gap={10}>
          <UserRoundPlus size={16} />
          <Text>{t('settings.provider.auth.login')}</Text>
        </XStack>
        <ArrowUpRight size={16} />
      </XStack>
    </YStack>
  )

  const renderLoggedInItems = () => (
    <>
      <YStack backgroundColor="$gray2" borderRadius={9}>
        <XStack flex={1} justifyContent="space-between" paddingVertical={12} paddingLeft={16} paddingRight={20}>
          <XStack gap={10}>
            <CircleDollarSign size={16} />
            <Text>{t('settings.provider.auth.balance_recharge')}</Text>
          </XStack>
          <ArrowUpRight size={16} />
        </XStack>
        <XStack flex={1} justifyContent="space-between" paddingVertical={12} paddingLeft={16} paddingRight={20}>
          <XStack gap={10}>
            <ReceiptText size={16} />
            <Text>{t('settings.provider.auth.free_bills')}</Text>
          </XStack>
          <ArrowUpRight size={16} />
        </XStack>
      </YStack>
    </>
  )

  return (
    <YStack gap={8}>
      <Text>{t('settings.provider.auth.title', { provider: provider.name })}</Text>
      <YStack>{provider.isAuthed ? renderLoggedInItems() : renderLoginItem()}</YStack>
    </YStack>
  )
}

export default AuthCard
