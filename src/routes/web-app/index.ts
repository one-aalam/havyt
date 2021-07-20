import { FastifyInstance } from 'fastify'
import path from 'path'

type WebAppOptions = {
    rootDir: string
}

export default async function routes(fastify: FastifyInstance, options: WebAppOptions) {

    fastify.register(import('fastify-static'), {
        root: path.join(options.rootDir, 'public'),
        prefix: '/public/',
    })

    fastify.register(import('point-of-view'), {
        engine: {
          pug: (await import('pug'))
        },
        root: path.join(__dirname, 'views'),
        includeViewExtension: false,
        defaultContext: {
            dev: process.env.NODE_ENV !== 'production',
        },
        options: {
            basedir: path.join(__dirname, 'views')
        }
    })

    fastify.register(import('./routes/auth'))
    fastify.register(import('./routes/recipe'))

}
