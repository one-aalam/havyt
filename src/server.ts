import Fastify from 'fastify'
import { USERS, RECIPES, RECIPE_CATEGORIES } from './fixtures'

const APP_PORT = process.env.APP_PORT || 3000

const server = Fastify()

server.get('/users', async () => USERS)

server.get('/recipes', async () => RECIPES)

server.get('/categories', async () => RECIPE_CATEGORIES)

server.get('*', async (req) => `You requested for ${req.url} using method ${req.method}, which does not have an associated response`)

server.listen(APP_PORT, () => console.log(`Server started on ${APP_PORT} 🚀`));
