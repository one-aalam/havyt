import { FastifyInstance } from 'fastify'
import { RECIPES } from '../fixtures'

export default async function recipes(fastify: FastifyInstance) {
    fastify.get('/recipes', async () => RECIPES)
}
