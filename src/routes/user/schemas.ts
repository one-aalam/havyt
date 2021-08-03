import { errorSchema } from '../../lib/commons/schemas'
import userConfig from '../../config/user'

export const userSchemaPublicProps = {
    username: { type: 'string', minLength: 3 },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string', format: 'email' },
    avatar: { type: 'string' },
} as const

export const userCreateSchema = {
    $id: 'userCreateSchema',
    type: 'object',
    properties: {
        ...userSchemaPublicProps,
        password: { type: 'string', minLength: 6, maxLength: 15, pattern: userConfig.passRegex },
    },
    required: ['username', 'email', 'password' ],
    additionalProperties: false,
} as const

export const userSchema = {
  $id: 'userSchema',
  type: 'object',
  properties: {
    id: { type: 'number' },
    ...userCreateSchema.properties,
  },
  required: ['id', 'username', 'email'],
  additionalProperties: false,
} as const

export const userRespSchema = {
    $id: 'userRespSchema',
    type: 'object',
    properties: {
      id: { type: 'number' },
      ...userSchemaPublicProps,
    },
    required: ['id', 'username', 'email'],
    additionalProperties: false,
  } as const

export const userUpdateSchema = {
    ...userCreateSchema,
    $id: 'userUpdateSchema',
    required: [],
  } as const

export const userParamsSchema = {
  $id: 'userParamsSchema',
  type: 'object',
  properties: {
    id: { type: 'number' },
  },
  required: ['id'],
  additionalProperties: false,
} as const

export const getAllUsersSchema = {
    response: {
      200: {
        type: 'array',
        items: userRespSchema,
      },
      '4xx': errorSchema,
    },
}

export const getUserSchema = {
  params: userParamsSchema,
  response: {
    '2xx': userRespSchema,
    '4xx': errorSchema,
  },
}


  export const createUserSchema = {
    body: userCreateSchema,
    response: {
      '2xx': userRespSchema,
      '4xx': errorSchema,
    },
  }

  export const updateUserSchema = {
    params: userParamsSchema,
    body: userUpdateSchema,
    response: {
      '2xx': userRespSchema,
      '4xx': errorSchema,
      '5xx': errorSchema,
    },
  }

  export const deleteUserSchema = {
    params: userParamsSchema,
    response: {
      '2xx': userRespSchema,
      '4xx': errorSchema,
    },
  }
