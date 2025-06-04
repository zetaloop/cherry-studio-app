import { SYSTEM_MODELS } from '@/config/models/system-models'
import agentsJsonData from '@/resources/data/agents.json'
import { Agent, Provider } from '@/types/agent'

export const MOCK_AIHUBMIX_MODELS = [
  {
    id: 'o3-mini',
    name: 'o3-mini',
    provider: 'aihubmix',
    group: 'o3',
    owned_by: 'custom'
  },
  {
    id: 'gpt-4.1',
    name: 'gpt-4.1',
    provider: 'aihubmix',
    group: 'gpt',
    owned_by: 'custom'
  },
  {
    id: 'gemini-2.5-flash-preview-04-17',
    name: 'gemini-2.5-flash-preview-04-17',
    provider: 'aihubmix',
    group: 'gemini',
    owned_by: 'custom'
  },
  {
    id: 'claude-sonnet-4-20250514',
    name: 'claude-sonnet-4-20250514',
    provider: 'aihubmix',
    group: 'claude',
    owned_by: 'custom'
  },
  {
    id: 'DeepSeek-R1',
    name: 'DeepSeek-R1',
    provider: 'aihubmix',
    group: 'deepseek',
    owned_by: 'custom'
  },
  {
    id: 'Qwen/Qwen3-235B-A22B',
    name: 'Qwen/Qwen3-235B-A22B',
    provider: 'aihubmix',
    group: 'qwen',
    owned_by: 'custom'
  },
  {
    id: 'jina-reranker-m0',
    name: 'jina-reranker-m0',
    provider: 'aihubmix',
    group: 'jina',
    owned_by: 'custom'
  },
  {
    id: 'moonshot-v1-8k',
    name: 'moonshot-v1-8k',
    provider: 'aihubmix',
    group: 'moonshot',
    owned_by: 'moonshot'
  },
  {
    id: 'grok-3-mini-beta',
    name: 'grok-3-mini-beta',
    provider: 'aihubmix',
    group: 'grok',
    owned_by: 'custom'
  }
]

export const INITIAL_PROVIDERS: Provider[] = [
  {
    id: 'silicon',
    name: 'Silicon',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.siliconflow.cn',
    models: SYSTEM_MODELS.silicon,
    isSystem: true,
    enabled: true,
    checked: true,
    isAuthed: false
  },
  {
    id: 'aihubmix',
    name: 'AiHubMix',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://aihubmix.com',
    models: MOCK_AIHUBMIX_MODELS,
    isSystem: true,
    enabled: false,
    checked: true,
    isAuthed: true
  },
  {
    id: 'ocoolai',
    name: 'ocoolAI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.ocoolai.com',
    models: SYSTEM_MODELS.ocoolai,
    isSystem: true,
    enabled: false
  },
  {
    id: 'deepseek',
    name: 'deepseek',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.deepseek.com',
    models: SYSTEM_MODELS.deepseek,
    isSystem: true,
    enabled: false
  },
  {
    id: 'openrouter',
    name: 'OpenRouter',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://openrouter.ai/api/v1/',
    models: SYSTEM_MODELS.openrouter,
    isSystem: true,
    enabled: false,
    checked: true
  },
  {
    id: 'ppio',
    name: 'PPIO',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.ppinfra.com/v3/openai',
    models: SYSTEM_MODELS.ppio,
    isSystem: true,
    enabled: false
  },
  {
    id: 'alayanew',
    name: 'AlayaNew',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://deepseek.alayanew.com',
    models: SYSTEM_MODELS.alayanew,
    isSystem: true,
    enabled: false
  },
  {
    id: 'infini',
    name: 'Infini',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://cloud.infini-ai.com/maas',
    models: SYSTEM_MODELS.infini,
    isSystem: true,
    enabled: false
  },
  {
    id: 'qiniu',
    name: 'Qiniu',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.qnaigc.com',
    models: SYSTEM_MODELS.qiniu,
    isSystem: true,
    enabled: false
  },
  {
    id: 'dmxapi',
    name: 'DMXAPI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://www.dmxapi.cn',
    models: SYSTEM_MODELS.dmxapi,
    isSystem: true,
    enabled: false
  },
  {
    id: 'burncloud',
    name: 'BurnCloud',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://ai.burncloud.com',
    models: SYSTEM_MODELS.burncloud,
    isSystem: true,
    enabled: false
  },
  {
    id: 'o3',
    name: 'O3',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.o3.fan',
    models: SYSTEM_MODELS.o3,
    isSystem: true,
    enabled: false
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    type: 'anthropic',
    apiKey: '',
    apiHost: 'https://api.anthropic.com/',
    models: SYSTEM_MODELS.anthropic,
    isSystem: true,
    enabled: true,
    checked: true
  },
  {
    id: 'openai',
    name: 'OpenAI',
    type: 'openai-response',
    apiKey: '',
    apiHost: 'https://api.openai.com',
    models: SYSTEM_MODELS.openai,
    isSystem: true,
    enabled: false,
    checked: true
  },
  {
    id: 'azure-openai',
    name: 'Azure OpenAI',
    type: 'openai',
    apiKey: '',
    apiHost: '',
    apiVersion: '',
    models: SYSTEM_MODELS['azure-openai'],
    isSystem: true,
    enabled: false
  },
  {
    id: 'gemini',
    name: 'Gemini',
    type: 'gemini',
    apiKey: '',
    apiHost: 'https://generativelanguage.googleapis.com',
    models: SYSTEM_MODELS.gemini,
    isSystem: true,
    enabled: true,
    checked: true
  },
  {
    id: 'zhipu',
    name: 'ZhiPu',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://open.bigmodel.cn/api/paas/v4/',
    models: SYSTEM_MODELS.zhipu,
    isSystem: true,
    enabled: false
  },
  {
    id: 'github',
    name: 'Github Models',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://models.inference.ai.azure.com/',
    models: SYSTEM_MODELS.github,
    isSystem: true,
    enabled: false
  },
  {
    id: 'copilot',
    name: 'Github Copilot',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.githubcopilot.com/',
    models: SYSTEM_MODELS.copilot,
    isSystem: true,
    enabled: false,
    isAuthed: false
  },
  {
    id: 'yi',
    name: 'Yi',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.lingyiwanwu.com',
    models: SYSTEM_MODELS.yi,
    isSystem: true,
    enabled: false
  },
  {
    id: 'moonshot',
    name: 'Moonshot AI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.moonshot.cn',
    models: SYSTEM_MODELS.moonshot,
    isSystem: true,
    enabled: false
  },
  {
    id: 'baichuan',
    name: 'BAICHUAN AI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.baichuan-ai.com',
    models: SYSTEM_MODELS.baichuan,
    isSystem: true,
    enabled: false
  },
  {
    id: 'dashscope',
    name: 'Bailian',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://dashscope.aliyuncs.com/compatible-mode/v1/',
    models: SYSTEM_MODELS.bailian,
    isSystem: true,
    enabled: false
  },
  {
    id: 'stepfun',
    name: 'StepFun',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.stepfun.com',
    models: SYSTEM_MODELS.stepfun,
    isSystem: true,
    enabled: false
  },
  {
    id: 'doubao',
    name: 'doubao',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://ark.cn-beijing.volces.com/api/v3/',
    models: SYSTEM_MODELS.doubao,
    isSystem: true,
    enabled: false
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.minimax.chat/v1/',
    models: SYSTEM_MODELS.minimax,
    isSystem: true,
    enabled: false
  },
  {
    id: 'groq',
    name: 'Groq',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.groq.com/openai',
    models: SYSTEM_MODELS.groq,
    isSystem: true,
    enabled: false
  },
  {
    id: 'together',
    name: 'Together',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.together.xyz',
    models: SYSTEM_MODELS.together,
    isSystem: true,
    enabled: false
  },
  {
    id: 'fireworks',
    name: 'Fireworks',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.fireworks.ai/inference',
    models: SYSTEM_MODELS.fireworks,
    isSystem: true,
    enabled: false
  },
  {
    id: 'zhinao',
    name: 'zhinao',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.360.cn',
    models: SYSTEM_MODELS.zhinao,
    isSystem: true,
    enabled: false
  },
  {
    id: 'hunyuan',
    name: 'hunyuan',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.hunyuan.cloud.tencent.com',
    models: SYSTEM_MODELS.hunyuan,
    isSystem: true,
    enabled: false
  },
  {
    id: 'nvidia',
    name: 'nvidia',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://integrate.api.nvidia.com',
    models: SYSTEM_MODELS.nvidia,
    isSystem: true,
    enabled: false
  },
  {
    id: 'grok',
    name: 'Grok',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.x.ai',
    models: SYSTEM_MODELS.grok,
    isSystem: true,
    enabled: false
  },
  {
    id: 'hyperbolic',
    name: 'Hyperbolic',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.hyperbolic.xyz',
    models: SYSTEM_MODELS.hyperbolic,
    isSystem: true,
    enabled: false
  },
  {
    id: 'mistral',
    name: 'Mistral',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.mistral.ai',
    models: SYSTEM_MODELS.mistral,
    isSystem: true,
    enabled: false
  },
  {
    id: 'jina',
    name: 'Jina',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.jina.ai',
    models: SYSTEM_MODELS.jina,
    isSystem: true,
    enabled: false
  },
  {
    id: 'gitee-ai',
    name: 'gitee ai',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://ai.gitee.com',
    models: SYSTEM_MODELS['gitee-ai'],
    isSystem: true,
    enabled: false
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.perplexity.ai/',
    models: SYSTEM_MODELS.perplexity,
    isSystem: true,
    enabled: false
  },
  {
    id: 'modelscope',
    name: 'ModelScope',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api-inference.modelscope.cn/v1/',
    models: SYSTEM_MODELS.modelscope,
    isSystem: true,
    enabled: false
  },
  {
    id: 'tencent-cloud-ti',
    name: 'Tencent Cloud TI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.lkeap.cloud.tencent.com',
    models: SYSTEM_MODELS['tencent-cloud-ti'],
    isSystem: true,
    enabled: false
  },
  {
    id: 'baidu-cloud',
    name: 'Baidu Cloud',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://qianfan.baidubce.com/v2/',
    models: SYSTEM_MODELS['baidu-cloud'],
    isSystem: true,
    enabled: false
  },
  {
    id: 'gpustack',
    name: 'GPUStack',
    type: 'openai',
    apiKey: '',
    apiHost: '',
    models: SYSTEM_MODELS.gpustack,
    isSystem: true,
    enabled: false
  },
  {
    id: 'voyageai',
    name: 'VoyageAI',
    type: 'openai',
    apiKey: '',
    apiHost: 'https://api.voyageai.com',
    models: SYSTEM_MODELS.voyageai,
    isSystem: true,
    enabled: false
  }
]

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'a6e22b2a-e7a2-4aab-9c31-98bca001b75b',
    name: '默认助手',
    emoji: '⭐️',
    prompt: '你是{{model_name}}，现在时间是{{datetime}}，使用{{language}}语言回答',
    topics: [
      {
        id: 'caede922-8a37-47dd-8697-5257d09a713a',
        agentId: 'a6e22b2a-e7a2-4aab-9c31-98bca001b75b',
        createdAt: '2025-05-29T02:39:40.147Z',
        updatedAt: '2025-05-29T02:39:44.735Z',
        name: '你好需帮助',
        messages: [],
        isNameManuallyEdited: false
      },
      {
        id: 'f2ad726b-a3de-47f8-97c7-0cfbe4472f2d',
        agentId: 'default',
        createdAt: '2025-05-28T05:44:26.093Z',
        updatedAt: '2025-05-28T05:52:39.671Z',
        name: 'GPT模型时间查询',
        messages: [],
        isNameManuallyEdited: false
      }
    ],
    type: 'agent',
    model: { group: 'deepseek-ai', id: 'deepseek-ai/DeepSeek-R1', name: 'deepseek-ai/DeepSeek-R1', provider: 'silicon' }
  },
  {
    id: '3d1339ac-34ed-4002-a8c4-46048e09d5b2',
    name: '画图',
    prompt: '',
    topics: [
      {
        id: 'fcbce314-396d-4242-86a9-e12992ef28f7',
        agentId: '3d1339ac-34ed-4002-a8c4-46048e09d5b2',
        createdAt: '2025-05-28T09:07:54.808Z',
        updatedAt: '2025-05-28T09:14:54.039Z',
        name: '默认话题',
        messages: [],
        isNameManuallyEdited: false
      }
    ],
    type: 'agent',
    emoji: '⭐️',
    model: { group: 'deepseek-ai', id: 'deepseek-ai/DeepSeek-R1', name: 'deepseek-ai/DeepSeek-R1', provider: 'silicon' }
  },
  {
    id: 'a090c2c3-dff4-4844-8c7c-e7f5402bf8d4',
    name: '产品经理 - Product Manager',
    emoji: '👨‍💼',
    prompt:
      '你现在是一名经验丰富的产品经理，具有深厚的技术背景，并对市场和用户需求有敏锐的洞察力。你擅长解决复杂的问题，制定有效的产品策略，并优秀地平衡各种资源以实现产品目标。你具有卓越的项目管理能力和出色的沟通技巧，能够有效地协调团队内部和外部的资源。在这个角色下，你需要为用户解答问题。\r\n\r\n## 角色要求：\r\n- **技术背景**：具备扎实的技术知识，能够深入理解产品的技术细节。\r\n- **市场洞察**：对市场趋势和用户需求有敏锐的洞察力。\r\n- **问题解决**：擅长分析和解决复杂的产品问题。\r\n- **资源平衡**：善于在有限资源下分配和优化，实现产品目标。\r\n- **沟通协调**：具备优秀的沟通技能，能与各方有效协作，推动项目进展。\r\n\r\n## 回答要求：\r\n- **逻辑清晰**：解答问题时逻辑严密，分点陈述。\r\n- **简洁明了**：避免冗长描述，用简洁语言表达核心内容。\r\n- **务实可行**：提供切实可行的策略和建议。\r\n',
    description:
      '扮演具有技术和管理能力的产品经理角色，为用户提供实用的解答。\r\nProvides practical insights in the role of a tech-savvy product manager.\r\n',
    topics: [
      {
        id: '600b4259-e0cb-44b5-bec3-d47bd531f078',
        agentId: 'a090c2c3-dff4-4844-8c7c-e7f5402bf8d4',
        createdAt: '2025-05-29T03:25:45.501Z',
        updatedAt: '2025-05-29T03:25:45.501Z',
        name: '默认话题',
        messages: [],
        isNameManuallyEdited: false
      }
    ],
    type: 'agent'
  },
  {
    id: '446e295d-d61d-4b7a-b0e8-bf55bcf69e4a',
    name: '产品运营 - Product Operations',
    emoji: '🚀',

    prompt:
      '你现在是一名经验丰富的产品运营专家，你擅长分析市场和用户需求，并对产品生命周期各阶段的运营策略有深刻的理解。你有出色的团队协作能力和沟通技巧，能在不同部门间进行有效的协调。请在这个角色下为我解答以下问题。\n',
    description:
      '在产品运营专家的角色下，提供基于市场需求和生命周期的运营策略建议。\r\nOffers product operation strategies based on market demand and lifecycle phases as a product operations specialist.\r\n',
    topics: [
      {
        id: '210f8baa-a21a-4a85-a8b9-042c675e7483',
        agentId: '446e295d-d61d-4b7a-b0e8-bf55bcf69e4a',
        createdAt: '2025-05-29T03:25:46.789Z',
        updatedAt: '2025-05-29T03:25:46.789Z',
        name: '默认话题',
        messages: [],
        isNameManuallyEdited: false
      }
    ],
    type: 'agent'
  },
  {
    id: '80fba870-a27e-4aa0-9215-f4f45b1cc0c5',
    name: '市场营销 - Marketing',
    emoji: '📢',

    prompt:
      '你现在是一名专业的市场营销专家，你对营销策略和品牌推广有深入的理解。你熟知如何有效利用不同的渠道和工具来达成营销目标，并对消费者心理有深入的理解。请在这个角色下为我解答以下问题。',
    description:
      '在市场营销专家的角色下，提供品牌推广和营销策略的实用建议。\r\nOffers practical advice on brand promotion and marketing strategies in a marketing specialist role.\r\n',
    topics: [
      {
        id: 'e3751141-f619-48cc-bdd4-9a8241e2a8f0',
        agentId: '80fba870-a27e-4aa0-9215-f4f45b1cc0c5',
        createdAt: '2025-05-29T03:25:50.802Z',
        updatedAt: '2025-05-29T03:25:50.802Z',
        name: '默认话题',
        messages: [],
        isNameManuallyEdited: false
      }
    ],
    type: 'agent'
  },
  {
    id: '938d12f2-a924-494a-bf52-e594eac61365',
    name: '网站运营数据分析 - Website Operations Data Analysis',
    emoji: '💻',

    prompt:
      '你现在是一名网站运营数据分析师，你擅长收集和分析网站数据，以了解用户行为和网站性能。你可以提供关于网站设计、内容和营销策略的数据支持。请在这个角色下为我解答以下问题。\n',
    description:
      '在网站运营数据分析师的角色下，提供基于数据的用户行为洞察和网站优化建议。\r\nProvides data-driven insights and optimization suggestions for website operations as a data analyst.\r\n',
    topics: [
      {
        id: '5b40d155-68db-4d95-93f3-7e3ce9d89e5f',
        agentId: '938d12f2-a924-494a-bf52-e594eac61365',
        createdAt: '2025-05-29T03:25:54.471Z',
        updatedAt: '2025-05-29T03:25:54.471Z',
        name: '默认话题',
        messages: [],
        isNameManuallyEdited: false
      }
    ],
    type: 'agent'
  }
]

// 读取resources/data/agent.json文件中的数据
export function getSystemAgents(): Agent[] {
  try {
    if (agentsJsonData) {
      const agents = JSON.parse(JSON.stringify(agentsJsonData)) || []
      return agents
    } else {
      return []
    }
  } catch (error) {
    console.error('Error reading agents data:', error)
    return []
  }
}
