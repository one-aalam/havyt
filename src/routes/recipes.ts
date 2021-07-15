import { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'
import { Recipe } from '../types'
import { RECIPES } from '../fixtures'

/**
 * JSON Schemas
 */
const recipeBodySchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        desc: { type: 'string', default: '' },
        imageUrl: { type: 'string', default: '' },
        courseId: { type: 'number',  },
        cuisineId: { type: 'number' },
        serves: { type: 'number' },
        prepTime: { type: 'number', default: 0 },
        cookingTime: { type: 'number' },
        ingredients: { type: 'array', items: { type: 'string' }},
        directions: { type: 'array', items: { type: 'string' }},
        source: { type: 'string', default: '' },
        tags: { type: 'array', items: { type: 'string' } },
    },
    additionalProperties: false
} as const

const recipeBodyCreateSchema = {
    ...recipeBodySchema,
    required: [ 'name', 'courseId', 'cuisineId', 'serves', 'cookingTime', 'ingredients', 'directions' ]
} as const

const recipeParamsSchema = {
    type: 'object',
    properties: {
        id: { type: 'number'}
    },
    required: [ 'id' ],
    additionalProperties: false
} as const

const recipeQuerystringSchema = {
    type: 'object',
    properties: {
        offset: { type: 'number'},
        limit: { type: 'number'},
        tag: { type: 'string'},
        cuisineId: { type: 'number'},
        courseId: { type: 'number'},
    },
} as const

/**
 * Types
 */
type RecipeParams = FromSchema<typeof recipeParamsSchema>

type RecipeQuerystring = FromSchema<typeof recipeQuerystringSchema>

type RecipeCreateBody = FromSchema<typeof recipeBodyCreateSchema>

// mark all properties optional
type RecipeUpdateBody = Partial<RecipeCreateBody>


/**
 *
 * @param fastify
 */
export default async function recipes(fastify: FastifyInstance) {
    // get all recipes having the provided `tag`, `cuisineId`, `categoryId`, or range, or all the recipes
    fastify.get<{
        Querystring: RecipeQuerystring
    }>('/recipes', { schema: {
        querystring: recipeQuerystringSchema
    }}, async (req) => {
        const { offset = 0, limit = 10, tag, cuisineId, courseId } = req.query
        return RECIPES
            .filter(recipe =>
                !tag || recipe.tags?.map(tag => tag.toLowerCase()).includes(tag)
            )
            .filter(recipe =>
                !cuisineId || recipe.cuisineId == cuisineId
            )
            .filter(recipe =>
                !courseId || recipe.courseId == courseId
            )
            .slice(offset, offset + limit)
    })

    // get the recipe by provided id
    fastify.get<{
        Params: RecipeParams
    }>('/recipes/:id', { schema: {
        params: recipeParamsSchema
    }}, async (req, reply) => {
        const recipe = RECIPES.find(recipe => recipe.id === req.params.id)
        if(!recipe) {
            reply.code(404).send({
                name: 'NotFoundError',
                message: 'Not Found'
            })
        }
        return recipe
    })

    fastify.post<{ Body: RecipeCreateBody }>('/recipes', { schema: {
        body: recipeBodyCreateSchema
    }}, async (req, reply) => {
        const newRecipe: Recipe  = {
            ...req.body,
            id: RECIPES[RECIPES.length - 1].id + 1,
        }
        RECIPES.push(newRecipe)
        reply.code(201).send(newRecipe)
    })

    fastify.put<{
        Params: RecipeParams,
        Body: RecipeUpdateBody
    }>('/recipes/:id', { schema: {
        params: recipeParamsSchema,
        body: recipeBodySchema
    }}, async (req, reply) => {

        const recipe = RECIPES.find(recipe => recipe.id === req.params.id)
        if(!recipe) {
            reply.code(404).send({
                name: 'NotFoundError',
                message: 'Not Found'
            })
        }

        // get where is it
        const recipeIndex = RECIPES.findIndex(recipe => recipe.id === req.params.id)
        // and update it
        if(recipeIndex && recipe) {
            RECIPES[recipeIndex] = {...recipe, ...req.body}
            reply.code(200).send(recipe)
        }

        // It's not you, It's us!'
        reply.code(500).send({
            name: 'InternalServerError',
            message: 'Internal Sever Error'
        })
    })


    fastify.delete<{
        Params: RecipeParams,
    }>('/recipes/:id', { schema: {
        params: recipeParamsSchema
    }}, async (req, reply) => {

        // get where is it
        const recipeIndex = RECIPES.findIndex(recipe => recipe.id === req.params.id)

        // and delete it
        if(recipeIndex >= 0) {
            RECIPES.splice(recipeIndex, 1)
            reply.code(200).send({ deleted: true })
        }

        reply.code(404).send({
            name: 'NotFoundError',
            message: 'Not Found'
        })
    })
}
