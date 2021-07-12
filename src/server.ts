import { buildServer } from './app'

const APP_PORT = process.env.APP_PORT || 3000

const server = buildServer()

server.listen(APP_PORT, '0.0.0.0', (err) => {
    if(err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server started on ${APP_PORT} 🚀`)
});
