import { eq } from 'drizzle-orm'

import { Provider } from '@/types/assistant'
import { WebSearchProvider } from '@/types/websearch'

import { db } from '..'
import { providers, websearch_providers } from '../schema'

/**
 * 将数据库记录转换为 Provider 类型。
 * @param dbRecord - 从数据库检索的记录。
 * @returns 一个 Provider 对象。
 */
export function transformDbToProvider(dbRecord: any): Provider {
  const safeJsonParse = (jsonString: string | null, defaultValue: any = undefined) => {
    if (typeof jsonString !== 'string') {
      return defaultValue
    }

    try {
      return JSON.parse(jsonString)
    } catch (e) {
      console.error('JSON parse error for string:', jsonString)
      return defaultValue
    }
  }

  return {
    id: dbRecord.id,
    type: dbRecord.type,
    name: dbRecord.name,
    apiKey: dbRecord.api_key,
    apiHost: dbRecord.api_host,
    apiVersion: dbRecord.api_version,
    models: dbRecord.models ? safeJsonParse(dbRecord.models) : [],
    enabled: !!dbRecord.enabled,
    checked: !!dbRecord.checked,
    isSystem: !!dbRecord.is_system,
    isAuthed: !!dbRecord.is_authed,
    rateLimit: dbRecord.rate_limit,
    isNotSupportArrayContent: !!dbRecord.is_not_support_array_content,
    notes: dbRecord.notes
  }
}

/**
 * 将 Provider 对象转换为数据库记录格式。
 * @param provider - Provider 对象。
 * @returns 一个适合数据库操作的对象。
 */
function transformProviderToDb(provider: Provider): any {
  return {
    id: provider.id,
    type: provider.type,
    name: provider.name,
    api_key: provider.apiKey,
    api_host: provider.apiHost,
    api_version: provider.apiVersion,
    models: JSON.stringify(provider.models || []),
    enabled: provider.enabled ? 1 : 0,
    checked: provider.checked ? 1 : 0,
    is_system: provider.isSystem ? 1 : 0,
    is_authed: provider.isAuthed ? 1 : 0,
    rate_limit: provider.rateLimit,
    is_not_support_array_content: provider.isNotSupportArrayContent ? 1 : 0,
    notes: provider.notes
  }
}

/**
 * 更新或插入 Provider 数据到数据库。
 * @param providersToUpsert - 要更新或插入的 Provider 数组。
 */
export async function upsertProviders(providersToUpsert: Provider[]) {
  try {
    const dbRecords = providersToUpsert.map(transformProviderToDb)
    const upsertPromises = dbRecords.map(record =>
      db
        .insert(providers)
        .values(record)
        .onConflictDoUpdate({
          target: [providers.id],
          set: record
        })
    )
    await Promise.all(upsertPromises)
  } catch (error) {
    console.error('Error in upsertProviders:', error)
    throw error
  }
}

export async function getProviderById(providerId: string): Promise<Provider | undefined> {
  try {
    const result = await db.select().from(providers).where(eq(providers.id, providerId)).limit(1)

    if (result.length === 0) {
      return undefined
    }

    return transformDbToProvider(result[0])
  } catch (error) {
    console.error('Error in getProviderById:', error)
    throw error
  }
}

export async function getAllProviders(): Promise<Provider[]> {
  try {
    const result = await db.select().from(providers)

    if (result.length === 0) {
      return []
    }

    return result.map(transformDbToProvider)
  } catch (error) {
    console.error('Error in getAllProviders:', error)
    throw error
  }
}

/**
 * 将数据库记录转换为 WebSearchProvider 类型。
 * @param dbRecord
 * @return 一个 WebSearchProvider 对象。
 */
export function transformDbToWebSearchProvider(dbRecord: any): WebSearchProvider {
  const safeJsonParse = (jsonString: string | null, defaultValue: any = undefined) => {
    if (typeof jsonString !== 'string') {
      return defaultValue
    }

    try {
      return JSON.parse(jsonString)
    } catch (e) {
      console.error('JSON parse error for string:', jsonString)
      return defaultValue
    }
  }

  return {
    id: dbRecord.id,
    name: dbRecord.name,
    type: dbRecord.url ? 'free' : 'api',
    apiKey: dbRecord.api_key,
    apiHost: dbRecord.api_host,
    engines: dbRecord.engines ? safeJsonParse(dbRecord.engines) : [],
    url: dbRecord.url,
    basicAuthUsername: dbRecord.basic_auth_username,
    basicAuthPassword: dbRecord.basic_auth_password,
    contentLimit: dbRecord.content_limit,
    usingBrowser: !!dbRecord.using_browser
  }
}

/**
 * 将 WebSearchProvider 对象转换为数据库记录格式。
 * @param provider - WebSearchProvider 对象。
 * @returns 一个适合数据库操作的对象。
 */
function transformWebSearchProviderToDb(provider: WebSearchProvider): any {
  return {
    id: provider.id,
    name: provider.name,
    api_key: provider.apiKey,
    api_host: provider.apiHost,
    engines: provider.engines ? JSON.stringify(provider.engines) : null,
    url: provider.url,
    basic_auth_username: provider.basicAuthUsername,
    basic_auth_password: provider.basicAuthPassword,
    content_limit: provider.contentLimit,
    using_browser: provider.usingBrowser ? 1 : 0
  }
}

/**
 * 更新或插入 WebSearchProvider 数据到数据库。
 * @param providersToUpsert - 要更新或插入的 WebSearchProvider 数组。
 */
export async function upsertWebSearchProviders(providersToUpsert: WebSearchProvider[]) {
  try {
    const dbRecords = providersToUpsert.map(transformWebSearchProviderToDb)
    const upsertPromises = dbRecords.map(record =>
      db
        .insert(websearch_providers)
        .values(record)
        .onConflictDoUpdate({
          target: [websearch_providers.id],
          set: record
        })
    )
    await Promise.all(upsertPromises)
  } catch (error) {
    console.error('Error in upsertWebSearchProviders:', error)
    throw error
  }
}

export async function getWebSearchProviderById(providerId: string): Promise<WebSearchProvider | undefined> {
  try {
    const result = await db.select().from(websearch_providers).where(eq(websearch_providers.id, providerId)).limit(1)

    if (result.length === 0) {
      return undefined
    }

    return transformDbToWebSearchProvider(result[0])
  } catch (error) {
    console.error('Error in getWebSearchProviderById:', error)
    throw error
  }
}

export async function getAllWebSearchProviders(): Promise<WebSearchProvider[]> {
  try {
    const result = await db.select().from(websearch_providers)

    if (result.length === 0) {
      return []
    }

    return result.map(transformDbToWebSearchProvider)
  } catch (error) {
    console.error('Error in getAllWebSearchProviders:', error)
    throw error
  }
}
