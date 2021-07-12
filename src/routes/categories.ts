import { FastifyInstance } from 'fastify'
import { RECIPE_CATEGORIES } from '../fixtures'

export default async function categories(fastify: FastifyInstance) {
    // get all the categories
    fastify.get('/categories', async () => RECIPE_CATEGORIES)

    // get the category by provided id
    // @ts-ignore
    fastify.get('/categories/:id', async (req) => RECIPE_CATEGORIES.find(recipeCategory => recipeCategory.id === parseInt(req.params.id)))
}
