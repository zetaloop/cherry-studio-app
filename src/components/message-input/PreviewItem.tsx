import { CircleX, File as FileIcon } from '@tamagui/lucide-icons'
import { FC, useState } from 'react'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import FileViewer from 'react-native-file-viewer'
import ImageView from 'react-native-image-viewing'
import { Image, Text, View } from 'tamagui'

import { FileType, FileTypes } from '@/types/file'

interface PreviewItemProps {
  file: FileType
  files: FileType[]
  setFiles: (files: FileType[]) => void
}

const ImagePreviewContent: FC<{ file: FileType; allImages: FileType[] }> = ({ file, allImages }) => {
  const [visible, setIsVisible] = useState(false)
  const imageIndex = allImages.findIndex(img => img.path === file.path)

  return (
    <>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Image source={{ uri: file.path, width: 60, height: 60 }} style={{ borderRadius: 8 }} />
      </TouchableOpacity>
      <ImageView
        images={allImages.map(f => ({ uri: f.path }))}
        imageIndex={imageIndex >= 0 ? imageIndex : 0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        presentationStyle="fullScreen"
        animationType="slide"
      />
    </>
  )
}

const FilePreviewContent: FC<{ file: FileType }> = ({ file }) => {
  const handlePreview = () => {
    FileViewer.open(file.path, { displayName: file.name }).catch(error => {
      console.error('打开文件时出错:', error)
    })
  }

  return (
    <TouchableOpacity onPress={handlePreview}>
      <View
        width={60}
        height={60}
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
  )
}

const PreviewItem: FC<PreviewItemProps> = ({ file, files, setFiles }) => {
  const handleRemove = () => {
    setFiles(files.filter(f => f.path !== file.path))
  }

  const isImage = file.type === FileTypes.IMAGE

  return (
    <View style={{ position: 'relative', marginRight: 8, marginTop: 8 }}>
      {isImage ? (
        <ImagePreviewContent file={file} allImages={files.filter(f => f.type?.startsWith('image/'))} />
      ) : (
        <FilePreviewContent file={file} />
      )}

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
    </View>
  )
}

export default PreviewItem
