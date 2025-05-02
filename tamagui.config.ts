import { config } from '@tamagui/config/v3'
import { createTamagui } from '@tamagui/core'

// 扩展配置，添加borderColor
const extendedConfig = {
  ...config,
  tokens: {
    ...config.tokens,
    color: {
      ...config.tokens.color,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      borderColorDark: 'rgba(255, 255, 255, 0.15)'
    }
  }
}

export const tamaguiConfig = createTamagui(extendedConfig)

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {
    foo: string
  }
}
