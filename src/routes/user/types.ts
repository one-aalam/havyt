import { FromSchema } from 'json-schema-to-ts'
import { userSchema, userParamsSchema, userCreateSchema } from './schemas'

export type User = FromSchema<typeof userSchema>

export type UserParams = FromSchema<typeof userParamsSchema>

export type UserCreateBody = FromSchema<typeof userCreateSchema>

export type UserUpdateBody = Partial<UserCreateBody>
