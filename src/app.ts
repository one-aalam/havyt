// Server-app, not the Server!
import Fastify, { FastifyInstance } from 'fastify'

export const buildServer = (): FastifyInstance => {
    // Instantiate the Fastify server
    const fastify = Fastify()

    // Load and register route files
    fastify.register(import('./routes/user'))
    fastify.register(import('./routes/recipe'))
    fastify.register(import('./routes/category'))
    fastify.register(import('./routes/auth'))

    fastify.get('*', async (req) => `You requested for ${req.url} using method ${req.method}, which does not have an associated response`)

    // return the Server instance
    return fastify
}
