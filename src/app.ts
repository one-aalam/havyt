// Server-app, not the Server!
import Fastify, { FastifyInstance } from 'fastify'
import envConfig from './config/env'
import storeConfig from './config/store'

export const buildServer = (): FastifyInstance => {
    // Instantiate the Fastify server
    const fastify = Fastify({
        logger: {
            prettyPrint: process.env.NODE_ENV !== 'production',
        }
    })

    // fastify.register(import('./plugins/logan'))
    fastify.register(import('./plugins/env'), envConfig)
    fastify.register(import('./plugins/store'), storeConfig)
    // Load and register route files
    fastify.register(import('./routes/user'))
    fastify.register(import('./routes/recipe'))
    fastify.register(import('./routes/category'))
    fastify.register(import('./routes/auth'))

    fastify.get('*', async (req) => `You requested for ${req.url} using method ${req.method}, which does not have an associated response`)

    // return the Server instance
    return fastify
}
