import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import fastifyEnv from 'fastify-env'
import { envSchema } from '../lib/commons/schemas'
import { EnvConfig } from '../lib/commons/types'

const env = async (fastify: FastifyInstance, config: EnvConfig) => {
  fastify
    .register(fastifyEnv, {
      confKey: 'config',
      schema: envSchema,
      data: config,
    })
    .ready((err) => {
      if (err) fastify.log.error(err)
    })
}

export default fp(env)
