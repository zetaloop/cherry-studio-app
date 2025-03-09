import { Separator, styled } from 'tamagui'
import { ScrollView, Text, View } from 'tamagui'

export const SettingContainer = styled(ScrollView, {
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 15,
  paddingBottom: 20,
  contentContainerStyle: {
    paddingBottom: 30
  },

  variants: {
    theme: {
      dark: {
        backgroundColor: 'transparent'
      },
      light: {
        backgroundColor: 'var(--color-background-soft)'
      }
    }
  }
})

export const SettingTitle = styled(Text, {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  userSelect: 'none',
  fontSize: 14,
  fontWeight: 'bold',
  paddingBlockEnd: 24
})

export const SettingSubtitle = styled(Text, {
  fontSize: 14,
  color: 'var(--color-text-1)',
  margin: '15px 0 0 0',
  userSelect: 'none',
  fontWeight: 'bold'
})

export const SettingDescription = styled(Text, {
  fontSize: 12,
  color: 'var(--color-text-3)',
  marginTop: 10
})

export const SettingDivider = styled(Separator, {
  margin: '10px 0',
  borderBlockStartWidth: 0.5,
  borderBlockStartStyle: 'solid',
  borderBlockStartColor: 'var(--color-border)'
})

export const SettingRow = styled(View, {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: 24,
  marginVertical: 8
})

export const SettingRowTitle = styled(Text, {
  fontSize: 14,
  lineHeight: 18,
  color: 'var(--color-text-1)'
})

export const SettingHelpTextRow = styled(View, {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '5px 0'
})

export const SettingHelpText = styled(Text, {
  fontSize: 11,
  color: 'var(--color-text)',
  opacity: 0.4
})

export const SettingGroup = styled(View, {
  marginBottom: 20,
  borderRadius: 8,
  borderWidth: 0.5,
  borderColor: 'var(--color-border)',
  padding: 16,

  variants: {
    theme: {
      dark: {
        background: '#00000010'
      },
      light: {
        background: 'var(--color-background)'
      }
    }
  }
})
