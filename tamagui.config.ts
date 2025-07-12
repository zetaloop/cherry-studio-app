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
      foregroundOrange: 'rgba(242, 136, 57, 1)',
      backgroundYellow: 'rgba(255, 202, 0, 0.2)',
      foregroundYellow: 'rgba(255, 202, 0, 1)',
      backgroundDarkPurple: 'rgba(56, 67, 255, 0.2)',
      foregroundDarkPurple: 'rgba(56, 67, 255, 1)',
      backgroundGray: 'rgba(135, 142, 168, 0.2)',
      foregroundGray: 'rgba(135, 142, 168, 1)',
      //////// new colors ////////
      colorBrand: 'rgba(0, 185, 107, 1)',
      colorBorderLinearLight: 'rgba(0, 0, 0, 1)',
      colorBorderLinearDark: 'rgba(255, 255, 255, 1)',
      purple100Light: 'rgba(156, 150, 249, 1)',
      purple100Dark: 'rgba(156, 150, 249, 1)',
      purple20Light: 'rgba(156, 150, 249, 0.2)',
      purple20Dark: 'rgba(156, 150, 249, 0.2)',
      green100Light: 'rgba(129, 223, 148, 1)',
      green100Dark: 'rgba(172, 243, 166, 1)',
      green20Light: 'rgba(141, 229, 158, 0.3)',
      green20Dark: 'rgba(172, 243, 166, 0.2)',
      green10Light: 'rgba(141, 229, 158, 0.15)',
      green10Dark: 'rgba(172, 243, 166, 0.1)',
      orange100Light: 'rgba(255, 178, 110, 1)',
      orange100Dark: 'rgba(255, 178, 110, 1)',
      orange20Light: 'rgba(255, 178, 110, 0.2)',
      orange20Dark: 'rgba(255, 178, 110, 0.2)',
      blue100Light: 'rgba(111, 177, 250, 1)',
      blue100Dark: 'rgba(111, 177, 250, 1)',
      blue20Light: 'rgba(111, 177, 250, 0.2)',
      blue20Dark: 'rgba(111, 177, 250, 0.2)',
      yellow100Light: 'rgba(242, 226, 24, 1)',
      yellow100Dark: 'rgba(249, 234, 66, 1)',
      yellow20Light: 'rgba(242, 226, 24, 0.2)',
      yellow20Dark: 'rgba(249, 234, 66, 0.2)',
      pink100Light: 'rgba(227, 152, 201, 1)',
      pink100Dark: 'rgba(227, 152, 201, 1)',
      pink20Light: 'rgba(227, 152, 201, 0.2)',
      pink20Dark: 'rgba(227, 152, 201, 0.2)',
      red100Light: 'rgba(255, 0, 0, 1)',
      red100Dark: 'rgba(255, 0, 0, 1)',
      red20Light: 'rgba(255, 0, 0, 0.2)',
      red20Dark: 'rgba(255, 0, 0, 0.2)',
      red10Light: 'rgba(255, 0, 0, 0.1)',
      red10Dark: 'rgba(255, 0, 0, 0.1)',
      gray80Light: 'rgba(160, 161, 176, 0.8)',
      gray80Dark: 'rgba(160, 161, 176, 0.8)',
      gray60Light: 'rgba(160, 161, 176, 0.6)',
      gray60Dark: 'rgba(160, 161, 176, 0.6)',
      gray40Light: 'rgba(160, 161, 176, 0.4)',
      gray40Dark: 'rgba(160, 161, 176, 0.4)',
      gray20Light: 'rgba(160, 161, 176, 0.2)',
      gray20Dark: 'rgba(160, 161, 176, 0.2)',
      gray10Light: 'rgba(160, 161, 176, 0.1)',
      gray10Dark: 'rgba(160, 161, 176, 0.1)',
      backgroundPrimaryLight: 'rgba(247, 247, 247, 1)',
      backgroundPrimaryDark: 'rgba(18, 18, 19, 1)',
      backgroundSecondaryLight: 'rgba(255, 255, 255, 0.6)',
      backgroundSecondaryDark: 'rgba(32, 32, 32, 0.6)',
      uiCardLight: 'rgba(255, 255, 255, 1)',
      uiCardDark: 'rgba(25, 25, 28, 1)',
      textPrimaryLight: 'rgba(32, 32, 32, 1)',
      textPrimaryDark: 'rgba(249, 249, 249, 1)',
      textSecondaryLight: 'rgba(100, 100, 100, 1)',
      textSecondaryDark: 'rgba(206, 206, 206, 1)',
      textDeleteLight: 'rgba(220, 62, 66, 1)',
      textDeleteDark: 'rgba(220, 62, 66, 1)',
      textLinkLight: 'rgba(0, 144, 255, 1)',
      textLinkDark: 'rgba(0, 144, 255, 1)'
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
