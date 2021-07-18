import t, { test } from 'tap'

import { buildServer } from '../../app'
import { CATEGORIES } from '../../routes/category/fixtures'

test('GET /categories - should return all the categories', async (t) => {
  const fastify = buildServer()

  const res = await fastify.inject('/categories')

  t.equal(res.statusCode, 200)
  t.same(res.json(), CATEGORIES)
})

test('GET /categories/1 - should return the category with id 1', async (t) => {
  const fastify = buildServer()

  const res = await fastify.inject({
    method: 'GET',
    url: '/categories/1',
  })

  t.equal(res.statusCode, 200)
  t.same(res.json().id, 1)
})

test('GET /categories/30 - should return not found', async (t) => {
  const fastify = buildServer()

  const res = await fastify.inject({
    method: 'GET',
    url: '/categories/30',
  })

  t.equal(res.statusCode, 404)
  t.same(res.json(), {
    name: 'NotFoundError',
    message: 'Not Found',
  })
})
