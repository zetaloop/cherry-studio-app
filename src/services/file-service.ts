import * as FileSystem from 'expo-file-system'

import db from '@/databases'
import { FileType } from '@/types/file'

export default class FileManager {
  static async getFile(id: string): Promise<FileType | undefined> {
    const file = await db.files.get(id)

    if (file) {
      // todo
      // const filesPath = store.getState().runtime.filesPath
      const filesPath = ''
      console.warn('[FileManager] TODO')
      file.path = filesPath + '/' + file.id + file.ext
    }

    return file
  }
  static async deleteFile(id: string, force: boolean = false): Promise<void> {
    const file = await this.getFile(id)

    if (!file) {
      return
    }

    if (!force) {
      if (file.count > 1) {
        await db.files.update(id, { ...file, count: file.count - 1 })
        return
      }
    }

    await db.files.delete(id)

    try {
      await FileSystem.deleteAsync(id + file.ext)
    } catch (error) {
      console.error('[FileManager] Failed to delete file:', error)
    }
  }
  static async deleteFiles(files: FileType[]): Promise<void> {
    await Promise.all(files.map(file => this.deleteFile(file.id)))
  }
}
