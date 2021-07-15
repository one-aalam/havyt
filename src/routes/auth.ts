import { FastifyInstance, FastifyRequest } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'
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

type AuthLoginBody = FromSchema<typeof authBodySchema>

export default async function auth(fastify: FastifyInstance) {
    // log-in a user
    fastify.post<{ Body: AuthLoginBody }>('/auth/login', {
        schema: {
            body: authBodySchema
        }
    },async (req: FastifyRequest, reply) => {
        // @ts-ignore
        const { email, password } = req.body
        const user = USERS.find(user => user.email == email)
        if(user && password == process.env.APP_PASS_ALL) {
            reply.send({ user })
        }
        reply.code(401).send({ authorized: false })
    })
}
