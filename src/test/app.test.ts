import t, { test } from 'tap'

import { buildServer } from '../app'


test('GET /', async t => {
  t.test('should return a message indicating non-availability of a route handler', async t => {
    const fastify = buildServer()

    const res = await fastify.inject('/')

    t.equal(res.statusCode, 200, 'returns a status code of 200')
    t.same(res.body, 'You requested for / using method GET, which does not have an associated response')
  })
})
