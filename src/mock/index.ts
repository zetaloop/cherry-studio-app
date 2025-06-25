import { WebSearchProvider } from '@/types/websearch'

export const INITIAL_WEBSEARCH_PROVIDERS: WebSearchProvider[] = [
  {
    id: 'tavily',
    name: 'Tavily',
    type: 'api',
    apiHost: 'https://api.tavily.com',
    apiKey: ''
  },
  {
    id: 'exa',
    name: 'Exa',
    type: 'api',
    apiHost: 'https://api.exa.ai',
    apiKey: '123'
  },
  {
    id: 'bocha',
    name: 'Bocha',
    type: 'api',
    apiHost: 'https://api.bochaai.com',
    apiKey: ''
  },
  {
    id: 'searxng',
    name: 'Searxng',
    type: 'free',
    apiHost: '',
    basicAuthUsername: '',
    basicAuthPassword: ''
  },
  {
    id: 'local-google',
    name: 'Google',
    type: 'free',
    url: 'https://www.google.com/search?q=%s'
  },
  {
    id: 'local-bing',
    name: 'Bing',
    type: 'free',
    url: 'https://cn.bing.com/search?q=%s&ensearch=1'
  },
  {
    id: 'local-baidu',
    name: 'Baidu',
    type: 'free',
    url: 'https://www.baidu.com/s?wd=%s'
  }
]
