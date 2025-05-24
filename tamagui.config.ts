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
      borderColorDark: 'rgba(255, 255, 255, 0.15)',
      cardBackground: '',
      CardBackgroundDark: '#17171b',
      backgroundGreen: 'rgba(0, 185, 107, 0.2)',
      foregroundGreen: 'rgba(0, 185, 107, 1)',
      backgroundRed: 'rgba(216, 57, 31, 0.2)',
      foregroundRed: 'rgba(216, 57, 31, 1)',
      backgroundBlue: 'rgba(28, 128, 254, 0.2)',
      foregroundBlue: 'rgba(28, 128, 254, 1)',
      backgroundPurple: 'rgba(114, 105, 255, 0.2)',
      foregroundPurple: 'rgba(114, 105, 255, 1)',
      backgroundOrange: 'rgba(242, 136, 57, 0.2)',
      foregroundOrange: 'rgba(242, 136, 57, 1)'
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
