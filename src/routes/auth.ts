import { FastifyInstance, FastifyRequest } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'
import { authSchema, userSchema, errorSchema } from '../schemas'
import { USERS } from '../fixtures'

type AuthLoginBody = FromSchema<typeof authSchema>

export default async function auth(fastify: FastifyInstance) {
    // log-in a user
    fastify.post<{ Body: AuthLoginBody }>('/auth/login', {
        schema: {
            body: { user: authSchema },
            response: {
                '2xx': userSchema,
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
