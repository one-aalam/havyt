import { FastifyInstance } from 'fastify'
import path from 'path'

export default async function users(fastify: FastifyInstance) {
  // get all the users
  fastify.get('/', async (req, reply) => reply.sendFile('index.html', path.join(__dirname, 'views')))
  fastify.get('/auth', async (req, reply) => reply.sendFile('auth.html', path.join(__dirname, 'views')))
}
