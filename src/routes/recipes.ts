import { FastifyInstance } from 'fastify'
import { RECIPES } from '../fixtures'

type RecipeParams = {
    id: string
}

type RecipeQuerystring = {
    tag: string
}

export default async function recipes(fastify: FastifyInstance) {
    // get all recipes having the provided `tag` or all the recipes
    fastify.get<{
        Querystring: RecipeQuerystring
    }>('/recipes', async (req) => req.query?.tag ? RECIPES.filter(recipe => recipe.tags?.map(tag => tag.toLowerCase()).includes(req.query?.tag)) : RECIPES)

    // get the recipe by provided id
    fastify.get<{
        Params: RecipeParams
    }>('/recipes/:id', async (req) => RECIPES.find(recipe => recipe.id === parseInt(req.params.id)))
}
