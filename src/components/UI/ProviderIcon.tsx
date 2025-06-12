import React, { useMemo } from 'react'
import { Image, useThemeName } from 'tamagui'

import { Provider } from '@/types/assistant'
import { getProviderIcon } from '@/utils/icon'

interface ProviderIconProps {
  provider: Provider
}

export const ProviderIcon: React.FC<ProviderIconProps> = ({ provider }) => {
  const theme = useThemeName()
  const isDark = theme === 'dark'

  const iconSource = useMemo(() => {
    return getProviderIcon(provider.id, isDark)
  }, [provider.id, isDark])

  return <Image width={20} height={20} source={iconSource} />
}
