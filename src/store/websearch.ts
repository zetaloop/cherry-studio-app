import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SubscribeSource {
  key: number
  url: string
  name: string
  blacklist?: string[] // 存储从该订阅源获取的黑名单
}

export interface WebSearchState {
  // 默认搜索提供商的ID
  /** @deprecated 支持在快捷菜单中自选搜索供应商，所以这个不再适用 */
  defaultProvider: string
  // providers: WebSearchProvider[]; // <-- 此属性已移除，数据移至 SQLite 数据库 websearch_provider 表

  // 是否在搜索查询中添加当前日期
  searchWithTime: boolean
  // 搜索结果的最大数量
  maxResults: number
  // 要排除的域名列表
  excludeDomains: string[]
  // 订阅源列表
  subscribeSources: SubscribeSource[]
  // 是否覆盖服务商搜索
  /** @deprecated 支持在快捷菜单中自选搜索供应商，所以这个不再适用 */
  overwrite: boolean
  // 内容限制
  contentLimit?: number
  // 具体供应商的配置
  providerConfig: Record<string, any>
}

const initialState: WebSearchState = {
  defaultProvider: 'local-bing',
  // providers 数组已移除，初始数据将从数据库加载或在数据库中初始化
  // providers: [ ... ], // <-- 已移除

  searchWithTime: true,
  maxResults: 5,
  excludeDomains: [],
  subscribeSources: [],
  overwrite: false,
  contentLimit: undefined,
  providerConfig: {}
}

const websearchSlice = createSlice({
  name: 'websearch',
  initialState,
  reducers: {
    // 移除与 providers 数组直接相关的 reducers
    // setWebSearchProviders: (state, action: PayloadAction<WebSearchProvider[]>) => { ... }, // <-- 已移除
    // updateWebSearchProviders: (state, action: PayloadAction<WebSearchProvider[]>) => { ... }, // <-- 已移除
    // updateWebSearchProvider: (state, action: PayloadAction<WebSearchProvider>) => { ... }, // <-- 已移除
    // addWebSearchProvider: (state, action: PayloadAction<WebSearchProvider>) => { ... }, // <-- 已移除

    setDefaultProvider: (state, action: PayloadAction<string>) => {
      state.defaultProvider = action.payload
    },
    setSearchWithTime: (state, action: PayloadAction<boolean>) => {
      state.searchWithTime = action.payload
    },
    setMaxResult: (state, action: PayloadAction<number>) => {
      state.maxResults = action.payload
    },
    setExcludeDomains: (state, action: PayloadAction<string[]>) => {
      state.excludeDomains = action.payload
    },
    // 添加订阅源
    addSubscribeSource: (state, action: PayloadAction<Omit<SubscribeSource, 'key'>>) => {
      state.subscribeSources = state.subscribeSources || []
      const newKey =
        state.subscribeSources.length > 0 ? Math.max(...state.subscribeSources.map(item => item.key)) + 1 : 0
      state.subscribeSources.push({
        key: newKey,
        url: action.payload.url,
        name: action.payload.name,
        blacklist: action.payload.blacklist
      })
    },
    // 删除订阅源
    removeSubscribeSource: (state, action: PayloadAction<number>) => {
      state.subscribeSources = state.subscribeSources.filter(source => source.key !== action.payload)
    },
    // 更新订阅源的黑名单
    updateSubscribeBlacklist: (state, action: PayloadAction<{ key: number; blacklist: string[] }>) => {
      const source = state.subscribeSources.find(s => s.key === action.payload.key)

      if (source) {
        source.blacklist = action.payload.blacklist
      }
    },
    // 更新订阅源列表
    setSubscribeSources: (state, action: PayloadAction<SubscribeSource[]>) => {
      state.subscribeSources = action.payload
    },
    setOverwrite: (state, action: PayloadAction<boolean>) => {
      state.overwrite = action.payload
    },
    setContentLimit: (state, action: PayloadAction<number | undefined>) => {
      state.contentLimit = action.payload
    },
    setProviderConfig: (state, action: PayloadAction<Record<string, any>>) => {
      state.providerConfig = action.payload
    },
    updateProviderConfig: (state, action: PayloadAction<Record<string, any>>) => {
      state.providerConfig = { ...state.providerConfig, ...action.payload }
    }
  }
})

export const {
  setDefaultProvider,
  setSearchWithTime,
  setExcludeDomains,
  setMaxResult,
  addSubscribeSource,
  removeSubscribeSource,
  updateSubscribeBlacklist,
  setSubscribeSources,
  setOverwrite,
  setContentLimit,
  setProviderConfig,
  updateProviderConfig
} = websearchSlice.actions

export default websearchSlice.reducer
