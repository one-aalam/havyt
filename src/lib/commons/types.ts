import { FromSchema } from 'json-schema-to-ts'
import { errorSchema } from './schemas'
import storeConfig from '../../config/store'

export type APIError = FromSchema<typeof errorSchema>

export type AppColl = keyof typeof storeConfig
