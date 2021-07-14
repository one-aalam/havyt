import { FastifyInstance } from 'fastify'
import { Recipe } from '../types'
import { RECIPES } from '../fixtures'

type RecipeParams = {
    id: string
}

type RecipeQuerystring = {
    offset?: number
    limit?: number
    tag?: string
    cuisineId?: number
    courseId?: number
}

// `id`s are created by us, so we'll omit it from the type
type RecipeCreateBody = Omit<Recipe, 'id'>

// mark all properties optional
type RecipeUpdateBody = Partial<RecipeCreateBody>

export default async function recipes(fastify: FastifyInstance) {
    // get all recipes having the provided `tag`, `cuisineId`, `categoryId`, or range, or all the recipes
    fastify.get<{
        Querystring: RecipeQuerystring
    }>('/recipes', async (req) => {
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
    }>('/recipes/:id', async (req, reply) => {
        const recipe = RECIPES.find(recipe => recipe.id === parseInt(req.params.id))
        if(!recipe) {
            reply.code(404).send({
                name: 'NotFoundError',
                message: 'Not Found'
            })
        }
        return recipe
    })

    fastify.post<{ Body: RecipeCreateBody }>('/recipes', async (req, reply) => {
        const newRecipe: Recipe  = {
            ...req.body,
            id: RECIPES[RECIPES.length - 1].id + 1,
        }
        // RECIPES.push(newRecipe)
        reply.code(201).send(newRecipe)
    })

    fastify.put<{
        Params: RecipeParams,
        Body: RecipeUpdateBody
    }>('/recipes/:id', async (req, reply) => {

        const recipe = RECIPES.find(recipe => recipe.id === parseInt(req.params.id))
        if(!recipe) {
            reply.code(404).send({
                name: 'NotFoundError',
                message: 'Not Found'
            })
        }

        // get where is it
        const recipeIndex = RECIPES.findIndex(recipe => recipe.id === parseInt(req.params.id))
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
    }>('/recipes/:id', async (req, reply) => {

        // get where is it
        const recipeIndex = RECIPES.findIndex(recipe => recipe.id === parseInt(req.params.id))

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
