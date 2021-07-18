import { FastifyInstance } from 'fastify'
import { getUserSchema } from './schemas'
import { UserParams } from './types'
import { USERS } from './fixtures'

export default async function users(fastify: FastifyInstance) {
  // get all the users
  fastify.get('/users', async () => USERS)

  // get the user by provided id
  fastify.get<{
    Params: UserParams
  }>('/users/:id', { schema: getUserSchema }, async (req, reply) => {
    const user = USERS.find((user) => user.id === req.params.id)
    if (!user) {
      reply.code(404).send({
        statusCode: 404,
        error: 'NotFoundError',
        message: 'Not Found',
      })
    }
    return user
  })
}
