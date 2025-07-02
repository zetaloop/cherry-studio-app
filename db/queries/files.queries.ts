import { eq } from 'drizzle-orm'
import { File } from 'expo-file-system/next'

import { FileType } from '@/types/file'

import { db } from '..'
import { files } from '../schema'

/**
 * 将数据库记录转换为 File 类型。
 * @param dbRecord - 从数据库检索的记录。
 * @returns 一个 File 对象。
 */
export function transformDbToFile(dbRecord: any): FileType {
  const file = new File(dbRecord.path, dbRecord.name)
  return {
    id: dbRecord.id,
    origin_name: dbRecord.origin_name,
    created_at: dbRecord.created_at,
    name: dbRecord.name,
    path: dbRecord.path,
    size: dbRecord.size,
    ext: dbRecord.ext,
    count: dbRecord.count,
    type: dbRecord.type,
    mimeType: file.type || ''
  }
}

/**
 * 返回所有文件
 * @returns 文件数组
 */
export async function getAllFiles(): Promise<FileType[] | null> {
  try {
    const result = await db.select().from(files)

    if (result.length === 0) {
      return null
    }

    return result.map(transformDbToFile)
  } catch (error) {
    console.error('Error getting all files:', error)
    throw error
  }
}

/**
 * 将 File 对象转换为数据库记录格式。
 * @param File - File 对象。
 * @returns 一个适合数据库操作的对象。
 */
function transformFileToDb(file: FileType): any {
  return {
    id: file.id,
    origin_name: file.origin_name,
    created_at: file.created_at,
    name: file.name,
    path: file.path,
    size: file.size,
    ext: file.ext,
    count: file.count,
    type: file.type
  }
}

/**
 * 根据id获取文件
 * @param id 文件的id
 * @returns 返回一个文件对象
 * @description 根据id获取文件
 */
export async function getFileById(id: string): Promise<FileType | null> {
  try {
    const result = await db.select().from(files).where(eq(files.id, id)).limit(1)

    if (result.length === 0) {
      return null
    }

    return transformDbToFile(result[0])
  } catch (error) {
    console.error('Error getting file by ID:', error)
    throw error
  }
}

/**
 *
 * @param filesToUpsert 要插入或更新的文件。
 * @returns 无返回值。
 * @description 此函数将尝试插入或更新助手记录到数据库中。
 */
export async function upsertFiles(filesToUpsert: FileType[]) {
  try {
    const dbRecords = filesToUpsert.map(transformFileToDb)
    const upsertPromises = dbRecords.map(record =>
      db
        .insert(files)
        .values(record)
        .onConflictDoUpdate({
          target: [files.id],
          set: record
        })
    )
    await Promise.all(upsertPromises)
  } catch (error) {
    console.error('Error upserting assistants:', error)
    throw error
  }
}

/**
 *
 * @param fileId 文件的id
 * @returns 无返回值
 * @description 根据id删除文件
 */
export async function deleteFileById(fileId: string) {
  try {
    await db.delete(files).where(eq(files.id, fileId))
  } catch (error) {
    console.error('Error deleting file by ID:', error)
    throw error
  }
}
