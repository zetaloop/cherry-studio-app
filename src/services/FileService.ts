import * as FileSystem from 'expo-file-system'

import { FileType } from '@/types/file'
const fileStorageDir = FileSystem.documentDirectory + 'Files/'

export async function uploadFile(files: FileType[]): Promise<FileType[]> {
  // use FileSystem.copyAsync(options)
  const filePromises = files.map(async file => {
    const fileUri = file.path
    const destinationUri = fileStorageDir + file.id + '.' + file.ext

    try {
      await FileSystem.makeDirectoryAsync(fileStorageDir, { intermediates: true })
      await FileSystem.copyAsync({ from: fileUri, to: destinationUri })
      return {
        ...file,
        path: destinationUri
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      throw new Error(`Failed to upload file: ${file.name}`)
    }
  })
  const uploadedFiles = await Promise.all(filePromises)

  return uploadedFiles
}
