import { FromSchema } from 'json-schema-to-ts'
import {
  categorySchema,
  categoryCreateSchema,
  categoryParamsSchema,
  categoryItemSchema,
} from './schemas'

/**
 * Types
 */

export type Category = FromSchema<typeof categorySchema>

export type CategoryParams = FromSchema<typeof categoryParamsSchema>

export type CategoryCreateBody = FromSchema<typeof categoryCreateSchema>

export type CategoryUpdateBody = Partial<CategoryCreateBody>

export type CategoryItem = FromSchema<typeof categoryItemSchema>
