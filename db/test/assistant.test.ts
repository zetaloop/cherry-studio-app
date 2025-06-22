import { MOCK_ASSISTANTS } from '@/mock/index'
import { Assistant } from '@/types/assistant'

import { db } from '../index'
import { getAllAssistants, upsertAssistants } from '../queries/assistants.queries'
import { assistants } from '../schema'

async function removeAllAssistants() {
  try {
    console.log('[ Cleanup ] Removing all assistants...')
    await db.delete(assistants)
    console.log('[ Cleanup ] Assistants table cleared.')
  } catch (error) {
    console.error('[ Cleanup ] Error removing all assistants:', error)
    throw error
  }
}

// --- Test Functions ---

async function testUpsertAssistants() {
  console.log('\n--- testUpsertAssistants ---')

  await removeAllAssistants()

  const assistantsToInsert = [MOCK_ASSISTANTS[0], MOCK_ASSISTANTS[1]]
  console.log(
    '[ UpsertAssistants - Insert ] Inserting:',
    assistantsToInsert.map(a => a.id)
  )
  await upsertAssistants(assistantsToInsert)

  const assistantsAfterInsert = await getAllAssistants()
  console.log('[ UpsertAssistants Query Result - After Insert ] Found:', assistantsAfterInsert.map(a => a.id).sort())
  const foundAssistant1 = assistantsAfterInsert.find(a => a.id === MOCK_ASSISTANTS[0].id)
  console.log('[ UpsertAssistants Query Result - Assistant 1 Details ]:', {
    id: foundAssistant1?.id,
    name: foundAssistant1?.name,
    enableWebSearch: foundAssistant1?.enableWebSearch,
    tags: foundAssistant1?.tags,
    modelId: foundAssistant1?.model?.id
  })

  const updatedAssistant1: Assistant = {
    ...MOCK_ASSISTANTS[0],
    name: 'Updated Test Assistant 1',
    prompt: 'This is the updated prompt for assistant 1.',
    settings: {
      ...MOCK_ASSISTANTS[0].settings,
      temperature: 0.99
    },
    enableWebSearch: false,
    tags: ['test', 'updated'],
    group: ['new-group']
  }
  const assistantsToUpsert = [updatedAssistant1, MOCK_ASSISTANTS[2]]
  console.log(
    '[ UpsertAssistants - Update/Insert ] Upserting:',
    assistantsToUpsert.map(a => a.id)
  )
  await upsertAssistants(assistantsToUpsert)

  const assistantsAfterUpsert = await getAllAssistants()
  console.log('[ UpsertAssistants Query Result - After Upsert ] Found:', assistantsAfterUpsert.map(a => a.id).sort())
  const updatedFoundAssistant1 = assistantsAfterUpsert.find(a => a.id === updatedAssistant1.id)
  console.log('[ UpsertAssistants Query Result - Updated Assistant 1 Details ]:', {
    id: updatedFoundAssistant1?.id,
    name: updatedFoundAssistant1?.name,
    prompt: updatedFoundAssistant1?.prompt,
    settingsTemp: updatedFoundAssistant1?.settings?.temperature,
    enableWebSearch: updatedFoundAssistant1?.enableWebSearch,
    tags: updatedFoundAssistant1?.tags,
    group: updatedFoundAssistant1?.group
  })
  const foundAssistant3 = assistantsAfterUpsert.find(a => a.id === MOCK_ASSISTANTS[2].id)
  console.log(
    '[ UpsertAssistants Query Result - Assistant 3 Inserted? ]:',
    foundAssistant3 ? 'Yes' : 'No',
    foundAssistant3?.id
  )

  console.log('--- testUpsertAssistants Complete ---')
}

async function testGetAllAssistants() {
  console.log('\n--- testGetAllAssistants ---')

  await removeAllAssistants()

  console.log('[ GetAllAssistants - Empty ] Fetching all assistants from empty table...')
  const assistantsFromEmpty = await getAllAssistants()
  console.log('[ GetAllAssistants Query Result - Empty ] Found:', assistantsFromEmpty.length, 'assistants.')

  await upsertAssistants([MOCK_ASSISTANTS[0], MOCK_ASSISTANTS[1]])
  console.log('[ Setup for GetAllAssistants ] Inserted mock assistants:', [
    MOCK_ASSISTANTS[0].id,
    MOCK_ASSISTANTS[1].id
  ])

  console.log('[ GetAllAssistants - With Data ] Fetching all assistants...')
  const assistantsWithData = await getAllAssistants()
  console.log('[ GetAllAssistants Query Result - With Data ] Found:', assistantsWithData.length, 'assistants.')
  console.log('[ GetAllAssistants Query Result - With Data ] IDs:', assistantsWithData.map(a => a.id).sort())

  const retrievedAssistant1 = assistantsWithData.find(a => a.id === MOCK_ASSISTANTS[0].id)
  console.log('[ GetAllAssistants Query Result - Retrieved Assistant 1 Details ]:', {
    id: retrievedAssistant1?.id,
    name: retrievedAssistant1?.name,
    type: retrievedAssistant1?.type,
    enableWebSearch: retrievedAssistant1?.enableWebSearch,
    tags: retrievedAssistant1?.tags,
    group: retrievedAssistant1?.group,
    model: retrievedAssistant1?.model
  })

  console.log('--- testGetAllAssistants Complete ---')
}

export async function runAllAssistantTests() {
  console.log('\n====================================')
  console.log('>>> Running All Assistant Tests <<<')
  console.log('====================================')

  await removeAllAssistants()
  console.log('[ Global Setup ] Database cleaned for assistants.')

  await testUpsertAssistants()
  await testGetAllAssistants()

  await removeAllAssistants()
  console.log('[ Global Cleanup ] Database cleaned for assistants.')

  console.log('\n====================================')
  console.log('>>> All Assistant Tests Complete <<<')
  console.log('====================================')
}
