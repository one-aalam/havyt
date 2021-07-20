import { FastifyInstance } from 'fastify'
import path from 'path'

export default async function users(fastify: FastifyInstance) {
    fastify.register(import('point-of-view'), {
        engine: {
          pug: (await import('pug'))
        },
        root: path.join(__dirname, 'views'),
        includeViewExtension: false,
        defaultContext: {
            dev: process.env.NODE_ENV !== 'production'
        }
    })
  // get all the users
  fastify.get('/', async (req, reply) => await reply.view('index'))
  fastify.get('/auth', async (req, reply) => await reply.view('auth'))
}
