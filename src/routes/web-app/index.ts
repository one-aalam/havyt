import { FastifyInstance } from 'fastify'
import path from 'path'

type WebAppOptions = {
    rootDir: string
}

const uploadConfig = {
    dir: '/uploads',
    limits: {
        fileSize: 1 * 1000000,
        files: 1
    }
}

export default async function routes(fastify: FastifyInstance, options: WebAppOptions) {
    fastify.register(import('fastify-formbody'))
    fastify.register(import('fastify-multipart'), {
        attachFieldsToBody: true,
        limits: uploadConfig.limits
    })


    fastify.register(import('fastify-static'), {
        root: path.join(options.rootDir, 'public'),
        prefix: '/public/',
    })

    fastify.register(import('fastify-static'), {
        root: path.join(options.rootDir, 'uploads'),
        prefix: uploadConfig.dir,
        decorateReply: false
    })

    fastify.register(import('point-of-view'), {
        engine: {
          pug: (await import('pug'))
        },
        root: path.join(__dirname, 'views'),
        includeViewExtension: false,
        defaultContext: {
            dev: process.env.NODE_ENV !== 'production',
            uploadsDir: uploadConfig.dir,
            uploadSize: `${uploadConfig.limits.fileSize / 1000000} mb`
        },
        options: {
            basedir: path.join(__dirname, 'views'),
            filters: {

            }
        },
    })

    fastify.register(import('./routes/auth'))
    fastify.register(import('./routes/recipe'))

}
