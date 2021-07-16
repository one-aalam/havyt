import { FromSchema } from 'json-schema-to-ts'
import { recipeSchema, userSchema, errorSchema, authSchema } from './schemas'

export type Recipe = FromSchema<typeof recipeSchema>
export type User = FromSchema<typeof userSchema>

export type AuthLoginPayload = FromSchema<typeof authSchema>

export type APIError = FromSchema<typeof errorSchema>
