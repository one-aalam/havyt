import { FastifyInstance } from 'fastify'
import createError from 'http-errors'
import StormDB from 'stormdb'
import { StoreService } from '../../lib/store'
import {
    getAllRecipesSchema,
    getRecipeSchema,
    createRecipeSchema,
    updateRecipeSchema,
    deleteRecipeSchema
} from './schemas'
import {
    Recipe,
    RecipeQuerystring,
    RecipeParams,
    RecipeCreateBody,
    RecipeUpdateBody
} from './types'
import { RECIPES } from './fixtures'

export default async function recipes(fastify: FastifyInstance) {

    const recipeService = new StoreService<Recipe>({
        coll: 'recipes',
        db: new StormDB(new StormDB.localFileEngine(process.env?.APP_FILE_DB || 'db/havyt.stormdb' )),
        data: RECIPES,
    })

    fastify.get<{
        Querystring: RecipeQuerystring
    }>('/recipes', { schema: getAllRecipesSchema}, async (req) => {
        const { offset = 0, limit = 10, tag, cuisineId, courseId } = req.query
        const recipes = await recipeService.getAll()
        return recipes
            .filter(recipe =>
                !tag || recipe.tags?.map(tag => tag.toLowerCase()).includes(tag)
            )
            .filter(recipe =>
                !cuisineId || recipe.cuisineId == cuisineId
            )
            .filter(recipe =>
                !courseId || recipe.courseId == courseId
            )
            .slice(offset, offset + limit)
    })

    // get the recipe by provided id
    fastify.get<{
        Params: RecipeParams
    }>('/recipes/:id', { schema: getRecipeSchema }, async (req) => {
        try {
            return await recipeService.getById(req.params.id)
        } catch(e) {
            return createError(e.code)
        }
    })

    fastify.post<{ Body: RecipeCreateBody }>('/recipes', { schema: createRecipeSchema }, async (req, reply) => {
        try {
            const recipe = await recipeService.create(req.body)
            reply.code(201).send(recipe)
        } catch (e) {
            return createError(e.code)
        }
    })

    fastify.put<{
        Params: RecipeParams,
        Body: RecipeUpdateBody
    }>('/recipes/:id', { schema: updateRecipeSchema}, async (req) => {
        try {
            return await recipeService.updateById(req.params.id, req.body)
        } catch (e) {
            return createError(e.code)
        }
    })


    fastify.delete<{
        Params: RecipeParams,
    }>('/recipes/:id', { schema: deleteRecipeSchema}, async (req, reply) => {
        try {
            return await recipeService.deleteById(req.params.id)
        } catch (e) {
            return createError(e.code)
        }
    })
}
