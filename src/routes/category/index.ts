import { FastifyInstance } from 'fastify'
import createError from 'http-errors'
import {
  getAllCategoriesSchema,
  getCategorySchema,
  createCategorySchema,
  updateCategorySchema,
  deleteCategorySchema,
  getAllCategoryItemsSchema,
  getCategoryItemSchema
} from './schemas'
import { Category, CategoryParams, CategoryCreateBody, CategoryUpdateBody } from './types'
import { CategoryService } from './service'
/**
 *
 * @param fastify
 */

export default async function categories(fastify: FastifyInstance) {
  const categoryService = new CategoryService(fastify.getStore<Category>('categories'))

  // get all the categories
  fastify.get('/categories', { schema: getAllCategoriesSchema }, async () => await categoryService.getAll())

  // get the category by provided id
  fastify.get<{
    Params: CategoryParams
  }>('/categories/:id', { schema: getCategorySchema }, async (req) => {
    try {
      return await categoryService.getOne(req.params)
    } catch (e) {
      return createError(e.code)
    }
  })

  fastify.get<{
    Params: CategoryParams
  }>('/categories/:id/items', { schema: getAllCategoryItemsSchema }, async (req) => {
    try {
      return await categoryService.getAllItemsByCategory(req.params)
    } catch (e) {
      return createError(e.code)
    }
  })

  fastify.get<{
    Params: CategoryParams
  }>('/categories/items/:id', { schema: getCategoryItemSchema }, async (req) => {
    try {
      return await categoryService.getItemByCategoryItemId(req.params.id)
    } catch (e) {
      return createError(e.code)
    }
  })

  fastify.post<{ Body: CategoryCreateBody }>(
    '/categories',
    { schema: createCategorySchema },
    async (req, reply) => {
      try {
        const { type, name, desc } = req.body
        const category = await categoryService.create({
          type,
          name: name || type,
          desc: desc || '',
        })
        reply.code(201).send(category)
      } catch (e) {
        return createError(e.code)
      }
    }
  )

  fastify.put<{
    Params: CategoryParams
    Body: CategoryUpdateBody
  }>('/categories/:id', { schema: updateCategorySchema }, async (req) => {
    try {
      return await categoryService.update(req.params, req.body)
    } catch (e) {
      return createError(e.code)
    }
  })

  fastify.delete<{
    Params: CategoryParams
  }>('/categories/:id', { schema: deleteCategorySchema }, async (req) => {
    try {
      return await categoryService.delete(req.params)
    } catch (e) {
      return createError(e.code)
    }
  })
}
