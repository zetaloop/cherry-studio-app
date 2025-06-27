import { CircleX } from '@tamagui/lucide-icons'
import { FC, useState } from 'react'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import ImageView from 'react-native-image-viewing'
import { Image, View } from 'tamagui'

import { FileType } from '@/types/file'

interface ImageItemProps {
  file: FileType
  allImages?: FileType[]
  onRemove?: (file: FileType) => void
  width?: number
  height?: number
}

const ImageItem: FC<ImageItemProps> = ({ file, allImages = [], onRemove, width = 60, height = 60 }) => {
  const [visible, setIsVisible] = useState(false)
  const imagesForViewer = allImages.length > 0 ? allImages : [file]
  const imageIndex = imagesForViewer.findIndex(img => img.path === file.path)

  const handleRemove = e => {
    e.stopPropagation()
    onRemove?.(file)
  }

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Image source={{ uri: file.path, width, height }} style={{ borderRadius: 8 }} />
      </TouchableOpacity>
      <ImageView
        images={imagesForViewer.map(f => ({ uri: f.path }))}
        imageIndex={imageIndex >= 0 ? imageIndex : 0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        presentationStyle="fullScreen"
        animationType="slide"
      />
      {onRemove && (
        <TouchableOpacity
          onPress={handleRemove}
          style={{
            position: 'absolute',
            top: -8,
            right: -8,
            borderRadius: 99
          }}>
          <CircleX size={22} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default ImageItem
