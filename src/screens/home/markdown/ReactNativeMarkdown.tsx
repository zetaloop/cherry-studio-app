import { isEmpty } from 'lodash'
import markdownIt from 'markdown-it'
import markdownItMath from 'markdown-it-math/no-default-renderer'
import { FC, memo } from 'react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import Markdown, { ASTNode, RenderRules } from 'react-native-markdown-display'
import MathJax from 'react-native-mathjax-svg'
import { Text, View } from 'tamagui'
import temml from 'temml'

import { MainTextMessageBlock, ThinkingMessageBlock, TranslationMessageBlock } from '@/types/message'
import { useIsDark } from '@/utils'
import { escapeBrackets, removeSvgEmptyLines } from '@/utils/formats'

interface Props {
  block: MainTextMessageBlock | TranslationMessageBlock | ThinkingMessageBlock
}

const ReactNativeMarkdown: FC<Props> = ({ block }) => {
  const { t } = useTranslation()
  const isDark = useIsDark()

  const getMessageContent = (block: MainTextMessageBlock | TranslationMessageBlock | ThinkingMessageBlock) => {
    const empty = isEmpty(block.content)
    const paused = block.status === 'paused'
    const content = empty && paused ? t('message.chat.completion.paused') : block.content
    return removeSvgEmptyLines(escapeBrackets(content))
  }

  const messageContent = getMessageContent(block)

  const colors = {
    light: {
      accent: '#c1cacc',
      accentedBackground: '#F7F6F3',
      background: '#ffffff',
      border: '#e1e7e8',
      text: 'rgba(32, 32, 32, 1)',
      link: '#00b96b',
      codeBg: 'transparent',
      code: '#00b96b',
      codeBlockBg: '#f7f6f3'
    },
    dark: {
      accent: '#9ca6a8',
      accentedBackground: '#2c2d30',
      background: '#191919',
      border: '#3d3d3d',
      text: 'rgba(249, 249, 249, 1)',
      link: '#00b96b',
      codeBg: 'transparent',
      code: '#00b96b',
      codeBlockBg: '#202020'
    }
  }

  const currentColors = isDark ? colors.dark : colors.light

  // full style https://github.com/iamacup/react-native-markdown-display/blob/master/src/lib/styles.js
  const styles = StyleSheet.create({
    body: {
      color: currentColors.text,
      fontSize: 16
    },
    heading1: {
      fontSize: 30, // 1.875 * 16
      fontWeight: 'bold',
      color: currentColors.text,
      marginTop: 48,
      marginBottom: 24,
      borderBottomWidth: 0
    },
    heading2: {
      fontSize: 24, // 1.5 * 16
      fontWeight: 'bold',
      color: currentColors.text,
      marginTop: 24,
      marginBottom: 24,
      borderBottomWidth: 0
    },
    heading3: {
      fontSize: 20, // 1.25 * 16
      fontWeight: 'bold',
      color: currentColors.text,
      marginTop: 24,
      marginBottom: 16,
      borderBottomWidth: 0
    },
    heading4: {
      fontSize: 16,
      color: currentColors.text,
      marginTop: 16,
      borderBottomWidth: 0
    },
    heading5: {
      fontSize: 16,
      color: currentColors.text,
      marginTop: 16,
      borderBottomWidth: 0
    },
    heading6: {
      fontSize: 16,
      color: currentColors.text,
      marginTop: 16,
      borderBottomWidth: 0
    },
    hr: {
      backgroundColor: currentColors.border,
      height: 1,
      marginVertical: 32
    },
    code_inline: {
      backgroundColor: currentColors.codeBg,
      color: currentColors.code,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 5,
      fontFamily: 'monospace',
      fontSize: 16 * 0.85
    },
    code_block: {
      backgroundColor: currentColors.codeBlockBg,
      color: currentColors.text,
      padding: 16,
      borderRadius: 5,
      fontFamily: 'monospace',
      fontSize: 16 * 0.85
    },
    fence: {
      backgroundColor: currentColors.codeBlockBg,
      color: currentColors.text,
      padding: 16,
      borderRadius: 5,
      fontFamily: 'monospace',
      fontSize: 16 * 0.85
    },
    blockquote: {
      backgroundColor: currentColors.background,
      paddingLeft: 15,
      marginLeft: 5,
      borderLeftWidth: 3,
      borderLeftColor: currentColors.text
    },
    list_item: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8
    },
    bullet_list_icon: {
      color: currentColors.text,
      marginRight: 8
    },
    ordered_list_icon: {
      color: currentColors.text,
      marginRight: 8
    },
    link: {
      color: currentColors.link,
      textDecorationLine: 'none'
    },
    paragraph: {
      marginTop: 16,
      marginBottom: 16,
      flexWrap: 'wrap'
    },
    table: {
      borderWidth: 1,
      borderColor: currentColors.border,
      borderRadius: 3,
      marginTop: 16,
      marginBottom: 16
    },
    th: {
      flex: 1,
      padding: 8,
      fontWeight: 'bold',
      backgroundColor: currentColors.accentedBackground
    },
    td: {
      flex: 1,
      padding: 8,
      borderTopWidth: 1,
      borderColor: currentColors.border
    },
    image: {
      borderRadius: 10
    }
  })

  const markdownItInstance = markdownIt().use(markdownItMath, {
    inlineAllowWhiteSpacePadding: true,
    inlineRenderer: str => temml.renderToString(str),
    blockRenderer: str => temml.renderToString(str, { displayMode: true })
  })

  const renderEquation = (node: ASTNode) => {
    const { content } = node

    try {
      return (
        <MathJax key={node.key} color={isDark ? colors.dark.text : colors.light.text}>
          {content}
        </MathJax>
      )
    } catch (error) {
      return <Text>Error rendering equation</Text>
    }
  }

  const rules: RenderRules = {
    math_inline: renderEquation,
    math_block: renderEquation,
    textgroup: (node, children) => {
      return <Text key={node.key}>{children}</Text>
    }
  }

  return (
    <View>
      <Markdown rules={rules} markdownit={markdownItInstance} style={styles}>
        {messageContent}
      </Markdown>
    </View>
  )
}

export default memo(ReactNativeMarkdown)
