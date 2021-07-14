import { FastifyInstance } from 'fastify'
import { RECIPE_CATEGORIES } from '../fixtures'

type CategoryParams = {
    id: string
}

export default async function categories(fastify: FastifyInstance) {
    // get all the categories
    fastify.get('/categories', async () => RECIPE_CATEGORIES)

    // get the category by provided id
    fastify.get<{
        Params: CategoryParams
    }>('/categories/:id', async (req, reply) => {
        const recipeCategory = RECIPE_CATEGORIES.find(recipeCategory => recipeCategory.id === parseInt(req.params.id))
        if(!recipeCategory) {
            reply.code(404).send({
                name: 'NotFoundError',
                message: 'Not Found'
            })
        }
        return recipeCategory
    })
}
