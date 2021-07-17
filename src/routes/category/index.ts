import { FastifyInstance } from 'fastify'
import {
    getAllCategoriesSchema,
    getCategorySchema,
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema
} from './schemas'
import {
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
    // get all the categories
    fastify.get('/categories', { schema: getAllCategoriesSchema }, async () => CATEGORIES)

    // get the category by provided id
    fastify.get<{
        Params: CategoryParams,
    }>('/categories/:id', { schema: getCategorySchema },async (req, reply) => {
        const recipeCategory = CATEGORIES.find(recipeCategory => recipeCategory.id === req.params.id)
        if(!recipeCategory) {
            reply.code(404).send({
                statusCode: 404,
                error: 'NotFoundError',
                message: 'Not Found'
            })
        }
        return recipeCategory
    })

    fastify.post<{ Body: CategoryCreateBody }>('/categories',  { schema: createCategorySchema }, async (req, reply) => {
        const { type, name, desc } = req.body

        // enforce constraints like unique-ness
        const hasCategoryWithProvidedType = CATEGORIES.find(recipeCategory => recipeCategory.type === type)
        if(hasCategoryWithProvidedType) {
            reply.code(409).send({
                statusCode: 409,
                error: 'Conflict',
                message: 'Conflict'
            })
        }

        // deletions leave the DB's in a state where id's cannot be just safely incremented based on the count
        // here we're adding one to the last id in the available records, which is a more safer way to do this
        const newCategory = {
            id: CATEGORIES[CATEGORIES.length - 1].id + 1,
            type,
            name: name || type,
            desc: desc || ''
        }
        CATEGORIES.push(newCategory)
        reply.code(201).send(newCategory)
    })

    fastify.put<{
        Params: CategoryParams,
        Body: CategoryUpdateBody
    }>('/categories/:id',  { schema: updateCategorySchema }, async (req, reply) => {

        // err, and exit early!
        let recipeCategory = CATEGORIES.find(recipeCategory => recipeCategory.id === req.params.id)
        if(!recipeCategory) {
            reply.code(404).send({
                statusCode: 404,
                error: 'NotFoundError',
                message: 'Not Found'
            })
        }

        // looks like we can go ahead and update the values
        // get `em
        const { type, name, desc } = req.body

        // enforce constraints like unique-ness
        const hasOtherCategoryWithProvidedType = CATEGORIES.filter(recipeCategory => recipeCategory.id !== req.params.id && recipeCategory.type === type).length
        if(hasOtherCategoryWithProvidedType) {
            reply.code(409).send({
                statusCode: 409,
                error: 'Conflict',
                message: 'Conflict'
            })
        }

        // update `em
        if (type && recipeCategory?.type) recipeCategory.type = type
        if (name && recipeCategory?.name) recipeCategory.name = name
        if (desc && recipeCategory?.desc) recipeCategory.desc = desc

        // get where is it
        const recipeCategoryIndex = CATEGORIES.findIndex(recipeCategory => recipeCategory.id === req.params.id)
        // and update it
        if(recipeCategoryIndex >= 0 && recipeCategory) {
            CATEGORIES[recipeCategoryIndex] = recipeCategory
            reply.code(200).send(recipeCategory)
        }

        // It's not you, It's us!'
        reply.code(500).send({
            statusCode: 500,
            error: 'InternalServerError',
            message: 'Internal Sever Error'
        })
    })

    fastify.delete<{
        Params: CategoryParams,
    }>('/categories/:id',  { schema: deleteCategorySchema }, async (req, reply) => {

        // get where is it
        const recipeCategoryIndex = CATEGORIES.findIndex(recipeCategory => recipeCategory.id === req.params.id)

        // and delete it
        if(recipeCategoryIndex >= 0) {
            const recipe = CATEGORIES[recipeCategoryIndex]
            CATEGORIES.splice(recipeCategoryIndex, 1)
            reply.code(200).send(recipe)
        }

        reply.code(404).send({
            statusCode: 404,
            error: 'NotFoundError',
            message: 'Not Found'
        })
    })
}
