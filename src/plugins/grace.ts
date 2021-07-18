import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import graceful from '@gquittet/graceful-server'



const grace = async (fastify: FastifyInstance) => {
    const gracefulServer = graceful(fastify.server)

    gracefulServer.on(graceful.READY, () => {})

    gracefulServer.on(graceful.SHUTTING_DOWN, () => {
      fastify.log.info('Server is shutting down')
    })

    gracefulServer.on(graceful.SHUTDOWN, error => {
      fastify.log.info('Server is down because of', error.message)
    })

    fastify.addHook('onReady', function (done) {
        gracefulServer.setReady()
        done()
    })
}

export default fp(grace)
