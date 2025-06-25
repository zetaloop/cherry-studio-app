import { FC } from 'react'
import React from 'react'
import { View } from 'tamagui'

import { FileType } from '@/types/file'

import FileItem from './preview-items/FileItem'
import ImageItem from './preview-items/ImageItem'

interface PreviewItemProps {
  file: FileType
  files: FileType[]
  setFiles: (files: FileType[]) => void
}

const PreviewItem: FC<PreviewItemProps> = ({ file, files, setFiles }) => {
  const handleRemove = () => {
    setFiles(files.filter(f => f.path !== file.path))
  }

  const isImage = file.type?.startsWith('image/')

  return (
    <View style={{ marginRight: 8, marginTop: 8 }}>
      {isImage ? (
        <ImageItem file={file} allImages={files.filter(f => f.type?.startsWith('image/'))} onRemove={handleRemove} />
      ) : (
        <FileItem file={file} onRemove={handleRemove} />
      )}
    </View>
  )
}

export default PreviewItem
