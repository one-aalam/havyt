import { FastifyInstance } from 'fastify'
import path from 'path'
import uploadConfig from '../../config/upload'

type WebAppOptions = {
  rootDir: string
}

export default async function routes(fastify: FastifyInstance, options: WebAppOptions) {
  fastify.register(import('fastify-formbody'))

  fastify.register(import('fastify-static'), {
    root: path.join(options.rootDir, 'public'),
    prefix: '/public/',
  })

  fastify.register(import('point-of-view'), {
    engine: {
      pug: await import('pug'),
    },
    root: path.join(__dirname, 'views'),
    includeViewExtension: false,
    defaultContext: {
      dev: process.env.NODE_ENV !== 'production',
      uploadsDir: uploadConfig.dir,
      uploadSize: `${uploadConfig.limits.fileSize / 1000000} mb`,
    },
    options: {
      basedir: path.join(__dirname, 'views'),
      filters: {},
    },
  })

  fastify.register(import('./routes/auth'))
  fastify.register(import('./routes/recipe'))
}
