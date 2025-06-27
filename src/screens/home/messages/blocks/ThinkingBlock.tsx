import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { View } from 'tamagui'

import MarqueeComponent from '@/components/ui/MarqueeComponent'
import { ThinkingMessageBlock } from '@/types/message'

import ReactNativeMarkdown from '../../markdown/ReactNativeMarkdown'

interface Props {
  block: ThinkingMessageBlock
}

const ThinkingBlock: React.FC<Props> = ({ block }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleExpanded}>
        <MarqueeComponent block={block} expanded={expanded} />
      </Pressable>
      {!expanded && (
        <View style={styles.contentContainer}>
          <ReactNativeMarkdown block={block} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(0, 185, 107, 0.15)',
    justifyContent: 'center'
  },
  contentContainer: {
    marginTop: 8,
    padding: 12,
    borderRadius: 8
  }
})

export default ThinkingBlock
