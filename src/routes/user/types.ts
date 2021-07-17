import { FromSchema } from 'json-schema-to-ts'
import { userSchema, userParamsSchema } from './schemas'

export type User = FromSchema<typeof userSchema>

export type UserParams = FromSchema<typeof userParamsSchema>
