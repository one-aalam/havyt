import { FastifyInstance } from 'fastify'
import { getPropsForTemplate } from '../../../lib/commons/utils'
import {
    Recipe,
    RecipeQuerystring,
    RecipeParams,
    RecipeUpdateBody
} from '../../recipe/types'
import {
    getRecipeSchema,
    recipeCreateSchema
} from '../../recipe/schemas'
import {
    CUISINES,
    COURSES
} from '../../recipe/fixtures'

type RecipeUrlEncodedBody = RecipeUpdateBody & {
    id?: number,
    ingredients: string,
    directions: string
}
export default async function routes(fastify: FastifyInstance) {
    const recipeService = fastify.getStore<Recipe>('recipes')

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

      await reply.view('recipe/index', {
          recipes: recipesTplData
      })
    })

  fastify.get<{
      Querystring: RecipeQuerystring
  }>('/recipes', async (req, reply) => {
    const { offset = 0, limit = 10, tag, cuisineId, courseId } = req.query
    const recipes = await recipeService.getAll()
    const recipesTplData = recipes
      .filter((recipe) => !tag || recipe.tags?.map((tag) => tag.toLowerCase()).includes(tag))
      .filter((recipe) => !cuisineId || recipe.cuisineId == cuisineId)
      .filter((recipe) => !courseId || recipe.courseId == courseId)
      .slice(offset, offset + limit)

    await reply.view('recipe/index', {
        recipes: recipesTplData
    })
  })

fastify.get<{
    Params: RecipeParams
  }>('/recipes/:id', { schema: getRecipeSchema }, async (req, reply) => {
      // @ts-ignore
       const recipeTplData = await recipeService.getById(parseInt(req.params.id))
       await reply.view('recipe/view', {
        recipe: recipeTplData
       })
  })

  fastify.get<{
    Params: RecipeParams
  }>('/recipes/:id/edit', { schema: getRecipeSchema }, async (req, reply) => {
      // @ts-ignore
       const recipe = await recipeService.getById(parseInt(req.params.id))
       const recipeTplData = getPropsForTemplate(recipeCreateSchema, recipe, {
            desc: { renderAs: 'textarea'},
            cuisineId: {values: CUISINES},
            courseId: { values: COURSES },
            imageUrl: { renderAs: 'file'}
       })
       await reply.view('recipe/edit', {
           id: req.params.id,
            fields: recipeTplData
       })
  })

  fastify.get('/recipes/add', async (req, reply) => {
       const recipeTplData = getPropsForTemplate(recipeCreateSchema, {}, {
            desc: { renderAs: 'textarea'},
            cuisineId: {values: CUISINES},
            courseId: { values: COURSES },
            imageUrl: { renderAs: 'file'}
       })
       await reply.view('recipe/edit', {
            fields: recipeTplData
       })
  })
}
