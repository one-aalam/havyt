import { buildSever } from './app'

const APP_PORT = process.env.APP_PORT || 3000

const server = buildSever()

server.listen(APP_PORT, () => console.log(`Server started on ${APP_PORT} 🚀`));
