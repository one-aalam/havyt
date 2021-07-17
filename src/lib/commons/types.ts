import { FromSchema } from 'json-schema-to-ts'
import { errorSchema } from './schemas'

export type APIError = FromSchema<typeof errorSchema>
