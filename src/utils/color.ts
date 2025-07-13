export function getGreenColor(isDark: boolean, op: number) {
  return isDark ? `$green${op}Dark` : `$green${op}Light`
}

export function getTextColor(isDark: boolean) {
  return isDark ? '$textPrimaryDark' : '$textPrimaryLight'
}
