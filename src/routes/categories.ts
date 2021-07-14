import { FastifyInstance } from 'fastify'
import { RECIPE_CATEGORIES } from '../fixtures'
import { RecipeCatgeory } from '../types'

const categoryBodySchema = {
    type: 'object',
    properties: {
        type: { type: 'string'},
        name: { type: 'string'},
        desc: { type: 'string'}
    },
}

const categoryCreateBodySchema = {
    ...categoryBodySchema,
    required: [ 'type' ]
}

const categoryParamsSchema = {
    type: 'object',
    properties: {
        id: { type: 'number'}
    },
    required: [ 'id' ]
}

type CategoryParams = {
    id: string
}

type CategoryCreateBody = Omit<RecipeCatgeory, 'id'>

type CategoryUpdateBody = Partial<RecipeCatgeory>

export default async function categories(fastify: FastifyInstance) {
    // get all the categories
    fastify.get('/categories', async () => RECIPE_CATEGORIES)

    // get the category by provided id
    fastify.get<{
        Params: CategoryParams
    }>('/categories/:id', { schema: {
       params: categoryParamsSchema
    }},async (req, reply) => {
        const recipeCategory = RECIPE_CATEGORIES.find(recipeCategory => recipeCategory.id === parseInt(req.params.id))
        if(!recipeCategory) {
            reply.code(404).send({
                name: 'NotFoundError',
                message: 'Not Found'
            })
        }
        return recipeCategory
    })

    fastify.post<{ Body: CategoryCreateBody }>('/categories',  { schema: {
        params: categoryParamsSchema,
        body: categoryCreateBodySchema
     }}, async (req, reply) => {
        const { type, name, desc } = req.body

        // enforce constraints like unique-ness
        const hasCategoryWithProvidedType = RECIPE_CATEGORIES.find(recipeCategory => recipeCategory.type === type)
        if(hasCategoryWithProvidedType) {
            reply.code(409).send({
                name: 'Conflict',
                message: 'Conflict'
            })
        }

        // deletions leave the DB's in a state where id's cannot be just safely incremented based on the count
        // here we're adding one to the last id in the available records, which is a more safer way to do this
        const newCategory = {
            id: RECIPE_CATEGORIES[RECIPE_CATEGORIES.length - 1].id + 1,
            type,
            name: name || type,
            desc: desc || ''
        }
        RECIPE_CATEGORIES.push(newCategory)
        reply.code(201).send(newCategory)
    })

    fastify.put<{
        Params: CategoryParams,
        Body: CategoryUpdateBody
    }>('/categories/:id',  { schema: {
        params: categoryParamsSchema,
        body: categoryBodySchema
     }}, async (req, reply) => {

        // err, and exit early!
        let recipeCategory = RECIPE_CATEGORIES.find(recipeCategory => recipeCategory.id === parseInt(req.params.id))
        if(!recipeCategory) {
            reply.code(404).send({
                name: 'NotFoundError',
                message: 'Not Found'
            })
        }

        // enforce constraints like unique-ness
        const hasOtherCategoryWithProvidedType = RECIPE_CATEGORIES.filter(recipeCategory => recipeCategory.id !== parseInt(req.params.id) && recipeCategory.type === type).length >= 0 ? true : false
        if(hasOtherCategoryWithProvidedType) {
            reply.code(409).send({
                name: 'Conflict',
                message: 'Conflict'
            })
        }

        // looks like we can go ahead and update the values
        // get `em
        const { type, name, desc } = req.body

        // update `em
        if (type && recipeCategory?.type) recipeCategory.type = type
        if (name && recipeCategory?.name) recipeCategory.name = name
        if (desc && recipeCategory?.desc) recipeCategory.desc = desc

        // get where is it
        const recipeCategoryIndex = RECIPE_CATEGORIES.findIndex(recipeCategory => recipeCategory.id === parseInt(req.params.id))
        // and update it
        if(recipeCategoryIndex && recipeCategory) {
            RECIPE_CATEGORIES[recipeCategoryIndex] = recipeCategory
            reply.code(200).send(recipeCategory)
        }

        // It's not you, It's us!'
        reply.code(500).send({
            name: 'InternalServerError',
            message: 'Internal Sever Error'
        })
    })

    fastify.delete<{
        Params: CategoryParams,
    }>('/categories/:id',  { schema: {
        params: categoryParamsSchema
     }}, async (req, reply) => {

        // get where is it
        const recipeCategoryIndex = RECIPE_CATEGORIES.findIndex(recipeCategory => recipeCategory.id === parseInt(req.params.id))

        // and delete it
        if(recipeCategoryIndex >= 0) {
            RECIPE_CATEGORIES.splice(recipeCategoryIndex, 1)
            reply.code(200).send({ deleted: true })
        }

        reply.code(404).send({
            name: 'NotFoundError',
            message: 'Not Found'
        })
    })
}
