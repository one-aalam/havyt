import { FastifyInstance } from 'fastify'
import {
    getAllRecipesSchema,
    getRecipeSchema,
    createRecipeSchema,
    updateRecipeSchema,
    deleteRecipeSchema
} from './schemas'
import {
    Recipe,
    RecipeQuerystring,
    RecipeParams,
    RecipeCreateBody,
    RecipeUpdateBody
} from './types'
import { RECIPES } from './fixtures'

export default async function recipes(fastify: FastifyInstance) {
    // get all recipes having the provided `tag`, `cuisineId`, `categoryId`, or range, or all the recipes
    fastify.get<{
        Querystring: RecipeQuerystring
    }>('/recipes', { schema: getAllRecipesSchema}, async (req) => {
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
    }>('/recipes/:id', { schema: getRecipeSchema }, async (req, reply) => {
        const recipe = RECIPES.find(recipe => recipe.id === req.params.id)
        if(!recipe) {
            reply.code(404).send({
                statusCode: 404,
                error: 'NotFoundError',
                message: 'Not Found'
            })
        }
        return recipe
    })

    fastify.post<{ Body: RecipeCreateBody }>('/recipes', { schema: createRecipeSchema }, async (req, reply) => {
        // there are checks like existence of provided `courseId` or `cuisineId` we're not doing here...do it as an exercise
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
    }>('/recipes/:id', { schema: updateRecipeSchema}, async (req, reply) => {

        const recipe = RECIPES.find(recipe => recipe.id === req.params.id)
        if(!recipe) {
            reply.code(404).send({
                statusCode: 404,
                error: 'NotFoundError',
                message: 'Not Found'
            })
        }

        // get where is it
        const recipeIndex = RECIPES.findIndex(recipe => recipe.id === req.params.id)
        // and update it
        if(recipeIndex >= 0 && recipe) {
            RECIPES[recipeIndex] = {...recipe, ...req.body}
            reply.code(200).send(recipe)
        }

        // It's not you, It's us!'
        reply.code(500).send({
            statusCode: 500,
            error: 'InternalServerError',
            message: 'Internal Sever Error'
        })
    })


    fastify.delete<{
        Params: RecipeParams,
    }>('/recipes/:id', { schema: deleteRecipeSchema}, async (req, reply) => {

        // get where is it
        const recipeIndex = RECIPES.findIndex(recipe => recipe.id === req.params.id)

        // and delete it
        if(recipeIndex >= 0) {
            const recipe = RECIPES[recipeIndex]
            RECIPES.splice(recipeIndex, 1)
            reply.code(200).send(recipe)
        }

        reply.code(404).send({
            statusCode: 404,
            error: 'NotFoundError',
            message: 'Not Found'
        })
    })
}
