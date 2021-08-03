import { errorSchema } from '../../lib/commons/schemas'
import { userCreateSchema, userRespSchema } from '../user/schemas'

export const authSignInPayloadSchema = {
  $id: 'authSignInPayloadSchema',
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
} as const

export const authSignInSchema = {
  body: authSignInPayloadSchema,
  response: {
    '2xx': userRespSchema,
    '4xx': errorSchema,
  },
} as const

export const authSignUpSchema = {
    body: userCreateSchema,
    response: {
      '2xx': userRespSchema,
      '4xx': errorSchema,
    },
  } as const
