import React from 'react'
import { XStack } from 'tamagui'

import { FileType } from '@/types/file'

import PreviewItem from './PreviewItem'

interface FilePreviewProps {
  files: FileType[]
  setFiles: (files: FileType[]) => void
}

const FilePreview: React.FC<FilePreviewProps> = ({ files, setFiles }) => {
  return (
    <XStack>
      {files.map(file => {
        return <PreviewItem key={file.id} file={file} files={files} setFiles={setFiles} />
      })}
    </XStack>
  )
}

export default FilePreview
