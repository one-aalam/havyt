import { FastifyInstance } from 'fastify'
import { Container } from 'typedi'
import createError from 'http-errors'
import {
  getAllRecipesSchema,
  getRecipeSchema,
  createRecipeMultipartSchema,
  updateRecipeMultipartSchema,
  deleteRecipeSchema,
} from './schemas'
import {
  Recipe,
  RecipeQuerystring,
  RecipeParams,
  RecipeCreateBody,
  RecipeUpdateBody,
  RecipeCreateMultipartBody,
  RecipeUpdateMultipartBody,
} from './types'
import { RecipeService } from './service'
import { toImageUrl, toFlatFromMultipartBody } from '../../lib/commons/utils'

export default async function recipes(fastify: FastifyInstance) {
  const recipeService = Container.get(RecipeService)

  fastify.get<{
    Querystring: RecipeQuerystring
  }>(
    '/recipes',
    {
      schema: getAllRecipesSchema,
    },
    async (req) => await recipeService.getAll(req.query)
  )

  // get the recipe by provided id
  fastify.get<{
    Params: RecipeParams
  }>('/recipes/:id', { schema: getRecipeSchema }, async (req) => {
    try {
      return await recipeService.getOne(req.params)
    } catch (e) {
      return createError(e.code)
    }
  })

  fastify.post<{ Body: RecipeCreateMultipartBody }>(
    '/recipes',
    { schema: createRecipeMultipartSchema },
    async (req, reply) => {
      try {
        let recipe
        if (req.isMultipart()) {
          const body = toFlatFromMultipartBody(req.body) as RecipeCreateBody
          body.imageUrl = await toImageUrl(req.body.imageUrl)
          recipe = await recipeService.create(body)
        } else {
          // @ts-ignore
          recipe = await recipeService.create(req.body)
        }
        reply.code(201).send(recipe)
      } catch (e) {
        return createError(e.code, e.message)
      }
    }
  )

  fastify.put<{
    Params: RecipeParams
    Body: RecipeUpdateMultipartBody
  }>('/recipes/:id', { schema: updateRecipeMultipartSchema }, async (req) => {
    try {
      if (req.isMultipart()) {
        const body = toFlatFromMultipartBody(req.body) as RecipeUpdateBody
        body.imageUrl = req.body.imageUrl ? await toImageUrl(req.body.imageUrl) : ''
        return await recipeService.update(req.params, body)
      } else {
        // @ts-ignore
        return await recipeService.update(req.params, req.body)
      }
    } catch (e) {
      return createError(e.code)
    }
  })

  fastify.delete<{
    Params: RecipeParams
  }>('/recipes/:id', { schema: deleteRecipeSchema }, async (req, reply) => {
    try {
      return await recipeService.delete(req.params)
    } catch (e) {
      return createError(e.code)
    }
  })
}
