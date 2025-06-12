import React from 'react'
import { Image, useThemeName } from 'tamagui'

import { getDataBackupIcon } from '@/utils/icon'

interface DataBackupIconProps {
  provider: string
}

export const DataBackupIcon: React.FC<DataBackupIconProps> = ({ provider }) => {
  const theme = useThemeName()
  const isDark = theme === 'dark'

  const iconSource = getDataBackupIcon(provider, isDark)

  return <Image width={20} height={20} source={iconSource} />
}
