import { FastifyInstance } from 'fastify'

export default async function users(fastify: FastifyInstance) {
  // get all the users
  fastify.get('/', async (req, reply) => reply.sendFile('index.html'))
  fastify.get('/auth', async (req, reply) => reply.sendFile('auth.html'))
}
