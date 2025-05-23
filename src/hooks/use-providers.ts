import { useAppDispatch, useAppSelector } from '@/store'
import { addModel, removeModel, updateModel, updateProvider } from '@/store/llm'
import { Model, Provider } from '@/types/agent'

export function useAllProviders() {
  return useAppSelector(state => state.llm.providers)
}

export function useProvider(id: string) {
  const provider = useAppSelector(state => state.llm.providers.find(p => p.id === id) as Provider)
  const dispatch = useAppDispatch()

  return {
    provider,
    models: provider?.models || [],
    updateProvider: (provider: Provider) => dispatch(updateProvider(provider)),
    addModel: (model: Model) => dispatch(addModel({ providerId: id, model })),
    removeModel: (model: Model) => dispatch(removeModel({ providerId: id, model })),
    updateModel: (model: Model) => dispatch(updateModel({ providerId: id, model }))
  }
}
