import { errorSchema } from '../../lib/commons/schemas'
import { userSchema } from '../user/schemas'

export const authSchema = {
  $id: 'authSchema',
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
  },
  required: ['email', 'password'],
  additionalProperties: false,
} as const

export const loginSchema = {
  body: { user: authSchema },
  response: {
    '2xx': userSchema,
    '4xx': errorSchema,
  },
}
