import { db } from '../index'
import { backup_providers } from '../schema'

export function transformDbToDataBackupProvider(dbRecord: any) {
  if (dbRecord.id === 'webdav') {
    return {
      webdavHost: dbRecord.config.webdavHost,
      webdavUser: dbRecord.config.webdavUser,
      webdavPass: dbRecord.config.webdavPass,
      webdavPath: dbRecord.config.webdavPath
    }
  }

  if (dbRecord.id === 'nutstore') {
    return {
      nutstoreToken: dbRecord.config.nutstoreToken,
      nutstorePath: dbRecord.config.nutstorePath,
      nutstoreAutoSync: dbRecord.config.nutstoreAutoSync,
      nutstoreSyncInterval: dbRecord.config.nutstoreSyncInterval,
      nutstoreSyncState: dbRecord.config.nutstoreSyncState
    }
  }

  if (dbRecord.id === 'notion') {
    return {
      notionDatabaseID: dbRecord.config.notionDatabaseID,
      notionApiKey: dbRecord.config.notionApiKey,
      notionPageNameKey: dbRecord.config.notionPageNameKey,
      notionExportReasoning: dbRecord.config.notionExportReasoning
    }
  }

  if (dbRecord.id === 'yuque') {
    return {
      yuqueToken: dbRecord.config.yuqueToken,
      yuqueUrl: dbRecord.config.yuqueUrl,
      yuqueRepoId: dbRecord.config.yuqueRepoId
    }
  }

  if (dbRecord.id === 'joplin') {
    return {
      joplinToken: dbRecord.config.joplinToken,
      joplinUrl: dbRecord.config.joplinUrl,
      joplinExportReasoning: dbRecord.config.joplinExportReasoning
    }
  }

  if (dbRecord.id === 'siyuan') {
    return {
      siyuanApiUrl: dbRecord.config.siyuanApiUrl,
      siyuanToken: dbRecord.config.siyuanToken,
      siyuanBoxId: dbRecord.config.siyuanBoxId,
      siyuanRootPath: dbRecord.config.siyuanRootPath
    }
  }
}

export async function upsertDataBackupProviders(providersToUpsert: any[]) {
  try {
    const dbRecords = providersToUpsert.map(provider => {
      const { id, name, ...configProps } = provider
      return {
        id,
        name,
        config: JSON.stringify(configProps)
      }
    })

    const upsertPromises = dbRecords.map(record => {
      return db
        .insert(backup_providers)
        .values(record)
        .onConflictDoUpdate({
          target: [backup_providers.id],
          set: record
        })
    })

    return await Promise.all(upsertPromises)
  } catch (error) {
    console.error('Error upserting backup providers:', error)
    throw error
  }
}
