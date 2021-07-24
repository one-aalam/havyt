import { FromSchema } from 'json-schema-to-ts'
import { MultipartFile } from 'fastify-multipart'
import {
  recipeSchema,
  recipeCreateSchema,
  recipeCreateMultipartSchema,
  recipeParamsSchema,
  recipeQuerystringSchema,
} from './schemas'

/**
 * Types
 */
export type Recipe = FromSchema<typeof recipeSchema>

export type RecipeParams = FromSchema<typeof recipeParamsSchema>

export type RecipeQuerystring = FromSchema<typeof recipeQuerystringSchema>

export type RecipeCreateBody = FromSchema<typeof recipeCreateSchema>
export type RecipeCreateMultipartBody = FromSchema<typeof recipeCreateMultipartSchema> & { imageUrl: MultipartFile }

export type RecipeUpdateBody = Partial<RecipeCreateBody>
export type RecipeUpdateMultipartBody = Partial<RecipeCreateMultipartBody>
