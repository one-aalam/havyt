import { FastifyInstance } from 'fastify'
import { USERS } from '../fixtures'

const userParamsSchema = {
    type: 'object',
    properties: {
        id: { type: 'number'}
    },
    required: [ 'id' ]
}

type UserParams = {
    id: string
}

export default async function users(fastify: FastifyInstance) {
    // get all the users
    fastify.get('/users', async () => USERS)

    // get the user by provided id
    fastify.get<{
        Params: UserParams
    }>('/users/:id', { schema: {
       params: userParamsSchema
    }}, async (req, reply) => {
        const user = USERS.find(user => user.id === parseInt(req.params.id))
        if(!user) {
            reply.code(404).send({
                name: 'NotFoundError',
                message: 'Not Found'
            })
        }
        return user
    })
}
