import { FastifyInstance } from 'fastify'
import StormDB from 'stormdb'
import fp from 'fastify-plugin'
import { join, dirname } from 'path'
import { IHasIdentity, AppColl, AppCollConfig } from '../lib/commons/types'
import { StoreService } from '../lib/store'

 const store = async (fastify: FastifyInstance, config: AppCollConfig) => {
     // @ts-ignore
    const db = new StormDB(new StormDB.localFileEngine(join(dirname(require.main.filename), '..', fastify.config.APP_FILE_DB)))
    const dbPopulated = Object.keys(config).filter(coll => db.get(coll).value()).length

    if(!dbPopulated) {
        const defaults = Object.entries(config).reduce((acc, [key, config]) =>
            // @ts-ignore
            (acc[key] = config.data?.length ? config.data : [], acc),
        {})
        db.default(defaults)
        await db.save()
    }

    fastify.decorate('getStore', <T extends IHasIdentity>(coll: AppColl, options?: {
        data?: T[],
        unique?: string
    }) => {
        return new StoreService<T>({
                coll,
                db,
                data: options?.data?.length ? options?.data : [],
                unique: options?.unique ? options?.unique : config[coll]?.unique ? config[coll]?.unique : false
        })
    })

}

export default fp(store)
