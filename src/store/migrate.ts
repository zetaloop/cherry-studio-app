import { createMigrate } from 'redux-persist'

const migrateConfig = {}

const migrate = createMigrate(migrateConfig as any)

export default migrate
