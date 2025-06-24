import { CirclePlus } from '@tamagui/lucide-icons'
import * as DocumentPicker from 'expo-document-picker'
import React from 'react'
import { Button } from 'tamagui'

import { FileType } from '@/types/file'
import { uuid } from '@/utils'
import { getFileType } from '@/utils/file'

interface AddFileButtonProps {
  files: FileType[]
  setFiles: (files: FileType[]) => void
}

export const AddFileButton: React.FC<AddFileButtonProps> = ({ files, setFiles }) => {
  const handleAddFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({})

      if (result.canceled) {
        console.log('File selection was canceled')
        return
      }

      const _files: FileType[] = result.assets.map(asset => {
        return {
          id: uuid(),
          name: asset.name,
          origin_name: asset.name,
          path: asset.uri,
          size: asset.size || 0,
          ext: asset.name.split('.').pop() || '',
          type: getFileType(asset.name.split('.').pop() || ''),
          mimeType: asset.mimeType || '',
          created_at: new Date().toISOString(),
          count: 1
        }
      })
      setFiles([...files, ..._files])
    } catch (error) {
      console.error('Error selecting file:', error)
    }
  }

  return <Button chromeless size={24} icon={<CirclePlus size={24} />} onPress={handleAddFile} />
}
