import { Directory, File, Paths } from 'expo-file-system/next'
import { unzip } from 'react-native-zip-archive'

import { BackupData } from '@/types/databackup'
import { FileType } from '@/types/file'

const fileStorageDir = new Directory(Paths.cache, 'Files')

async function restoreTopics(topics: BackupData['indexedDB']['topics']) {
  // restore topics
}

export async function restore(backupFile: Omit<FileType, 'md5'>) {
  console.log('start to restore data...')

  if (!fileStorageDir.exists) {
    fileStorageDir.create({ intermediates: true, overwrite: true })
  }

  try {
    // unzip
    const backupDir = new Directory(fileStorageDir, backupFile.name)
    await unzip(backupFile.path, backupDir.uri)
    console.log('backupDir: ', backupDir)

    // read data.json
    const data = JSON.parse(new File(backupDir.uri, 'data.json').text()) as BackupData

    const reduxData = JSON.parse(data.localStorage['persist:cherry-studio']) as {
      agents
    }

    console.log('reduxData: ', reduxData)

    // restore data
  } catch (error) {
    console.log('restore error: ', error)
  }
}
