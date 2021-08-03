import { errorSchema } from '../../lib/commons/schemas'
/**
 * JSON schema for the API routes
 */

export const categoryCreateSchema = {
  $id: 'categoryCreateSchema',
  type: 'object',
  properties: {
    type: { type: 'string', minLength: 3 },
    name: { type: 'string' },
    desc: { type: 'string' },
  },
  required: ['type', 'name'],
  additionalProperties: false,
} as const

export const categorySchema = {
  $id: 'categorySchema',
  type: 'object',
  properties: {
    id: { type: 'string' },
    ...categoryCreateSchema.properties,
  },
  required: ['id', 'type', 'name'],
  additionalProperties: false,
} as const

export const categoryUpdateSchema = {
  ...categoryCreateSchema,
  $id: 'categoryUpdateSchema',
  required: [],
} as const

export const categoryParamsSchema = {
  $id: 'categoryParamsSchema',
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: false,
} as const

/**
 * API schemas
 */

export const getAllCategoriesSchema = {
  response: {
    200: {
      type: 'array',
      items: categorySchema,
    },
    '4xx': errorSchema,
  },
}

export const getCategorySchema = {
  params: categoryParamsSchema,
  response: {
    '2xx': categorySchema,
    '4xx': errorSchema,
  },
}

export const createCategorySchema = {
  body: categoryCreateSchema,
  response: {
    '2xx': categorySchema,
    '4xx': errorSchema,
  },
}

export const updateCategorySchema = {
  params: categoryParamsSchema,
  body: categoryUpdateSchema,
  response: {
    '2xx': categorySchema,
    '4xx': errorSchema,
    '5xx': errorSchema,
  },
}

export const deleteCategorySchema = {
  params: categoryParamsSchema,
  response: {
    '2xx': categorySchema,
    '4xx': errorSchema,
  },
}

export const categoryItemSchema = {
  $id: 'categoryItemSchema',
  type: 'object',
  properties: {
    id: { type: 'number' },
    categoryId: { type: 'string' },
    name: { type: 'string' },
    desc: { type: 'string' },
  },
  required: ['id', 'categoryId', 'name'],
  additionalProperties: false,
} as const

export const getAllCategoryItemsSchema = {
  response: {
    200: {
      type: 'array',
      items: categoryItemSchema,
    },
    '4xx': errorSchema,
  },
}

export const getCategoryItemSchema = {
  params: categoryParamsSchema,
  response: {
    '2xx': categoryItemSchema,
    '4xx': errorSchema,
  },
}
