import { FromSchema } from 'json-schema-to-ts'
import { authSchema } from './schemas'

export type AuthLoginPayload = FromSchema<typeof authSchema>
