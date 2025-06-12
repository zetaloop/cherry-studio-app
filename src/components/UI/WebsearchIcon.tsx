import React, { useMemo } from 'react'
import { Image, useThemeName } from 'tamagui'

import { WebSearchProvider } from '@/types/websearch'
import { getWebSearchProviderIcon } from '@/utils/icon'

interface WebsearchProviderIconProps {
  provider: WebSearchProvider
}

export const WebsearchProviderIcon: React.FC<WebsearchProviderIconProps> = ({ provider }) => {
  const theme = useThemeName()
  const isDark = theme === 'dark'

  const iconSource = useMemo(() => {
    return getWebSearchProviderIcon(provider.id, isDark)
  }, [provider.id, isDark])

  return <Image width={20} height={20} source={iconSource} />
}
