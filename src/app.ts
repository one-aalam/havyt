// Server-app, not the Server!
import Fastify, { FastifyInstance } from 'fastify'
import { USERS, RECIPES, RECIPE_CATEGORIES } from './fixtures'

export const buildServer = (): FastifyInstance => {
    // Instantiate the Fastify server
    const fastify = Fastify()

    // Register handlers to routes
    fastify.get('/users', async () => USERS)
    fastify.get('/recipes', async () => RECIPES)
    fastify.get('/categories', async () => RECIPE_CATEGORIES)
    fastify.get('*', async (req) => `You requested for ${req.url} using method ${req.method}, which does not have an associated response`)

    // return the Server instance
    return fastify
}
