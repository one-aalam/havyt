import { FastifyInstance } from 'fastify'
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
}
