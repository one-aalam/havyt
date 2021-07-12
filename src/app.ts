// Server-app, not the Server!
import Fastify, { FastifyInstance } from 'fastify'

export const buildServer = (): FastifyInstance => {
    // Instantiate the Fastify server
    const fastify = Fastify()

    // Load and register route files
    fastify.register(import('./routes/users'))
    fastify.register(import('./routes/recipes'))
    fastify.register(import('./routes/categories'))

    fastify.get('*', async (req) => `You requested for ${req.url} using method ${req.method}, which does not have an associated response`)

    // return the Server instance
    return fastify
}
