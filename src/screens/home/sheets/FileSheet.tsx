import { Camera, FileText, Image } from '@tamagui/lucide-icons'
import * as DocumentPicker from 'expo-document-picker'
import * as ImagePicker from 'expo-image-picker'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Text, XStack, YStack } from 'tamagui'

import { ISheet } from '@/components/ui/Sheet'
import { uploadFiles } from '@/services/FileService'
import { FileType } from '@/types/file'
import { uuid } from '@/utils'
import { getFileType } from '@/utils/file'

interface FileSheetProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  files: FileType[]
  setFiles: (files: FileType[]) => void
}

const FileSheet: FC<FileSheetProps> = ({ isOpen, setIsOpen, files, setFiles }) => {
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
      setIsOpen(false) // 选择完文件后关闭 sheet
    } catch (error) {
      console.error('Error selecting image:', error)
    }
  }

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1
      })

      if (result.canceled) {
        console.log('Camera was canceled')
        return
      }

      const asset = result.assets[0]
      const id = uuid()
      const _file: Omit<FileType, 'md5'> = {
        id: id,
        name: asset.fileName || id,
        origin_name: asset.fileName || id,
        path: asset.uri,
        size: asset.fileSize || 0,
        ext: asset.fileName?.split('.').pop() || 'jpg',
        type: getFileType(asset.fileName?.split('.').pop() || 'jpg'),
        mime_type: asset.mimeType || '',
        created_at: new Date().toISOString(),
        count: 1
      }

      const uploadedFiles = await uploadFiles([_file])
      setFiles([...files, ...uploadedFiles])
      setIsOpen(false) // 拍照完成后关闭 sheet
    } catch (error) {
      console.error('Error taking photo:', error)
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
      setIsOpen(false) // 选择完文件后关闭 sheet
    } catch (error) {
      console.error('Error selecting file:', error)
    }
  }

  return (
    <ISheet isOpen={isOpen} onClose={() => setIsOpen(false)} snapPoints={['40%']}>
      <YStack gap={20} padding="20">
        <YStack gap={12}>
          {/* 拍照 */}
          <Button size="$4" color="white" onPress={handleTakePhoto} justifyContent="flex-start" paddingHorizontal={20}>
            <XStack gap={12} alignItems="center">
              <Camera size={24} />
              <Text color="white" fontSize={16}>
                {t('common.camera')}
              </Text>
            </XStack>
          </Button>

          {/* 选择照片 */}
          <Button size="$4" color="white" onPress={handleAddImage} justifyContent="flex-start" paddingHorizontal={20}>
            <XStack gap={12} alignItems="center">
              <Image size={24} />
              <Text color="white" fontSize={16}>
                {t('common.photo')}
              </Text>
            </XStack>
          </Button>

          {/* 选择文件 */}
          <Button size="$4" color="white" onPress={handleAddFile} justifyContent="flex-start" paddingHorizontal={20}>
            <XStack gap={12} alignItems="center">
              <FileText size={24} />
              <Text color="white" fontSize={16}>
                {t('common.file')}
              </Text>
            </XStack>
          </Button>
        </YStack>
      </YStack>
    </ISheet>
  )
}

export default FileSheet
