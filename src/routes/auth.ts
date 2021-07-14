import { FastifyInstance, FastifyRequest } from 'fastify'
import { USERS } from '../fixtures'

type AuthLoginBody = {
    email: string
    password: string
}

export default async function auth(fastify: FastifyInstance) {
    // log-in a user
    fastify.post<{ Body: AuthLoginBody }>('/auth/login', async (req: FastifyRequest, reply) => {
        // @ts-ignore
        const { email, password } = req.body
        const user = USERS.find(user => user.email == email)
        if(user && password == process.env.APP_PASS_ALL) {
            reply.send({ user })
        }
        reply.code(401).send({ authorized: false })
    })
}
