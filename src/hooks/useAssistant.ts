import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { assistants as assistantsSchema } from '../../db/schema'
import { useLiveQuery } from 'drizzle-orm/expo-sqlite'
import { transformDbToAssistant, upsertAssistants } from '../../db/queries/assistants.queries'
import { Assistant } from '@/types/assistant'

export function useAssistant(assistantId: string) {
  const query = db.select().from(assistantsSchema).where(eq(assistantsSchema.id, assistantId))

  const { data: rawAssistant, updatedAt } = useLiveQuery(query)

  const updateAssistant = async (assistant: Assistant) => {
    await upsertAssistants([assistant])
  }

  if (!updatedAt) {
    return {
      assistant: null,
      isLoading: true,
      updateAssistant
    }
  }
  const processedAssistant = transformDbToAssistant(rawAssistant[0])

  return {
    assistant: processedAssistant,
    isLoading: false,
    updateAssistant
  }
}
