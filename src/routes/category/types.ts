import { FromSchema } from 'json-schema-to-ts'
import { categorySchema, categoryCreateSchema, categoryParamsSchema } from './schema'

/**
 * Types
 */

 export type Category = Required<FromSchema<typeof categorySchema>>

 export type CategoryParams = FromSchema<typeof categoryParamsSchema>

 export type CategoryCreateBody = FromSchema<typeof categoryCreateSchema>

 export type CategoryUpdateBody = Partial<CategoryCreateBody>

 export type CategoryItem = {
    id: number
    categoryId: number
    name: string
    desc?: string
}
