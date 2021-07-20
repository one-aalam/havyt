import { FastifyInstance } from 'fastify'
import path from 'path'
import {
    Recipe,
    RecipeQuerystring,
} from '../recipe/types'

export default async function routes(fastify: FastifyInstance) {
    const recipeService = fastify.getStore<Recipe>('recipes')

    fastify.register(import('point-of-view'), {
        engine: {
          pug: (await import('pug'))
        },
        root: path.join(__dirname, 'views'),
        includeViewExtension: false,
        defaultContext: {
            dev: process.env.NODE_ENV !== 'production',
        },
        options: {
            basedir: path.join(__dirname, 'views')
        }
    })

  fastify.get<{
      Querystring: RecipeQuerystring
  }>('/', async (req, reply) => {
    const { offset = 0, limit = 10, tag, cuisineId, courseId } = req.query
    const recipes = await recipeService.getAll()
    const recipesTplData = recipes
      .filter((recipe) => !tag || recipe.tags?.map((tag) => tag.toLowerCase()).includes(tag))
      .filter((recipe) => !cuisineId || recipe.cuisineId == cuisineId)
      .filter((recipe) => !courseId || recipe.courseId == courseId)
      .slice(offset, offset + limit)

    await reply.view('index', {
        recipes: recipesTplData
    })
  })

  fastify.get('/auth', async (req, reply) => await reply.view('auth'))
}
