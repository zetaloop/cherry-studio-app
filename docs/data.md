# Database

使用drizzle + expo-sqlite / zustand

## 客户端数据统计

| 存储方式 | 数据项          | 是否允许丢失 | 数据描述                 |
| -------- | --------------- | ------------ | ------------------------ |
| Redux    | assistants      | ❌           | 助手配置                 |
| Redux    | backup          | ✅           | 备份相关(webdav)         |
| Redux    | copilot         | ✅           | copilot(username/avatar) |
| Redux    | knowledge       | ❌           | 知识库配置               |
| Redux    | llm             | ❌           | llm配置                  |
| Redux    | mcp             | ❌           | MCP配置                  |
| Redux    | nutstore        | ✅           | 坚果云配置               |
| Redux    | paintings       | ❌           | 画图相关配置             |
| Redux    | settings        | ❌           | 用户偏好配置             |
| Redux    | websearch       | ❌           | 网络搜索配置             |
| IndexDB  | files           | ❌           | 文件存储                 |
| IndexDB  | knowledge_notes | ❌           | 知识库笔记               |
| IndexDB  | message_blocks  | ❌           | 消息块数据               |
| IndexDB  | settings        | ✅           | 持久化设置(头像)         |
| IndexDB  | topics          | ❌           | 话题数据                 |

| 类别     | 项目                                                                                |
| -------- | ----------------------------------------------------------------------------------- |
| 运行时   | runtime                                                                             |
| 偏好设置 | settings, backup, nutstore, copilot                                                 |
| 用户数据 | files, topics, messageBlocks, knowledge, llm, websearch, assistants, mcp, paintings |

## 移动端数据库设计

### 数据架构

#### 1. 运行时数据

- **存储方式**: Zustand Store (内存)
- **生命周期**: 应用运行期间
- **持久化**: ❌ 无需持久化
- **特点**: 临时状态、缓存数据
- **数据项**:
  - `runtime`: 应用运行时状态
  - `cache`: 图标、头像等缓存

#### 2. 偏好设置 (Preferences)

- **存储方式**: Zustand + AsyncStorage
- **生命周期**: 跨应用重启
- **持久化**: ✅ 自动持久化
- **特点**:
  - Key-Value 结构
  - 数据量小 (< 1MB)
  - 变更频率低
  - 全局配置
- **数据项**:
  ```
  ├── settings (用户偏好配置)
  ├── backup (备份相关配置)
  ├── nutstore (坚果云配置)
  ├── copilot (copilot配置)
  ├── websearch (网络搜索部分配置)
  └── assistants (助手部分配置)
  ```

#### 3. 用户数据 (User Data)

- **存储方式**: Expo-SQLite + Drizzle ORM
- **生命周期**: 永久存储
- **持久化**: ✅ 强持久化 + 备份
- **特点**:
  - 结构化数据
  - 数据量大
  - 频繁读写
  - 业务核心数据
- **表结构**:

  ```
  ├── files (文件存储)
  ├── topics (话题数据)
  ├── messages (消息数据)
  ├── message_blocks (消息块数据)
  ├── knowledge (知识库配置)
  ├── llm (LLM配置)
  ├── providers (模型提供商配置)
  ├── websearch (网络搜索配置)
  ├── assistants (助手配置)
  ├── mcp (MCP配置)
  └── paintings (画图相关配置)
  ```

### Zustand 数据设计

#### websearch

- ~~providers~~ -> 移动到数据库中
- searchWithTime
- maxResults
- excludeDomains
- subscribeSources
- contentLimit
- providerConfig

#### assistants

- defaultAssistant
- ~~assistants~~ -> 移动到数据库中
- tagsOrder

### User Data数据表设计

#### 1. files 表

| index | file_id(string) | origin_name(string) | created_at(string) | name(string) | path(string)  | size(number) | ext(string) | count(number) | type(FileTypes) |
| ----- | --------------- | ------------------- | ------------------ | ------------ | ------------- | ------------ | ----------- | ------------- | --------------- |
| 0     | uuid            | example.png         | 2025-06-11         | uuid.png     | /path/to/file | 1024         | png         | 1             | image           |

> file_id为主键

#### 2. topics 表

| index | topic_id(string) | message_ids(string[]) |
| ----- | ---------------- | --------------------- |
| 0     | uuid_topic       | [uuid_message]        |

> topic_id为主键
> topic_id为外键，与messages表关联
> 是否需要topics表？，topic可以通过messages表中的topic_id查出对应的message_ids

#### 3. messages 表

| index | message_id(string) | role(string) | assistant_id(string) | topic_id(string) | blocks(string[]) | ... |
| ----- | ------------------ | ------------ | -------------------- | ---------------- | ---------------- | --- |
| 0     | uuid_message       | user         | uuid_assistant       | uuid_topic       | [uuid_block]     | ... |

> message_id为主键
> topic_id为外键，与topics表关联
> message_id为外键，与message_blocks表关联

#### 4. message_blocks 表

| index | id(string) | message_id(string) | ... |
| ----- | ---------- | ------------------ | --- |
| 0     | uuid_block | uuid_message       | ... |

> message_id为外键，与messages表关联

#### 5. knowledge 表

| index | id(string)     | name(string) | model(Model) | ... |
| ----- | -------------- | ------------ | ------------ | --- |
| 0     | uuid_knowledge | 知识库1      | {...}        | ... |

#### 6. llm 表

| index | default_model(Model) | topic_naming_model(Model) | ... |
| ----- | -------------------- | ------------------------- | --- |
| 0     | {...}                | {...}                     | ... |

#### 7. providers 表

| index | id(string) | name(string) | models(Model[]) | ... |
| ----- | ---------- | ------------ | --------------- | --- |
| 0     | openai     | OpenAI       | [{...}]         | ... |

#### 8. websearch_provider 表

| index | id(string) | name(string) | apikey(string) | apihost(string)        |
| ----- | ---------- | ------------ | -------------- | ---------------------- |
| 0     | tavily     | Tavily       | abc123         | https://api.tavily.com |

> provider相关的配置存在这里
> 其他的websearch配置可以存在zustand中，searchWithTime、maxResults等

#### 9. assistants 表

| index | id(string)     | name(string) | prompt(string) | ... |
| ----- | -------------- | ------------ | -------------- | --- |
| 0     | uuid_assistant | '默认助手'   | 'prompt'       | ... |

#### 10. mcp 表

> todo

#### 11. paintings 表

> todo
