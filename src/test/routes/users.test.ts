import t, { test } from 'tap'

import { buildServer } from '../../app'
import { USERS } from '../../fixtures'

test('GET /users - should return all the users', async t => {
    const fastify = buildServer()

    const res = await fastify.inject('/users')

    t.equal(res.statusCode, 200)
    t.same(res.json(), USERS)
})

test('GET /users/1 - should return the user with id 1', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/users/1',
    })

    t.equal(res.statusCode, 200)
    t.same(res.json().id, 1)
})

test('GET /users/50 - should return not found', async t => {
    const fastify = buildServer()

    const res = await fastify.inject({
        method: 'GET',
        url: '/users/50',
    })

    t.equal(res.statusCode, 404)
    t.same(res.body, 'Not Found')
})
