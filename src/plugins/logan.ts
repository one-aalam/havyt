import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import { parse } from 'querystring'


const logger = (req: FastifyRequest) => {
    console.table({
        [`➡️ ${req.method}`]: {
            url: req.url.split('?')[0],
            query: {...parse(req.url.split('?')[1])},
            params: req.params
        }
    })
}

const logan = async (fastify: FastifyInstance) => {

    fastify.decorate('lo', logger)

    fastify.addHook('preHandler', (req, _, done) => {
        fastify.lo(req)
        done()
    })
}

export default fp(logan)
