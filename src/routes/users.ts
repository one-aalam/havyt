import { FastifyInstance } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'
import { userSchema, errorSchema } from '../schemas'
import { USERS } from '../fixtures'

const userParamsSchema = {
    type: 'object',
    properties: {
        id: { type: 'number'}
    },
    required: [ 'id' ],
    additionalProperties: false
} as const

type UserParams = FromSchema<typeof userParamsSchema>

export default async function users(fastify: FastifyInstance) {
    // get all the users
    fastify.get('/users', async () => USERS)

    // get the user by provided id
    fastify.get<{
        Params: UserParams
    }>('/users/:id', { schema: {
       params: userParamsSchema,
       response: {
           '2xx': userSchema,
           '4xx': errorSchema
       }
    }}, async (req, reply) => {
        const user = USERS.find(user => user.id === req.params.id)
        if(!user) {
            reply.code(404).send({
                statusCode: 404,
                error: 'NotFoundError',
                message: 'Not Found'
            })
        }
        return user
    })
}
