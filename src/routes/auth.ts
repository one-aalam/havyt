import { FastifyInstance, FastifyRequest } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'
import { errorSchema } from '../schemas/error'
import { USERS } from '../fixtures'

const authBodySchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email'},
        password: { type: 'string'},
    },
    required: ['email', 'password'],
    additionalProperties: false
} as const

const userSuccessSchema = {
    type: 'object',
    properties: {
        id: { type: 'number'},
        firstName: { type: 'string'},
        lastName: { type: 'string'},
        email: { type: 'string'},
        avatar: { type: 'string'}
    },
    required: [ 'id', 'firstName', 'email' ],
    additionalProperties: false
}

type AuthLoginBody = FromSchema<typeof authBodySchema>

export default async function auth(fastify: FastifyInstance) {
    // log-in a user
    fastify.post<{ Body: AuthLoginBody }>('/auth/login', {
        schema: {
            body: { user: authBodySchema },
            response: {
                '2xx': userSuccessSchema,
                '4xx': errorSchema
            }
        }
    },async (req: FastifyRequest, reply) => {
        // @ts-ignore
        const { email, password } = req.body
        const user = USERS.find(user => user.email == email)
        if(user && password == process.env.APP_PASS_ALL) {
            reply.send(user)
        }
        reply.code(401).send({
            statusCode: 401,
            error: 'NotAuthorized',
            message: 'User not authorized'
        })
    })
}
