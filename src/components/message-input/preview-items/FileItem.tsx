import { CircleX, File as FileIcon } from '@tamagui/lucide-icons'
import { FC } from 'react'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import FileViewer from 'react-native-file-viewer'
import { Text, View } from 'tamagui'

import { FileType } from '@/types/file'

interface FileItemProps {
  file: FileType
  onRemove?: (file: FileType) => void
  width?: number
  height?: number
}

const FileItem: FC<FileItemProps> = ({ file, onRemove, width = 60, height = 60 }) => {
  const handlePreview = () => {
    FileViewer.open(file.path, { displayName: file.name }).catch(error => {
      console.error('打开文件时出错:', error)
    })
  }

  const handleRemove = e => {
    e.stopPropagation()
    onRemove?.(file)
  }

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity onPress={handlePreview}>
        <View
          width={width}
          height={height}
          borderRadius={8}
          backgroundColor="$gray6"
          justifyContent="center"
          alignItems="center"
          padding="$1">
          <FileIcon size={24} />
          <Text fontSize={10} numberOfLines={1} ellipsizeMode="middle">
            {file.name || 'file'}
          </Text>
        </View>
      </TouchableOpacity>
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

export default FileItem
