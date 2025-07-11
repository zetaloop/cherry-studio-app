import { Directory, File, Paths } from 'expo-file-system/next'
import { unzip } from 'react-native-zip-archive'

import { BackupData, BackupReduxData, IndexedData } from '@/types/databackup'
import { FileType } from '@/types/file'

import { upsertAssistants } from '../../db/queries/assistants.queries'
import { upsertBlocks } from '../../db/queries/messageBlocks.queries'
import { upsertMessages } from '../../db/queries/messages.queries'
import { upsertProviders } from '../../db/queries/providers.queries'
import { upsertWebSearchProviders } from '../../db/queries/websearchProviders.queries'
import { upsertTopics } from './TopicService'

const fileStorageDir = new Directory(Paths.cache, 'Files')

// 定义进度的步骤ID和状态
export type RestoreStepId =
  | 'restore_topics'
  | 'restore_messages_blocks'
  | 'restore_llm_providers'
  | 'restore_assistants'
  | 'restore_websearch'

export type StepStatus = 'pending' | 'in_progress' | 'completed' | 'error'

export type ProgressUpdate = {
  step: RestoreStepId
  status: StepStatus
  error?: string
}

type OnProgressCallback = (update: ProgressUpdate) => void
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 我们将把恢复逻辑拆分得更细，以便报告进度
async function restoreIndexedDbData(data: IndexedData, onProgress: OnProgressCallback) {
  onProgress({ step: 'restore_topics', status: 'in_progress' })
  await upsertTopics(data.topics)
  onProgress({ step: 'restore_topics', status: 'completed' })
  await sleep(1000) // Mock delay

  onProgress({ step: 'restore_messages_blocks', status: 'in_progress' })
  await upsertBlocks(data.message_blocks)
  await upsertMessages(data.topics.flatMap(t => t.messages))
  onProgress({ step: 'restore_messages_blocks', status: 'completed' })
  await sleep(1000) // Mock delay
}

async function restoreReduxData(data: BackupReduxData, onProgress: OnProgressCallback) {
  onProgress({ step: 'restore_llm_providers', status: 'in_progress' })
  await upsertProviders(data.llm.providers)
  onProgress({ step: 'restore_llm_providers', status: 'completed' })
  await sleep(1000) // Mock delay

  onProgress({ step: 'restore_assistants', status: 'in_progress' })
  await upsertAssistants([data.assistants.defaultAssistant, ...data.assistants.assistants])
  onProgress({ step: 'restore_assistants', status: 'completed' })
  await sleep(1000) // Mock delay

  onProgress({ step: 'restore_websearch', status: 'in_progress' })
  await upsertWebSearchProviders(data.websearch.providers)
  onProgress({ step: 'restore_websearch', status: 'completed' })
  await sleep(1000) // Mock delay
}

export async function restore(backupFile: Omit<FileType, 'md5'>, onProgress: OnProgressCallback) {
  console.log('start to restore data...')

  if (!fileStorageDir.exists) {
    fileStorageDir.create({ intermediates: true, overwrite: true })
  }

  try {
    // 1. Unzip
    const dataDir = Paths.join(fileStorageDir, backupFile.name.replace('.zip', ''))
    const backupDir = new Directory(dataDir)
    await unzip(backupFile.path, backupDir.uri)

    // 2. Read data.json
    const data = JSON.parse(new File(dataDir, 'data.json').text()) as BackupData
    console.log('data: ', data)

    const reduxData: BackupReduxData = data.redux as BackupReduxData
    const indexedData: IndexedData = data.indexedDB as IndexedData

    // 3. Restore data by calling sub-functions
    await restoreIndexedDbData(indexedData, onProgress)
    await restoreReduxData(reduxData, onProgress)
  } catch (error) {
    console.log('restore error: ', error)
    // 在发生错误时，将所有正在进行的步骤标记为错误
    throw error // 重新抛出错误，以便UI层可以捕获它
  }
}
