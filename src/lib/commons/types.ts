import { FromSchema } from 'json-schema-to-ts'
import { envSchema, errorSchema } from './schemas'
import storeConfig from '../../config/store'

export type EnvConfig = FromSchema<typeof envSchema>
export type APIError = FromSchema<typeof errorSchema>

export interface IHasIdentity {
  id: string
  [key: string]: any
}

export type AppColl = keyof typeof storeConfig

export type AppCollEntryConfig = {
  coll: AppColl
  data?: IHasIdentity[]
  unique?: string
}

export type AppCollConfig = {
  [key: string]: AppCollEntryConfig
}
