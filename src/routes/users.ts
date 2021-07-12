import { FastifyInstance } from 'fastify'
import { USERS } from '../fixtures'

export default async function users(fastify: FastifyInstance) {
    // get all the users
    fastify.get('/users', async () => USERS)

    // get the user by provided id
    // @ts-ignore
    fastify.get('/users/:id', async (req) => USERS.find(user => user.id === parseInt(req.params.id)))
}
