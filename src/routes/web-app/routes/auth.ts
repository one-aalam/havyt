import { FastifyInstance } from 'fastify'
import { authSignInPayloadSchema } from '../../auth/schemas'

export default async function routes(fastify: FastifyInstance) {
  fastify.get('/auth', async (req, reply) => await reply.view('auth'))

  fastify.post(
    '/auth',
    {
      schema: {
        body: authSignInPayloadSchema,
      },
      attachValidation: true,
    },
    async (req, reply) => {
      if (req.validationError) {
        await reply.view('auth', {
          errors: req.validationError.validation,
        })
      }
      await reply.redirect('/')
    }
  )
}
