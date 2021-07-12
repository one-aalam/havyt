import t, { test } from 'tap'

import { buildServer } from '../app'
import { USERS, RECIPES, RECIPE_CATEGORIES } from '../fixtures'


test('GET /', async t => {
  t.test('should return a message indicating non-availability of a route handler', async t => {
    const fastify = buildServer()

    const res = await fastify.inject('/')

    t.equal(res.statusCode, 200, 'returns a status code of 200')
    t.same(res.body, 'You requested for / using method GET, which does not have an associated response')
  })
})

test('GET /users', async t => {
    t.test('should return users', async t => {
      const fastify = buildServer()

      const res = await fastify.inject('/users')

      t.equal(res.statusCode, 200)
      t.same(res.json(), USERS)
    })
})

test('GET /recipes', async t => {
    t.test('should return recipes', async t => {
      const fastify = buildServer()

      const res = await fastify.inject('/recipes')

      t.equal(res.statusCode, 200)
      t.same(res.json(), RECIPES)
    })
})

test('GET /categories', async t => {
    t.test('should return categories', async t => {
      const fastify = buildServer()

      const res = await fastify.inject('/categories')

      t.equal(res.statusCode, 200)
      t.same(res.json(), RECIPE_CATEGORIES)
    })
})
