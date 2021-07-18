import { buildServer } from './app'

const server = buildServer()

const start = async function () {
    try {
      await server.ready()
      await server.listen(server.config.APP_PORT, '0.0.0.0')
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
}

start()
