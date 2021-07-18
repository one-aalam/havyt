export const envSchema = {
  type: 'object',
  properties: {
    APP_PORT: { type: 'string', default: 3000 },
    APP_PASS_ALL: { type: 'string', default: 'allowme' },
    APP_FILE_DB: { type: 'string' },
  },
  required: ['APP_PORT', 'APP_FILE_DB'],
  additionalProperties: false,
} as const

export const errorSchema = {
  $id: 'errorSchema',
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    error: { type: 'string' },
    message: { type: 'string' },
  },
  required: ['statusCode', 'error', 'message'],
} as const
