import { Directory, File, Paths } from 'expo-file-system/next'

import { FileType } from '@/types/file'

import { deleteFileById, getAllFiles, getFileById, upsertFiles } from '../../db/queries/files.queries'

const fileStorageDir = new Directory(Paths.cache, 'Files')

export async function readFile(file: FileType): Promise<string> {
  const fileData = new File(file.path)
  return fileData.text()
}

export async function uploadFiles(files: FileType[]): Promise<FileType[]> {
  if (!fileStorageDir.exists) {
    fileStorageDir.create({ intermediates: true, overwrite: true })
  }

  const filePromises = files.map(async file => {
    try {
      const sourceFile = new File(file.path)
      const destinationFile = new File(fileStorageDir, `${file.id}.${file.ext}`)
      upsertFiles([{ ...file, path: destinationFile.uri }])
      sourceFile.copy(destinationFile)
      return {
        ...file,
        path: destinationFile.uri
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      throw new Error(`Failed to upload file: ${file.name}`)
    }
  })

  return await Promise.all(filePromises)
}

export async function deleteFile(id: string, force: boolean = false): Promise<void> {
  try {
    const file = await getFileById(id)
    if (!file) return
    const sourceFile = new File(file.path)

    if (!force && file.count > 1) {
      upsertFiles([{ ...file, count: file.count - 1 }])
      return
    }

    deleteFileById(id)

    sourceFile.delete()
  } catch (error) {
    console.error('Error deleting file:', error)
    throw new Error(`Failed to delete file: ${id}`)
  }
}

export async function deleteFiles(files: FileType[]): Promise<void> {
  await Promise.all(files.map(file => deleteFile(file.id)))
}

export default {
  getFile: getFileById,
  getAllFiles,
  uploadFiles,
  deleteFile,
  deleteFiles
}
