import { useAppSelector } from '@/store'

export function useAllProviders() {
  return useAppSelector(state => state.llm.providers)
}
