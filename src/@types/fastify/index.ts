import { StoreService } from '../../lib/store'
import { IHasIdentity } from '../../lib/store/types'
import { AppColl, EnvConfig } from '../../lib/commons/types'
import { User } from '../../routes/user/types'

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

    getBasicAuthPayload(req: FastifyRequest): Array<string>
    verifyBasicAuth(req: FastifyRequest): void
    verifyBearerAuth(req: FastifyRequest): void
  }
  export interface FastifyRequest {
    user: User
  }
}
