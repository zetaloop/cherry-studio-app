import { CirclePlus } from '@tamagui/lucide-icons'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'tamagui'
import * as DropdownMenu from 'zeego/dropdown-menu'

import { uploadFiles } from '@/services/FileService'
import { FileType } from '@/types/file'
import { uuid } from '@/utils'
import { getFileType } from '@/utils/file'

interface AddFileButtonProps {
  files: FileType[]
  setFiles: (files: FileType[]) => void
}

export const AddFileButton: React.FC<AddFileButtonProps> = ({ files, setFiles }) => {
  const { t } = useTranslation()

  const handleAddImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsMultipleSelection: true
      })

      if (result.canceled) {
        console.log('Image selection was canceled')
        return
      }

      const _files: Omit<FileType, 'md5'>[] = result.assets.map(asset => {
        const id = uuid()
        return {
          id: id,
          name: asset.fileName || id,
          origin_name: asset.fileName || id,
          path: asset.uri,
          size: asset.fileSize || 0,
          ext: asset.fileName?.split('.').pop() || 'png',
          type: getFileType(asset.fileName?.split('.').pop() || 'png'),
          mime_type: asset.mimeType || '',
          created_at: new Date().toISOString(),
          count: 1
        }
      })
      const uploadedFiles = await uploadFiles(_files)
      setFiles([...files, ...uploadedFiles])
    } catch (error) {
      console.error('Error selecting image:', error)
    }
  }

  const handleAddFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ multiple: true })

      if (result.canceled) {
        console.log('File selection was canceled')
        return
      }

      const _files: Omit<FileType, 'md5'>[] = result.assets.map(asset => {
        return {
          id: uuid(),
          name: asset.name,
          origin_name: asset.name,
          path: asset.uri,
          size: asset.size || 0,
          ext: asset.name.split('.').pop() || '',
          type: getFileType(asset.name.split('.').pop() || ''),
          mime_type: asset.mimeType || '',
          created_at: new Date().toISOString(),
          count: 1
        }
      })
      const uploadedFiles = await uploadFiles(_files)
      setFiles([...files, ...uploadedFiles])
    } catch (error) {
      console.error('Error selecting file:', error)
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button chromeless size={24} icon={<CirclePlus size={24} />} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item key="file" onSelect={handleAddFile}>
          <DropdownMenu.ItemTitle>{t('common.file')}</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
        <DropdownMenu.Item key="photo" onSelect={handleAddImage}>
          <DropdownMenu.ItemTitle>{t('common.photo')}</DropdownMenu.ItemTitle>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
