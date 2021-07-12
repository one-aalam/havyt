import { FastifyInstance } from 'fastify'
import { RECIPES } from '../fixtures'

export default async function recipes(fastify: FastifyInstance) {
    // get all recipes having the provided `tag` or all the recipes
    // @ts-ignore
    fastify.get('/recipes', async (req) => req.query.tag ? RECIPES.filter(recipe => recipe.tags?.map(tag => tag.toLowerCase()).includes(req.query.tag)) : RECIPES)

    // get the recipe by provided id
    // @ts-ignore
    fastify.get('/recipes/:id', async (req) => RECIPES.find(recipe => recipe.id === parseInt(req.params.id)))
}
