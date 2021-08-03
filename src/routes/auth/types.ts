import { FromSchema } from 'json-schema-to-ts'
import { authSignInPayloadSchema } from './schemas'
import { UserCreateBody } from '../user/types'

export type AuthSignInPayload = FromSchema<typeof authSignInPayloadSchema>
export type AuthSignUpPayload = UserCreateBody
