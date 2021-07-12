import { FastifyInstance } from 'fastify'
import { RECIPE_CATEGORIES } from '../fixtures'

export default async function categories(fastify: FastifyInstance) {
    fastify.get('/categories', async () => RECIPE_CATEGORIES)
}
