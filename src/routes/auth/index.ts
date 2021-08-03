import { FastifyInstance } from 'fastify'
import createError from 'http-errors'
import { Container } from 'typedi'
import { AuthSignInPayload, AuthSignUpPayload } from './types'
import { authSignInSchema, authSignUpSchema } from './schemas'
import { AuthService } from './service'


export default async function auth(fastify: FastifyInstance) {

    const authService = Container.get(AuthService)
  // log-in a user
  fastify.post<{ Body: AuthSignInPayload }>(
    '/auth/signin',
    {
      schema: authSignInSchema,
    },
    async (req) => {
      try {
        return await authService.signIn(req.body)
      } catch (e) {
        return createError(e.code)
      }
    }
  )

  fastify.post<{ Body: AuthSignUpPayload }>(
    '/auth/signup',
    {
      schema: authSignUpSchema,
    },
    async (req, reply) => {
        try {
            const user = await authService.signUp(req.body)
            reply.code(201).send(user)
        } catch (e) {
            return createError(e.code)
        }
    }
  )
}
