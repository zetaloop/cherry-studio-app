import { Directory, File, Paths } from 'expo-file-system/next'
import { unzip } from 'react-native-zip-archive'

import { BackupData, BackupReduxData, IndexedData } from '@/types/databackup'
import { FileType } from '@/types/file'

import { upsertAssistants } from '../../db/queries/assistants.queries'
import { upsertBlocks } from '../../db/queries/messageBlocks.queries'
import { upsertMessages } from '../../db/queries/messages.queries'
import { upsertProviders } from '../../db/queries/providers.queries'
import { upsertWebSearchProviders } from '../../db/queries/websearchProviders.queries'
import { updateTopics } from './TopicService'

const fileStorageDir = new Directory(Paths.cache, 'Files')

async function restoreIndexedDbData(data: IndexedData) {
  console.log('indexedData', data)
  await updateTopics(data.topics)
  await upsertBlocks(data.message_blocks)
  await upsertMessages(data.topics.flatMap(t => t.messages))
}

async function restoreReduxData(data: BackupReduxData) {
  console.log('reduxData', data)
  await upsertProviders(data.llm.providers)
  await upsertAssistants([data.assistants.defaultAssistant, ...data.assistants.assistants])
  await upsertWebSearchProviders(data.websearch.providers)
}

export async function restore(backupFile: Omit<FileType, 'md5'>) {
  console.log('start to restore data...')

  if (!fileStorageDir.exists) {
    fileStorageDir.create({ intermediates: true, overwrite: true })
  }

  try {
    // unzip
    const dataDir = Paths.join(fileStorageDir, backupFile.name.replace('.zip', ''))
    const backupDir = new Directory(dataDir)
    await unzip(backupFile.path, backupDir.uri)

    // read data.json
    const data = JSON.parse(new File(dataDir, 'data.json').text()) as BackupData

    console.log('data: ', data)

    const reduxData: BackupReduxData = data.redux as BackupReduxData
    const indexedData: IndexedData = data.indexedDB as IndexedData
    // restore data
    await restoreIndexedDbData(indexedData)
    await restoreReduxData(reduxData)
  } catch (error) {
    console.log('restore error: ', error)
  }
}
