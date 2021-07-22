// @ts-nocheck
import { FastifyInstance } from 'fastify'
import fs from 'fs'
import { getPropsForTemplate, toArray } from '../../../lib/commons/utils'
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

const renderConfig = {
    desc: { renderAs: 'textarea'},
    cuisineId: {values: CUISINES},
    courseId: { values: COURSES },
    imageUrl: { renderAs: 'file'}
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

fastify.get('/recipes/add', async (req, reply) => {
    const recipeTplData = getPropsForTemplate(recipeCreateSchema, {}, renderConfig )
    await reply.view('recipe/edit', {
        fields: recipeTplData
    })
})

fastify.get<{
    Params: RecipeParams
    }>('/recipes/:id/edit', { schema: getRecipeSchema }, async (req, reply) => {
        const recipe = await recipeService.getById(req.params.id)
        const recipeTplData = getPropsForTemplate(recipeCreateSchema, recipe, renderConfig)
        await reply.view('recipe/edit', {
            id: req.params.id,
            fields: recipeTplData
    })
})

fastify.post('/recipes', async (req, reply) => {
    const {id, ...body} = Object.entries(req.body).reduce(
        (acc, [key, val]: [string, any]) => (val.value ? ((acc[key] = val.value), acc) : acc),
        {}
    )
    if(req.body.imageUrl && req.body.imageUrl.filename) {
        const imageUrl = req.body.imageUrl.filename // generate unique name
        const imageUrlBuffer = await req.body.imageUrl.toBuffer()
        fs.writeFileSync(`uploads/${imageUrl}`, imageUrlBuffer)
        body.imageUrl = imageUrl
    }
    const recipeData = {
        ...body,
        ingredients: toArray(body.ingredients),
        directions: toArray(body.directions),
        tags: toArray(body.tags)
    }
    if(id) {
        const recipe = await recipeService.updateById(parseInt(id), recipeData)
        reply.redirect(`/recipes/${recipe.id}`)
    } else {
        const recipe = await recipeService.create(recipeData)
        reply.redirect(`/recipes/${recipe.id}`)
    }
})
}
