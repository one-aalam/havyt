import { FromSchema } from 'json-schema-to-ts'
import {
  recipeSchema,
  recipeCreateSchema,
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

export type RecipeUpdateBody = Partial<RecipeCreateBody>
