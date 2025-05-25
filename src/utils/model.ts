import { pick } from 'lodash'

import { Model } from '@/types/agent'

export const getModelUniqId = (m?: Model) => {
  return m?.id ? JSON.stringify(pick(m, ['id', 'provider'])) : ''
}
