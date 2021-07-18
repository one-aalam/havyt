import { FastifyInstance } from 'fastify'
import createError from 'http-errors'
import StormDB from 'stormdb'
import { StoreService } from '../../lib/store'
import {
    getAllCategoriesSchema,
    getCategorySchema,
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema
} from './schemas'
import {
    Category,
    CategoryParams,
    CategoryCreateBody,
    CategoryUpdateBody,
} from './types'
import { CATEGORIES } from './fixtures'


/**
 *
 * @param fastify
 */

export default async function categories(fastify: FastifyInstance) {

    const categoryService = fastify.getStore<Category>('categories')

    // get all the categories
    fastify.get('/categories', { schema: getAllCategoriesSchema }, async () => categoryService.getAll())

    // get the category by provided id
    fastify.get<{
        Params: CategoryParams,
    }>('/categories/:id', { schema: getCategorySchema },async (req) => {
        try {
            return await categoryService.getById(req.params.id)
        } catch(e) {
            return createError(e.code)
        }
    })

    fastify.post<{ Body: CategoryCreateBody }>('/categories',  { schema: createCategorySchema }, async (req, reply) => {
        try {
            const { type, name, desc } = req.body
            const category = await categoryService.create({
                type,
                name: name || type,
                desc: desc || ''
            })
            reply.code(201).send(category)
        } catch (e) {
            return createError(e.code)
        }
    })

    fastify.put<{
        Params: CategoryParams,
        Body: CategoryUpdateBody
    }>('/categories/:id',  { schema: updateCategorySchema }, async (req) => {
        try {
            return await categoryService.updateById(req.params.id, req.body)
        } catch (e) {
            return createError(e.code)
        }
    })

    fastify.delete<{
        Params: CategoryParams,
    }>('/categories/:id',  { schema: deleteCategorySchema }, async (req) => {
        try {
            return await categoryService.deleteById(req.params.id)
        } catch (e) {
            return createError(e.code)
        }
    })
}
