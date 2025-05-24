import { createMigrate } from 'redux-persist'

import { RootState } from '.'
import { INITIAL_PROVIDERS } from './llm'

// add provider to state
function addProvider(state: RootState, id: string) {
  if (!state.llm.providers.find(p => p.id === id)) {
    const _provider = INITIAL_PROVIDERS.find(p => p.id === id)

    if (_provider) {
      state.llm.providers.push(_provider)
    }
  }
}

const migrateConfig = {
  '2': (state: RootState) => {
    try {
      INITIAL_PROVIDERS.forEach(provider => {
        addProvider(state, provider.id)
      })
      return state
    } catch (e) {
      return state
    }
  }
}

const migrate = createMigrate(migrateConfig as any)

export default migrate
