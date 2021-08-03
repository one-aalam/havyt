import { errorSchema } from '../../lib/commons/schemas'

export const recipeCreateSchema = {
  $id: 'recipeCreateSchema',
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 5 },
    desc: { type: 'string', default: '' },
    imageUrl: { type: 'string', default: '' },
    courseId: { type: 'number' },
    cuisineId: { type: 'number' },
    serves: { type: 'number' },
    prepTime: { type: 'number', default: 0 },
    cookingTime: { type: 'number' },
    ingredients: { type: 'array', items: { type: 'string' }, minItems: 1 },
    directions: { type: 'array', items: { type: 'string' }, minItems: 1 },
    source: { type: 'string', default: '' },
    tags: { type: 'array', items: { type: 'string' }, minItems: 1 },
  },
  example: {
    name: 'Sweet Almond Date Smoothie',
    desc: 'About Sweet Almond Date Smoothie',
    imageUrl: '',
    courseId: 3,
    cuisineId: 6,
    serves: 2,
    prepTime: 0,
    cookingTime: 0,
    ingredients: [
      '1 banana',
      '2 tbsp almond butter',
      '6 dates',
      '1 tsp maple syrup',
      '2 tsp cinnamon',
      '2 cup almond milk, or skim milk',
    ],
    directions: ['Combine all ingredients in blender. Blend until smooth.'],
    source: 'Yuri Elkaim',
    tags: ['smoothie', 'FUF', 'breakfast'],
  },
  required: ['name', 'courseId', 'cuisineId', 'serves', 'cookingTime', 'ingredients', 'directions'],
  additionalProperties: false,
} as const

export const multipartFileFieldSchema = {
  $id: 'fileFieldSchema',
  type: 'object',
  properties: {
    filepath: { type: 'string' },
    fieldname: { type: 'string' },
    filename: { type: 'string' },
    encoding: { type: 'string' },
    mimetype: { type: 'string' },
  },
  required: ['fieldname', 'filename'],
} as const

export const multipartFieldSchema = {
  $id: 'multipartFieldSchema',
  type: 'object',
  properties: {
    value: { type: 'string' },
    fieldname: { type: 'string' },
    fieldnameTruncated: { type: 'boolean' },
    valueTruncated: { type: 'boolean' },
  },
  required: ['value'],
} as const

export const recipeCreateMultipartSchema = {
  ...recipeCreateSchema,
  $id: 'recipeCreateMultipartSchema',
  consumes: ['multipart/form-data'],
  properties: {
    name: { oneOf: [recipeCreateSchema.properties.name, multipartFieldSchema] },
    desc: { oneOf: [recipeCreateSchema.properties.desc, multipartFieldSchema] },
    imageUrl: { oneOf: [recipeCreateSchema.properties.imageUrl, multipartFileFieldSchema] },
    courseId: { oneOf: [recipeCreateSchema.properties.courseId, multipartFieldSchema] },
    cuisineId: { oneOf: [recipeCreateSchema.properties.cuisineId, multipartFieldSchema] },
    serves: { oneOf: [recipeCreateSchema.properties.serves, multipartFieldSchema] },
    prepTime: { oneOf: [recipeCreateSchema.properties.prepTime, multipartFieldSchema] },
    cookingTime: { oneOf: [recipeCreateSchema.properties.cookingTime, multipartFieldSchema] },
    ingredients: { oneOf: [recipeCreateSchema.properties.ingredients, multipartFieldSchema] },
    directions: { oneOf: [recipeCreateSchema.properties.directions, multipartFieldSchema] },
    source: { oneOf: [recipeCreateSchema.properties.source, multipartFieldSchema] },
    tags: { oneOf: [recipeCreateSchema.properties.tags, multipartFieldSchema] },
  },
} as const

export const recipeSchema = {
  $id: 'recipeSchema',
  type: 'object',
  properties: {
    id: { type: 'number' },
    ...recipeCreateSchema.properties,
  },
  required: [...recipeCreateSchema.required, 'id'],
  additionalProperties: false,
} as const

export const recipeUpdateSchema = {
  ...recipeCreateSchema,
  $id: 'recipeUpdateSchema',
  required: [],
} as const

export const recipeUpdateMultipartSchema = {
  ...recipeCreateMultipartSchema,
  $id: 'recipeUpdateMultipartSchema',
  required: [],
} as const

export const recipeParamsSchema = {
  $id: 'recipeParamsSchema',
  type: 'object',
  properties: {
    id: { type: 'number' },
  },
  required: ['id'],
  additionalProperties: false,
} as const

export const recipeQuerystringSchema = {
  $id: 'recipeQuerystringSchema',
  type: 'object',
  properties: {
    offset: { type: 'number' },
    limit: { type: 'number' },
    tag: { type: 'string' },
    cuisineId: { type: 'number' },
    courseId: { type: 'number' },
  },
} as const

// get all
export const getAllRecipesSchema = {
  querystring: recipeQuerystringSchema,
  response: {
    200: {
      type: 'array',
      items: recipeSchema,
    },
    '4xx': errorSchema,
  },
}

// get
export const getRecipeSchema = {
  params: recipeParamsSchema,
  response: {
    '2xx': recipeSchema,
    '4xx': errorSchema,
  },
}

// create
export const createRecipeSchema = {
  body: recipeCreateSchema,
  response: {
    '2xx': recipeSchema,
    '4xx': errorSchema,
  },
}

export const createRecipeMultipartSchema = {
  ...createRecipeSchema,
  body: recipeCreateMultipartSchema,
}

// update
export const updateRecipeSchema = {
  params: recipeParamsSchema,
  body: recipeUpdateSchema,
  response: {
    '2xx': recipeSchema,
    '4xx': errorSchema,
  },
}

export const updateRecipeMultipartSchema = {
  ...updateRecipeSchema,
  body: recipeUpdateMultipartSchema,
}

// delete
export const deleteRecipeSchema = {
  params: recipeParamsSchema,
  response: {
    '2xx': recipeSchema,
    '4xx': errorSchema,
  },
}
