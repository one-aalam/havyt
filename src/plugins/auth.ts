import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'
import fp from 'fastify-plugin'
import { Container } from 'typedi'
import createError from 'http-errors'
import { getBasicAuthPayload, getBearerAuthPayload, verifyToken } from '../lib/auth'
import { UserService } from '../routes/user/service'

const auth = (fastify: FastifyInstance, options: FastifyPluginOptions, done: Function) => {
    fastify.decorate('getBasicAuthPayload', getBasicAuthPayload)
    fastify.decorate('verifyBasicAuth', verifyBasicAuth)
    fastify.decorate('verifyBearerAuth', verifyBearerAuth)
    fastify.decorateRequest('user', null)
    done()
}


const verifyBasicAuth = async (req: FastifyRequest, _: FastifyReply, done: Function) => {
  const userService = Container.get(UserService)
    const [ email, password ] = getBasicAuthPayload(req)
    if(!email || !password) {
        throw createError(401, 'Authentication Required!')
    }
    try {
        const { password: _, ...user } = await userService.getByEmailAndPassword(email, password)
        req.user = user
        done()
    } catch (e) {
        throw new createError.Unauthorized()
    }
}

const verifyBearerAuth = async (req: FastifyRequest, _: FastifyReply, done: Function) => {
    const userService = Container.get(UserService)
      const [ scheme, token ] = getBearerAuthPayload(req)
      if(!scheme || !token) {
          throw createError(401, 'Bearer Token Required!')
      }
      try {
        const verifiedToken = verifyToken(token)
          const user = await userService.getByEmail(verifiedToken.email)
          req.user = user
          done()
      } catch (e) {
          throw new createError.Unauthorized()
      }
}

export default fp(auth)
