import { FastifyInstance, FastifyRequest } from 'fastify'
import { authSchema, userSchema, errorSchema } from '../schemas'
import { AuthLoginPayload } from '../types.derived'
import { USERS } from '../fixtures'

export default async function auth(fastify: FastifyInstance) {
    // log-in a user
    fastify.post<{ Body: AuthLoginPayload }>('/auth/login', {
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
