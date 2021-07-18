import { FastifyRequest } from 'fastify'
import http from 'http'

import { StoreService } from '../../lib/store'
import { IHasIdentity } from '../../lib/store/types'
import { AppColl } from '../../lib/commons/types'

declare module "fastify" {
// @ts-ignore
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    lo(req: FastifyRequest): void

    getStore<T extends IHasIdentity>(coll: AppColl, options?: {
        data?: T[],
        unique?: string
    }): StoreService<T>
  }
}
