import { FastifyInstance } from 'fastify'
import { Container } from 'typedi'
import createError from 'http-errors'
import { getUserSchema, getAllUsersSchema, updateUserSchema } from './schemas'
import { UserParams, UserUpdateBody } from './types'
import { UserService } from './service'

export default async function users(fastify: FastifyInstance) {
    const userService = Container.get(UserService)
  // get all the users
  fastify.get('/users', { schema: getAllUsersSchema, preHandler: [ fastify.verifyBearerAuth ] }, async () => await userService.getAll())

  // get the user by provided id
  fastify.get<{
    Params: UserParams
  }>('/users/:id', { schema: getUserSchema, preHandler: [ fastify.verifyBearerAuth ] }, async (req) => {
    try {
        return await userService.getOne(req.params)
      } catch (e) {
        return createError(e.code)
      }
  })

  fastify.put<{
    Params: UserParams,
    Body: UserUpdateBody
  }>('/users/:id', { schema: updateUserSchema }, async (req) => {
    try {
        return await userService.update(req.params, req.body)
      } catch (e) {
        return createError(e.code)
      }
  })

}
