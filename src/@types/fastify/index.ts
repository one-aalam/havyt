import { FastifyRequest } from 'fastify'

import { StoreService } from '../../lib/store'
import { IHasIdentity } from '../../lib/store/types'
import { AppColl, EnvConfig } from '../../lib/commons/types'

declare module 'fastify' {
  export interface FastifyInstance {
    config: EnvConfig

    lo(req: FastifyRequest): void

    getStore<T extends IHasIdentity>(
      coll: AppColl,
      options?: {
        data?: T[]
        unique?: string
      }
    ): StoreService<T>
  }
}
