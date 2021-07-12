import { FastifyInstance } from 'fastify'
import { USERS } from '../fixtures'

export default async function users(fastify: FastifyInstance) {
    fastify.get('/users', async () => USERS)
}
