// Server-app, not the Server!
import Fastify, { FastifyInstance } from 'fastify'
import path from 'path'
import envConfig from './config/env'
import storeConfig from './config/store'
import swaggerConfig from './config/swagger'
import upConfig from './config/up'
import corsConfig from './config/cors'

export const buildServer = (): FastifyInstance => {
  const ROOT_DIR = path.join(__dirname, '..')
  // Instantiate the Fastify server
  const fastify = Fastify({
    logger: {
      prettyPrint: process.env.NODE_ENV !== 'production',
    },
  })

  fastify.register(import('./plugins/env'), envConfig)

  fastify.register(import('fastify-compress'))
  fastify.register(import('fastify-swagger'), swaggerConfig)
  fastify.register(import('under-pressure'), upConfig)
  fastify.register(import('fastify-cors'), corsConfig)
  fastify.register(import('fastify-favicon'))

  // fastify.register(import('./plugins/logan'))
  // Register custom App plugins
  fastify.register(import('./plugins/store'), storeConfig)
  fastify.register(import('./plugins/grace'))

  // Load and register API route files
  fastify.register(import('./routes/user'))
  fastify.register(import('./routes/recipe'))
  fastify.register(import('./routes/category'))
  fastify.register(import('./routes/auth'))

  fastify.register(import('fastify-static'), {
    root: path.join(ROOT_DIR, 'public'),
  })

  // return the Server instance
  return fastify
}
