import { FromSchema } from 'json-schema-to-ts'
import { envSchema, errorSchema } from './schemas'
import storeConfig from '../../config/store'

export type EnvConfig = FromSchema<typeof envSchema>
export type APIError = FromSchema<typeof errorSchema>

export type AppColl = keyof typeof storeConfig
