import { errorSchema } from '../../lib/commons/schemas'
import { userCreateSchema } from '../user/schemas'

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

export const authTokenSchema = {
    $id: 'authTokenSchema',
    type: 'object',
    properties: {
        accessToken: { type: 'string' },
        tokenType: { type: 'string' },
        expiresIn: { type: 'number' },
        expiresAt: { type: 'number' }
    },
    required: ['accessToken', 'tokenType', 'expiresIn', 'expiresAt' ],
    additionalProperties: false,
  } as const

  export const authAppMetaDataSchema = {
    $id: 'authAppMetaDataSchema',
    type: 'object',
    properties: {
        provider: { type: 'string' },
    },
    required: ['provider' ],
    additionalProperties: false,
  } as const

export const authSignUpRespSchema = {
    $id: 'authSignUpRespSchema',
    type: 'object',
    properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        appMetadata: authAppMetaDataSchema
    },
    required: ['id', 'email', 'appMetadata' ],
    additionalProperties: false,
  } as const

  export const authSignInRespSchema = {
    $id: 'authSignInRespSchema',
    type: 'object',
    properties: {
        token: authTokenSchema,
        ...authSignUpRespSchema.properties
    },
    required: ['id', 'email', 'token', 'appMetadata' ],
    additionalProperties: false,
  } as const

export const authSignInSchema = {
  body: authSignInPayloadSchema,
  response: {
    '2xx': authSignInRespSchema,
    '4xx': errorSchema,
  },
} as const

export const authSignUpSchema = {
    body: userCreateSchema,
    response: {
      '2xx': authSignUpRespSchema,
      '4xx': errorSchema,
    },
  } as const
