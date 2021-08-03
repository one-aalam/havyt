import { FastifyInstance } from 'fastify'
import StormDB from 'stormdb'
import { Container } from 'typedi'
import fp from 'fastify-plugin'
import { join, dirname } from 'path'
import { AppCollConfig } from '../lib/commons/types'
import { DbToken } from '../lib/store'

const store = async (fastify: FastifyInstance, config: AppCollConfig) => {
  // @ts-ignore
  const db = new StormDB(
    new StormDB.localFileEngine(
      // @ts-ignore
      join(dirname(require.main.filename), '..', fastify.config.APP_FILE_DB)
    )
  )
  const dbPopulated = Object.keys(config).filter((coll) => db.get(coll).value()).length

  if (!dbPopulated) {
    const defaults = Object.entries(config).reduce(
      (acc, [key, config]) => (
        // @ts-ignore
        (acc[key] = config.data?.length ? config.data : []), acc
      ),
      {}
    )
    db.default(defaults)
    await db.save()
  }

  Container.set(DbToken, db)
}

export default fp(store)
