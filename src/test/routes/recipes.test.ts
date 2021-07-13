import t, { test } from 'tap'

import { buildServer } from '../../app'
import { Recipe } from '../../types'
import { RECIPES } from '../../fixtures'

test('GET /recipes/1 - should return the recipe with id 1', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/recipes/1',
    })

    t.equal(res.statusCode, 200)
    t.same(res.json(), RECIPES[0])
})

test('GET /recipes/50 - should return not found', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/recipes/50',
    })

    t.equal(res.statusCode, 404)
    t.same(res.body, 'Not Found')
})

test('GET /recipes - should return the recipes (upto 10 records) when none of the query params are there', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/recipes',
    })

    t.equal(res.statusCode, 200)
    t.same(res.json(), RECIPES.slice(0, 10))
})

test('GET /recipes?tag=flautas - should return the recipe with tag: Flautas', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/recipes?tag=flautas',
    })

    t.equal(res.statusCode, 200)
    Array.from<Recipe>(res.json() || []).map((r: Recipe) => t.match(r.tags?.join().toLowerCase(), 'flautas'))
})

test('GET /recipes?tag=flaut - should return no records as we have no recipe with tag: flaut', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/recipes?tag=flaut',
    })

    t.equal(res.statusCode, 200)
    t.same(res.json(), [])
})

test('GET /recipes?offset=0&limit=5 - should return the recipes (upto 5 records) when pagination params are present', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/recipes?offset=0&limit=5',
    })

    t.equal(res.statusCode, 200)
    t.same(res.json(), RECIPES.slice(0, 5))
})

test('GET /recipes?tag=flautas&offset=0&limit=5 - should give prominence to the tag: Flautas', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/recipes?tag=flautas&offset=0&limit=5',
    })

    t.equal(res.statusCode, 200)
    Array.from<Recipe>(res.json() || []).map((r: Recipe) => t.match(r.tags?.join().toLowerCase(), 'flautas'))
})

test('GET /recipes?offset=20&limit=5 - should return no records as pagination params go beyond available record set', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/recipes?offset=20&limit=5',
    })

    t.equal(res.statusCode, 200)
    t.same(res.json(), [])
})

test('GET /recipes?courseId=7 - should return recipes with courseId id: 7', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/recipes?courseId=7',
    })

    t.equal(res.statusCode, 200)
    Array.from<Recipe>(res.json() || []).map((r) => t.same(r.courseId, 7))
})

test('GET /recipes?cuisineId=9 - should return recipes with cuisine id: 9', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/recipes?cuisineId=9',
    })

    t.equal(res.statusCode, 200)
    Array.from<Recipe>(res.json() || []).map((r: Recipe) => t.same(r.cuisineId, 9))
})
