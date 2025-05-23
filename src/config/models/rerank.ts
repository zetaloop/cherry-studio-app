import { Model } from '@/types/agent'

export const RERANKING_REGEX = /(?:rerank|re-rank|re-ranker|re-ranking|retrieval|retriever)/i

export function isRerankModel(model: Model): boolean {
  return model ? RERANKING_REGEX.test(model.id) || false : false
}
